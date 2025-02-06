package service

import (
	"context"
	"errors"
	"fmt"
	"volunteer-management/internal/models"
	"volunteer-management/pkg/cache"
)

var (
	ErrVolunteerNotFound = errors.New("volunteer not found")
	ErrUserNotFound      = errors.New("user not found")
)

type VolunteerService struct {
	volunteerRepo VolunteerRepository
	userRepo      UserRepository
	cacheService  *CacheService
}

type VolunteerRepository interface {
	Create(ctx context.Context, input *models.CreateVolunteerInput) (*models.Volunteer, error)
	GetByID(ctx context.Context, id int64) (*models.Volunteer, error)
	GetByUserID(ctx context.Context, userID int64) (*models.Volunteer, error)
	Update(ctx context.Context, id int64, input *models.UpdateVolunteerInput) (*models.Volunteer, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Volunteer, error)
}

func NewVolunteerService(volunteerRepo VolunteerRepository, userRepo UserRepository, cacheService *CacheService) *VolunteerService {
	return &VolunteerService{
		volunteerRepo: volunteerRepo,
		userRepo:      userRepo,
		cacheService:  cacheService,
	}
}

func (s *VolunteerService) Create(ctx context.Context, userID int64, input *models.CreateVolunteerInput) (*models.Volunteer, error) {
	// Verify user exists and is a volunteer
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrUserNotFound
	}
	if user.Role != models.RoleVolunteer {
		return nil, errors.New("user is not a volunteer")
	}

	input.UserID = userID
	volunteer, err := s.volunteerRepo.Create(ctx, input)
	if err != nil {
		return nil, err
	}

	// Cache the new volunteer profile
	if err := s.cacheService.SetVolunteer(ctx, volunteer); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache volunteer", err)
	}

	return volunteer, nil
}

func (s *VolunteerService) GetByID(ctx context.Context, id int64) (*models.Volunteer, error) {
	// Try to get from cache first
	volunteer, err := s.cacheService.GetVolunteer(ctx, id)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if volunteer != nil {
		return volunteer, nil
	}

	// If not in cache or cache failed, get from database
	volunteer, err = s.volunteerRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, ErrVolunteerNotFound
	}

	// Cache the volunteer for future requests
	if err := s.cacheService.SetVolunteer(ctx, volunteer); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache volunteer", err)
	}

	return volunteer, nil
}

func (s *VolunteerService) GetByUserID(ctx context.Context, userID int64) (*models.Volunteer, error) {
	// Try to get from cache first
	volunteer, err := s.cacheService.GetVolunteer(ctx, userID)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if volunteer != nil && volunteer.UserID == userID {
		return volunteer, nil
	}

	// If not in cache or cache failed, get from database
	volunteer, err = s.volunteerRepo.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, ErrVolunteerNotFound
	}

	// Cache the volunteer for future requests
	if err := s.cacheService.SetVolunteer(ctx, volunteer); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache volunteer", err)
	}

	return volunteer, nil
}

func (s *VolunteerService) Update(ctx context.Context, id int64, input *models.UpdateVolunteerInput) (*models.Volunteer, error) {
	volunteer, err := s.volunteerRepo.Update(ctx, id, input)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, ErrVolunteerNotFound
	}

	// Update cache
	if err := s.cacheService.SetVolunteer(ctx, volunteer); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to update volunteer cache", err)
	}

	return volunteer, nil
}

func (s *VolunteerService) Delete(ctx context.Context, id int64) error {
	// Delete from database
	if err := s.volunteerRepo.Delete(ctx, id); err != nil {
		return err
	}

	// Delete from cache
	if err := s.cacheService.DeleteVolunteer(ctx, id); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to delete volunteer from cache", err)
	}

	return nil
}

func (s *VolunteerService) List(ctx context.Context, offset, limit int) ([]*models.Volunteer, error) {
	// Try to get from cache first
	key := fmt.Sprintf("volunteer:list:%d:%d", offset, limit)
	var volunteers []*models.Volunteer
	err := s.cacheService.cache.Get(ctx, key, &volunteers)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if volunteers != nil {
		return volunteers, nil
	}

	// If not in cache or cache failed, get from database
	volunteers, err = s.volunteerRepo.List(ctx, offset, limit)
	if err != nil {
		return nil, err
	}

	// Cache the results
	if err := s.cacheService.cache.Set(ctx, key, volunteers, cache.ListingTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache volunteer list", err)
	}

	return volunteers, nil
}
