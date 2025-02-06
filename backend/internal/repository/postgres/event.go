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

func (r *EventRepository) Create(ctx context.Context, input *models.CreateEventInput, createdBy int64) (*models.Event, error) {
	event := &models.Event{
		Title:       input.Title,
		Description: input.Description,
		Location:    input.Location,
		Date:        input.Date,
		CreatedBy:   createdBy,
		Capacity:    input.Capacity,
		Status:      input.Status,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
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
	if input.Location != nil {
		updates["location"] = *input.Location
	}
	if input.Date != nil {
		updates["date"] = *input.Date
	}
	if input.Capacity != nil {
		updates["capacity"] = *input.Capacity
	}
	if input.Status != nil {
		updates["status"] = *input.Status
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
		query = query.Where("skills && ?", pq.Array(params.Skills))
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
