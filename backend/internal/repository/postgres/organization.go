package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type OrganizationRepository struct {
	db *gorm.DB
}

func NewOrganizationRepository(db *gorm.DB) *OrganizationRepository {
	return &OrganizationRepository{db: db}
}

func (r *OrganizationRepository) Create(ctx context.Context, input *models.CreateOrganizationInput) (*models.Organization, error) {
	organization := &models.Organization{
		Name:      input.Name,
		ShortDesc: input.ShortDesc,
		UserID:    input.UserID,
		Logo:      input.Logo,
		Website:   input.Website,
		Email:     input.Email,
		Phone:     input.Phone,
		Address:   input.Address,
		Category:  input.Category,
		Status:    models.OrgStatusPending, // Default to pending
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	result := r.db.WithContext(ctx).Create(organization)
	if result.Error != nil {
		return nil, result.Error
	}

	return organization, nil
}

func (r *OrganizationRepository) GetByID(ctx context.Context, id int64) (*models.Organization, error) {
	var organization models.Organization
	result := r.db.WithContext(ctx).First(&organization, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &organization, nil
}

func (r *OrganizationRepository) GetByUserID(ctx context.Context, userID int64) (*models.Organization, error) {
	var organization models.Organization
	result := r.db.WithContext(ctx).Where("user_id = ?", userID).First(&organization)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &organization, nil
}

func (r *OrganizationRepository) Update(ctx context.Context, id int64, input *models.UpdateOrganizationInput) (*models.Organization, error) {
	organization, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if organization == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.Name != nil {
		updates["name"] = *input.Name
	}
	if input.ShortDesc != nil {
		updates["short_desc"] = *input.ShortDesc
	}
	if input.LongDesc != nil {
		updates["long_desc"] = *input.LongDesc
	}
	if input.Logo != nil {
		updates["logo"] = *input.Logo
	}
	if input.Website != nil {
		updates["website"] = *input.Website
	}
	if input.Email != nil {
		updates["email"] = *input.Email
	}
	if input.Phone != nil {
		updates["phone"] = *input.Phone
	}
	if input.Address != nil {
		updates["address"] = *input.Address
	}
	if input.Category != nil {
		updates["category"] = *input.Category
	}
	if input.Status != nil {
		updates["status"] = *input.Status
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(organization).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return organization, nil
}

func (r *OrganizationRepository) Delete(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Delete(&models.Organization{}, id)
	return result.Error
}

func (r *OrganizationRepository) List(ctx context.Context, offset, limit int) ([]*models.Organization, error) {
	var organizations []*models.Organization
	result := r.db.WithContext(ctx).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&organizations)

	if result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (r *OrganizationRepository) ListByStatus(ctx context.Context, status models.OrganizationStatus, offset, limit int) ([]*models.Organization, error) {
	var organizations []*models.Organization
	result := r.db.WithContext(ctx).
		Where("status = ?", status).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&organizations)

	if result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (r *OrganizationRepository) ListByCategory(ctx context.Context, category string, offset, limit int) ([]*models.Organization, error) {
	var organizations []*models.Organization
	result := r.db.WithContext(ctx).
		Where("category = ?", category).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&organizations)

	if result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (r *OrganizationRepository) ListPendingVerification(ctx context.Context, limit int) ([]*models.Organization, error) {
	var organizations []*models.Organization
	result := r.db.WithContext(ctx).
		Where("status = ?", models.OrgStatusPending).
		Limit(limit).
		Order("created_at ASC").
		Find(&organizations)

	if result.Error != nil {
		return nil, result.Error
	}

	return organizations, nil
}

func (r *OrganizationRepository) ListTopByImpact(ctx context.Context, limit int) ([]*models.TopOrganization, error) {
	var topOrgs []*models.TopOrganization

	// This query depends on your database schema and how you're tracking impact
	// This is a simplified example that just counts events
	query := `
		SELECT o.id, o.name, o.logo, COUNT(e.id) as event_count, SUM(e.volunteers_registered) as total_volunteers
		FROM organizations o
		JOIN events e ON o.id = e.organization_id
		WHERE o.status = ?
		GROUP BY o.id
		ORDER BY total_volunteers DESC
		LIMIT ?
	`

	result := r.db.WithContext(ctx).Raw(query, models.OrgStatusActive, limit).Scan(&topOrgs)
	if result.Error != nil {
		return nil, result.Error
	}

	return topOrgs, nil
}

func (r *OrganizationRepository) GetStats(ctx context.Context, orgID int64) (*models.OrganizationStatsResponse, error) {
	var stats models.OrganizationStatsResponse

	// Total events
	var totalEvents int64
	if err := r.db.WithContext(ctx).Model(&models.Event{}).
		Where("organization_id = ?", orgID).
		Count(&totalEvents).Error; err != nil {
		return nil, err
	}
	stats.TotalEvents = int(totalEvents)

	// Total volunteers (unique volunteers who registered for events)
	query := `
		SELECT COUNT(DISTINCT er.volunteer_id) 
		FROM event_registrations er
		JOIN events e ON er.event_id = e.id
		WHERE e.organization_id = ?
	`
	if err := r.db.WithContext(ctx).Raw(query, orgID).Scan(&stats.TotalVolunteers).Error; err != nil {
		return nil, err
	}

	// Total hours contributed
	query = `
		SELECT COALESCE(SUM(er.hours_logged), 0) 
		FROM event_registrations er
		JOIN events e ON er.event_id = e.id
		WHERE e.organization_id = ?
	`
	if err := r.db.WithContext(ctx).Raw(query, orgID).Scan(&stats.TotalHours).Error; err != nil {
		return nil, err
	}

	// Active events (these go into ActiveEvents field)
	var activeEvents int64
	if err := r.db.WithContext(ctx).Model(&models.Event{}).
		Where("organization_id = ? AND date >= ? AND status = ?",
			orgID, time.Now(), "active").
		Count(&activeEvents).Error; err != nil {
		return nil, err
	}
	stats.ActiveEvents = int(activeEvents)

	// Past events (completed events go into PastEvents field)
	var pastEvents int64
	if err := r.db.WithContext(ctx).Model(&models.Event{}).
		Where("organization_id = ? AND date < ? AND status = ?",
			orgID, time.Now(), "completed").
		Count(&pastEvents).Error; err != nil {
		return nil, err
	}
	stats.PastEvents = int(pastEvents)

	// Calculate ActiveVolunteers (estimate based on recent event registrations)
	query = `
		SELECT COUNT(DISTINCT er.volunteer_id) 
		FROM event_registrations er
		JOIN events e ON er.event_id = e.id
		WHERE e.organization_id = ? AND e.date >= ?
	`
	if err := r.db.WithContext(ctx).Raw(query, orgID, time.Now().AddDate(0, -3, 0)).Scan(&stats.ActiveVolunteers).Error; err != nil {
		return nil, err
	}

	return &stats, nil
}

func (r *OrganizationRepository) VerifyOrganization(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Model(&models.Organization{}).
		Where("id = ?", id).
		Update("status", models.OrgStatusActive)

	return result.Error
}
