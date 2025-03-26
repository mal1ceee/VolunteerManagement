package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type AnalyticsRepository struct {
	db *gorm.DB
}

func NewAnalyticsRepository(db *gorm.DB) *AnalyticsRepository {
	return &AnalyticsRepository{db: db}
}

func (r *AnalyticsRepository) GetAdminDashboardStats(ctx context.Context) (*models.AdminDashboardStats, error) {
	stats := &models.AdminDashboardStats{}

	// Get total volunteers
	if err := r.db.WithContext(ctx).Model(&models.User{}).
		Where("role = ?", models.RoleVolunteer).
		Count(&stats.TotalVolunteers).Error; err != nil {
		return nil, err
	}

	// Get total organizations
	if err := r.db.WithContext(ctx).Model(&models.User{}).
		Where("role = ?", models.RoleOrganization).
		Count(&stats.TotalOrganizations).Error; err != nil {
		return nil, err
	}

	// Get total events
	if err := r.db.WithContext(ctx).Model(&models.Event{}).
		Count(&stats.TotalEvents).Error; err != nil {
		return nil, err
	}

	// Get total hours logged
	query := `
		SELECT COALESCE(SUM(hours_logged), 0)
		FROM event_registrations
		WHERE status = 'attended'
	`
	if err := r.db.WithContext(ctx).Raw(query).Scan(&stats.TotalHours).Error; err != nil {
		return nil, err
	}

	// Copy to TotalHoursLogged for the API response
	stats.TotalHoursLogged = stats.TotalHours

	// Get active users last 30 days
	thirtyDaysAgo := time.Now().AddDate(0, 0, -30)
	if err := r.db.WithContext(ctx).Model(&models.User{}).
		Where("last_active >= ?", thirtyDaysAgo).
		Count(&stats.ActiveUsers).Error; err != nil {
		return nil, err
	}

	// Get new users last 30 days
	if err := r.db.WithContext(ctx).Model(&models.User{}).
		Where("created_at >= ?", thirtyDaysAgo).
		Count(&stats.NewUsers).Error; err != nil {
		return nil, err
	}

	// Get pending organizations
	if err := r.db.WithContext(ctx).Model(&models.Organization{}).
		Where("status = ?", "pending").
		Count(&stats.PendingOrganizations).Error; err != nil {
		return nil, err
	}

	// Get upcoming events
	if err := r.db.WithContext(ctx).Model(&models.Event{}).
		Where("date >= ? AND status = ?", time.Now(), "active").
		Count(&stats.UpcomingEvents).Error; err != nil {
		return nil, err
	}

	return stats, nil
}

func (r *AnalyticsRepository) GetRecentActivity(ctx context.Context, limit int) ([]*models.RecentActivity, error) {
	var activities []*models.RecentActivity

	// This is a simplified approach. In a real application, you'd want to
	// track activities in a dedicated table with polymorphic relations.
	query := `
		(
			SELECT 'user_joined' as activity_type, 
				u.name as name, 
				u.avatar as avatar, 
				u.id as user_id, 
				NULL as entity_id, 
				u.created_at as timestamp
			FROM users u
			WHERE u.role IN (?, ?)
			ORDER BY u.created_at DESC
			LIMIT ?
		)
		UNION ALL
		(
			SELECT 'event_created' as activity_type, 
				o.name as name, 
				o.logo as avatar, 
				o.user_id as user_id, 
				e.id as entity_id, 
				e.created_at as timestamp
			FROM events e
			JOIN organizations o ON e.organization_id = o.id
			ORDER BY e.created_at DESC
			LIMIT ?
		)
		UNION ALL
		(
			SELECT 'event_registration' as activity_type, 
				u.name as name, 
				u.avatar as avatar, 
				v.user_id as user_id, 
				er.event_id as entity_id, 
				er.created_at as timestamp
			FROM event_registrations er
			JOIN volunteers v ON er.volunteer_id = v.id
			JOIN users u ON v.user_id = u.id
			ORDER BY er.created_at DESC
			LIMIT ?
		)
		ORDER BY timestamp DESC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(
		query,
		models.RoleVolunteer,
		models.RoleOrganization,
		limit/3, // Split limit among three types
		limit/3,
		limit/3,
		limit,
	).Scan(&activities)

	if result.Error != nil {
		return nil, result.Error
	}

	return activities, nil
}

func (r *AnalyticsRepository) GetPendingOrganizations(ctx context.Context, limit int) ([]*models.PendingOrganization, error) {
	var pendingOrgs []*models.PendingOrganization

	query := `
		SELECT o.id, o.name, o.logo, o.category, u.email, o.created_at as submission_date
		FROM organizations o
		JOIN users u ON o.user_id = u.id
		WHERE o.status = 'pending'
		ORDER BY o.created_at ASC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(query, limit).Scan(&pendingOrgs)
	if result.Error != nil {
		return nil, result.Error
	}

	return pendingOrgs, nil
}

func (r *AnalyticsRepository) GetTopOrganizations(ctx context.Context, limit int) ([]*models.TopOrganization, error) {
	var topOrgs []*models.TopOrganization

	query := `
		SELECT o.id, o.name, o.logo, 
			COUNT(DISTINCT er.volunteer_id) as volunteer_count,
			COALESCE(SUM(er.hours_logged), 0) as total_hours
		FROM organizations o
		JOIN events e ON o.id = e.organization_id
		LEFT JOIN event_registrations er ON e.id = er.event_id
		WHERE o.status = 'verified'
		GROUP BY o.id
		ORDER BY total_hours DESC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(query, limit).Scan(&topOrgs)
	if result.Error != nil {
		return nil, result.Error
	}

	return topOrgs, nil
}

func (r *AnalyticsRepository) GetUpcomingEvents(ctx context.Context, limit int) ([]*models.UpcomingEvent, error) {
	var upcomingEvents []*models.UpcomingEvent

	query := `
		SELECT e.id, e.title, e.date, e.location, 
			o.name as organization_name, 
			e.volunteers_needed, 
			COUNT(er.id) as registrations
		FROM events e
		JOIN organizations o ON e.organization_id = o.id
		LEFT JOIN event_registrations er ON e.id = er.event_id
		WHERE e.date >= ? AND e.status = 'active'
		GROUP BY e.id, o.name
		ORDER BY registrations DESC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(query, time.Now(), limit).Scan(&upcomingEvents)
	if result.Error != nil {
		return nil, result.Error
	}

	return upcomingEvents, nil
}

func (r *AnalyticsRepository) GetVolunteerDemographics(ctx context.Context) (*models.VolunteerDemographics, error) {
	demographics := &models.VolunteerDemographics{
		LocationDistribution: make(map[string]int),
		SkillsDistribution:   make(map[string]int),
	}

	// Location distribution
	var locationCounts []struct {
		Location string `json:"location"`
		Count    int    `json:"count"`
	}

	if err := r.db.WithContext(ctx).Model(&models.Volunteer{}).
		Select("location, COUNT(*) as count").
		Group("location").
		Find(&locationCounts).Error; err != nil {
		return nil, err
	}

	for _, lc := range locationCounts {
		demographics.LocationDistribution[lc.Location] = lc.Count
	}

	// Get most common skills
	// This depends on how skills are stored in your database
	// Assuming a skills field that's an array or similar
	var skillCounts []struct {
		Skill string `json:"skill"`
		Count int    `json:"count"`
	}

	query := `
		SELECT skill, COUNT(*) as count
		FROM volunteers, unnest(skills) as skill
		GROUP BY skill
		ORDER BY count DESC
	`

	if err := r.db.WithContext(ctx).Raw(query).Scan(&skillCounts).Error; err != nil {
		return nil, err
	}

	for _, sc := range skillCounts {
		demographics.SkillsDistribution[sc.Skill] = sc.Count
	}

	// Initialize empty slices for age groups and engagement levels if needed
	demographics.AgeGroups = []struct {
		Group      string `json:"group"`
		Percentage int    `json:"percentage"`
	}{}

	demographics.EngagementLevels = []struct {
		Level string `json:"level"`
		Count int    `json:"count"`
	}{}

	return demographics, nil
}

func (r *AnalyticsRepository) GetEventAttendance(ctx context.Context, limit int) ([]*models.EventAttendance, error) {
	var attendance []*models.EventAttendance

	query := `
		SELECT e.id, e.title, e.date,
			o.name as organization_name,
			e.volunteers_needed,
			COUNT(er.id) as attendance,
			COALESCE(SUM(er.hours_logged), 0) as hours_logged
		FROM events e
		JOIN organizations o ON e.organization_id = o.id
		JOIN event_registrations er ON e.id = er.event_id
		WHERE e.status = 'complete' AND er.status = 'attended'
		GROUP BY e.id, o.name
		ORDER BY e.date DESC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(query, limit).Scan(&attendance)
	if result.Error != nil {
		return nil, result.Error
	}

	return attendance, nil
}
