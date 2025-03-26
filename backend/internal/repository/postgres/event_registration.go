package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type EventRegistrationRepository struct {
	db *gorm.DB
}

func NewEventRegistrationRepository(db *gorm.DB) *EventRegistrationRepository {
	return &EventRegistrationRepository{db: db}
}

func (r *EventRegistrationRepository) Create(ctx context.Context, input *models.CreateEventRegistrationInput) (*models.EventRegistration, error) {
	registration := &models.EventRegistration{
		EventID:          input.EventID,
		VolunteerID:      input.VolunteerID,
		Status:           input.Status,
		RegistrationDate: time.Now(),
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	result := r.db.WithContext(ctx).Create(registration)
	if result.Error != nil {
		return nil, result.Error
	}

	return registration, nil
}

func (r *EventRegistrationRepository) GetByID(ctx context.Context, id int64) (*models.EventRegistration, error) {
	var registration models.EventRegistration
	result := r.db.WithContext(ctx).First(&registration, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &registration, nil
}

func (r *EventRegistrationRepository) GetByEventAndVolunteer(ctx context.Context, eventID, volunteerID int64) (*models.EventRegistration, error) {
	var registration models.EventRegistration
	result := r.db.WithContext(ctx).
		Where("event_id = ? AND volunteer_id = ?", eventID, volunteerID).
		First(&registration)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &registration, nil
}

func (r *EventRegistrationRepository) Update(ctx context.Context, id int64, input *models.UpdateEventRegistrationInput) (*models.EventRegistration, error) {
	registration, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if registration == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.Status != nil {
		updates["status"] = *input.Status
	}
	if input.HoursLogged != nil {
		updates["hours_logged"] = *input.HoursLogged
	}
	if input.Feedback != nil {
		updates["feedback"] = *input.Feedback
	}
	if input.Rating != nil {
		updates["rating"] = *input.Rating
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(registration).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return registration, nil
}

func (r *EventRegistrationRepository) Delete(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Delete(&models.EventRegistration{}, id)
	return result.Error
}

func (r *EventRegistrationRepository) ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.EventRegistration, error) {
	var registrations []*models.EventRegistration
	result := r.db.WithContext(ctx).
		Where("event_id = ?", eventID).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&registrations)

	if result.Error != nil {
		return nil, result.Error
	}

	return registrations, nil
}

func (r *EventRegistrationRepository) ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.EventRegistration, error) {
	var registrations []*models.EventRegistration
	result := r.db.WithContext(ctx).
		Where("volunteer_id = ?", volunteerID).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&registrations)

	if result.Error != nil {
		return nil, result.Error
	}

	return registrations, nil
}

func (r *EventRegistrationRepository) CountByEvent(ctx context.Context, eventID int64) (int, error) {
	var count int64
	result := r.db.WithContext(ctx).Model(&models.EventRegistration{}).
		Where("event_id = ?", eventID).
		Count(&count)

	if result.Error != nil {
		return 0, result.Error
	}

	return int(count), nil
}
