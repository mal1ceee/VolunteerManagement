package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) *EventRepository {
	return &EventRepository{db: db}
}

func (r *EventRepository) Create(ctx context.Context, input *models.CreateEventInput, organizationID int64) (*models.Event, error) {
	event := &models.Event{
		Title:                input.Title,
		Description:          input.Description,
		ShortDescription:     input.ShortDescription,
		Location:             input.Location,
		Date:                 input.Date,
		StartTime:            input.StartTime,
		EndTime:              input.EndTime,
		OrganizationID:       organizationID,
		Category:             input.Category,
		Image:                input.Image,
		RequiredSkills:       input.RequiredSkills,
		VolunteersNeeded:     input.VolunteersNeeded,
		VolunteersRegistered: 0,
		Status:               input.Status,
		CreatedAt:            time.Now(),
		UpdatedAt:            time.Now(),
	}

	result := r.db.WithContext(ctx).Create(event)
	if result.Error != nil {
		return nil, result.Error
	}

	return event, nil
}

func (r *EventRepository) GetByID(ctx context.Context, id int64) (*models.Event, error) {
	var event models.Event
	result := r.db.WithContext(ctx).First(&event, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &event, nil
}

func (r *EventRepository) Update(ctx context.Context, id int64, input *models.UpdateEventInput) (*models.Event, error) {
	event, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if event == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.Title != nil {
		updates["title"] = *input.Title
	}
	if input.Description != nil {
		updates["description"] = *input.Description
	}
	if input.ShortDescription != nil {
		updates["short_description"] = *input.ShortDescription
	}
	if input.Location != nil {
		updates["location"] = *input.Location
	}
	if input.Date != nil {
		updates["date"] = *input.Date
	}
	if input.StartTime != nil {
		updates["start_time"] = *input.StartTime
	}
	if input.EndTime != nil {
		updates["end_time"] = *input.EndTime
	}
	if input.Category != nil {
		updates["category"] = *input.Category
	}
	if input.Image != nil {
		updates["image"] = *input.Image
	}
	if input.RequiredSkills != nil {
		updates["required_skills"] = *input.RequiredSkills
	}
	if input.VolunteersNeeded != nil {
		updates["volunteers_needed"] = *input.VolunteersNeeded
	}
	if input.Status != nil {
		updates["status"] = *input.Status
	}
	if input.ImpactMetrics != nil {
		updates["impact_metrics"] = *input.ImpactMetrics
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(event).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return event, nil
}

func (r *EventRepository) Delete(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Delete(&models.Event{}, id)
	return result.Error
}

func (r *EventRepository) List(ctx context.Context, offset, limit int) ([]*models.Event, error) {
	var events []*models.Event
	result := r.db.WithContext(ctx).
		Offset(offset).
		Limit(limit).
		Order("date ASC").
		Find(&events)

	if result.Error != nil {
		return nil, result.Error
	}

	return events, nil
}

func (r *EventRepository) ListByOrganization(ctx context.Context, organizationID int64, offset, limit int) ([]*models.Event, error) {
	var events []*models.Event
	result := r.db.WithContext(ctx).
		Where("organization_id = ?", organizationID).
		Offset(offset).
		Limit(limit).
		Order("date ASC").
		Find(&events)

	if result.Error != nil {
		return nil, result.Error
	}

	return events, nil
}

func (r *EventRepository) ListByStatus(ctx context.Context, status models.EventStatus, offset, limit int) ([]*models.Event, error) {
	var events []*models.Event
	result := r.db.WithContext(ctx).
		Where("status = ?", status).
		Offset(offset).
		Limit(limit).
		Order("date ASC").
		Find(&events)

	if result.Error != nil {
		return nil, result.Error
	}

	return events, nil
}

func (r *EventRepository) Search(ctx context.Context, params repository.SearchParams) ([]*models.Event, error) {
	query := r.db.Model(&models.Event{})

	// Add date filter if provided
	if !params.Date.IsZero() {
		query = query.Where("date = ?", params.Date)
	}

	// Add location filter if provided
	if params.Location != "" {
		query = query.Where("LOWER(location) LIKE LOWER(?)", "%"+params.Location+"%")
	}

	// Add skills filter if provided
	if len(params.Skills) > 0 {
		query = query.Where("required_skills && ?", pq.Array(params.Skills))
	}

	// Add status filter if provided
	if params.Status != "" {
		query = query.Where("status = ?", params.Status)
	}

	// Add category filter if provided
	if params.Category != "" {
		query = query.Where("category = ?", params.Category)
	}

	// Add pagination
	query = query.Offset(params.Offset).Limit(params.Limit)

	// Execute query
	var events []*models.Event
	if err := query.Find(&events).Error; err != nil {
		return nil, err
	}

	return events, nil
}

func (r *EventRepository) CountByStatus(ctx context.Context) (map[models.EventStatus]int, error) {
	var results []struct {
		Status models.EventStatus
		Count  int
	}

	if err := r.db.WithContext(ctx).
		Model(&models.Event{}).
		Select("status, count(*) as count").
		Group("status").
		Find(&results).Error; err != nil {
		return nil, err
	}

	counts := make(map[models.EventStatus]int)
	for _, r := range results {
		counts[r.Status] = r.Count
	}

	return counts, nil
}

func (r *EventRepository) ListUpcoming(ctx context.Context, limit int) ([]*models.Event, error) {
	var events []*models.Event
	result := r.db.WithContext(ctx).
		Where("date >= ? AND status = ?", time.Now(), models.EventStatusActive).
		Limit(limit).
		Order("date ASC").
		Find(&events)

	if result.Error != nil {
		return nil, result.Error
	}

	return events, nil
}

func (r *EventRepository) ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Event, error) {
	var events []*models.Event
	result := r.db.WithContext(ctx).
		Joins("JOIN event_registrations ON events.id = event_registrations.event_id").
		Where("event_registrations.volunteer_id = ?", volunteerID).
		Offset(offset).
		Limit(limit).
		Order("date ASC").
		Find(&events)

	if result.Error != nil {
		return nil, result.Error
	}

	return events, nil
}
