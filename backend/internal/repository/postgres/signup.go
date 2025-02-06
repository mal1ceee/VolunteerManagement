package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type SignupRepository struct {
	db *gorm.DB
}

func NewSignupRepository(db *gorm.DB) *SignupRepository {
	return &SignupRepository{db: db}
}

func (r *SignupRepository) Create(ctx context.Context, input *models.CreateSignupInput) (*models.Signup, error) {
	signup := &models.Signup{
		EventID:     input.EventID,
		VolunteerID: input.VolunteerID,
		Status:      input.Status,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	result := r.db.WithContext(ctx).Create(signup)
	if result.Error != nil {
		return nil, result.Error
	}

	return signup, nil
}

func (r *SignupRepository) GetByID(ctx context.Context, id int64) (*models.Signup, error) {
	var signup models.Signup
	result := r.db.WithContext(ctx).First(&signup, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &signup, nil
}

func (r *SignupRepository) GetByEventAndVolunteer(ctx context.Context, eventID, volunteerID int64) (*models.Signup, error) {
	var signup models.Signup
	result := r.db.WithContext(ctx).
		Where("event_id = ? AND volunteer_id = ?", eventID, volunteerID).
		First(&signup)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &signup, nil
}

func (r *SignupRepository) Update(ctx context.Context, id int64, input *models.UpdateSignupInput) (*models.Signup, error) {
	signup, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if signup == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.Status != nil {
		updates["status"] = *input.Status
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(signup).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return signup, nil
}

func (r *SignupRepository) Delete(ctx context.Context, id int64) error {
	result := r.db.WithContext(ctx).Delete(&models.Signup{}, id)
	return result.Error
}

func (r *SignupRepository) ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.Signup, error) {
	var signups []*models.Signup
	result := r.db.WithContext(ctx).
		Where("event_id = ?", eventID).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&signups)

	if result.Error != nil {
		return nil, result.Error
	}

	return signups, nil
}

func (r *SignupRepository) ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Signup, error) {
	var signups []*models.Signup
	result := r.db.WithContext(ctx).
		Where("volunteer_id = ?", volunteerID).
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Find(&signups)

	if result.Error != nil {
		return nil, result.Error
	}

	return signups, nil
}

func (r *SignupRepository) CountByEvent(ctx context.Context, eventID int64) (int64, error) {
	var count int64
	result := r.db.WithContext(ctx).
		Model(&models.Signup{}).
		Where("event_id = ? AND status = ?", eventID, models.SignupStatusConfirmed).
		Count(&count)

	if result.Error != nil {
		return 0, result.Error
	}

	return count, nil
}
