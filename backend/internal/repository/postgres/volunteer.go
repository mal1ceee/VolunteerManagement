package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type VolunteerRepository struct {
	db *gorm.DB
}

func NewVolunteerRepository(db *gorm.DB) *VolunteerRepository {
	return &VolunteerRepository{db: db}
}

func (r *VolunteerRepository) Create(ctx context.Context, input *models.CreateVolunteerInput) (*models.Volunteer, error) {
	volunteer := &models.Volunteer{
		UserID:       input.UserID,
		Skills:       input.Skills,
		Availability: input.Availability,
		Bio:          input.Bio,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	result := r.db.WithContext(ctx).Create(volunteer)
	if result.Error != nil {
		return nil, result.Error
	}

	return volunteer, nil
}

func (r *VolunteerRepository) GetByID(ctx context.Context, id int64) (*models.Volunteer, error) {
	var volunteer models.Volunteer
	result := r.db.WithContext(ctx).First(&volunteer, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &volunteer, nil
}

func (r *VolunteerRepository) GetByUserID(ctx context.Context, userID int64) (*models.Volunteer, error) {
	var volunteer models.Volunteer
	result := r.db.WithContext(ctx).Where("user_id = ?", userID).First(&volunteer)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &volunteer, nil
}

func (r *VolunteerRepository) Update(ctx context.Context, id int64, input *models.UpdateVolunteerInput) (*models.Volunteer, error) {
	volunteer, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.Skills != nil {
		updates["skills"] = *input.Skills
	}
	if input.Availability != nil {
		updates["availability"] = *input.Availability
	}
	if input.Bio != nil {
		updates["bio"] = *input.Bio
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(volunteer).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return volunteer, nil
}

func (r *VolunteerRepository) Delete(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Delete(&models.Volunteer{}, id)
	return result.Error
}

func (r *VolunteerRepository) List(ctx context.Context, offset, limit int) ([]*models.Volunteer, error) {
	var volunteers []*models.Volunteer
	result := r.db.WithContext(ctx).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&volunteers)

	if result.Error != nil {
		return nil, result.Error
	}

	return volunteers, nil
}
