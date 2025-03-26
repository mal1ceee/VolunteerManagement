package service

import (
	"context"
	"errors"
	"fmt"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
	"volunteer-management/internal/websocket"
	"volunteer-management/pkg/cache"
)

var (
	ErrSignupNotFound      = errors.New("signup not found")
	ErrAlreadySignedUp     = errors.New("volunteer is already signed up for this event")
	ErrInvalidSignupStatus = errors.New("invalid signup status")
)

type SignupService struct {
	signupRepo    SignupRepository
	eventRepo     repository.EventRepository
	volunteerRepo VolunteerRepository
	cacheService  *CacheService
	wsManager     *websocket.Manager
}

type SignupRepository interface {
	Create(ctx context.Context, input *models.CreateSignupInput) (*models.Signup, error)
	GetByID(ctx context.Context, id int64) (*models.Signup, error)
	GetByEventAndVolunteer(ctx context.Context, eventID, volunteerID int64) (*models.Signup, error)
	Update(ctx context.Context, id int64, input *models.UpdateSignupInput) (*models.Signup, error)
	Delete(ctx context.Context, id int64) error
	ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.Signup, error)
	ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Signup, error)
	CountByEvent(ctx context.Context, eventID int64) (int64, error)
}

func NewSignupService(signupRepo SignupRepository, eventRepo repository.EventRepository, volunteerRepo VolunteerRepository, cacheService *CacheService, wsManager *websocket.Manager) *SignupService {
	return &SignupService{
		signupRepo:    signupRepo,
		eventRepo:     eventRepo,
		volunteerRepo: volunteerRepo,
		cacheService:  cacheService,
		wsManager:     wsManager,
	}
}

func (s *SignupService) Create(ctx context.Context, input *models.CreateSignupInput) (*models.Signup, error) {
	// Verify volunteer exists
	volunteer, err := s.volunteerRepo.GetByID(ctx, input.VolunteerID)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, ErrVolunteerNotFound
	}

	// Verify event exists
	event, err := s.eventRepo.GetByID(ctx, input.EventID)
	if err != nil {
		return nil, err
	}
	if event == nil {
		return nil, ErrEventNotFound
	}

	// Check if already signed up
	existing, err := s.signupRepo.GetByEventAndVolunteer(ctx, input.EventID, input.VolunteerID)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, ErrAlreadySignedUp
	}

	// Check event capacity
	count, err := s.signupRepo.CountByEvent(ctx, input.EventID)
	if err != nil {
		return nil, err
	}
	if count >= int64(event.VolunteersNeeded) {
		return nil, ErrEventCapacityFull
	}

	signup, err := s.signupRepo.Create(ctx, input)
	if err != nil {
		return nil, err
	}

	// Cache the new signup
	if err := s.cacheService.cache.Set(ctx, cache.SignupKey(signup.ID), signup, cache.DefaultTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache signup", err)
	}

	// Invalidate related cache entries
	s.invalidateRelatedCaches(ctx, signup.EventID, signup.VolunteerID)

	// Notify subscribers about the new signup
	eventTopic := fmt.Sprintf("event:%d", signup.EventID)
	volunteerTopic := fmt.Sprintf("volunteer:%d", signup.VolunteerID)

	s.wsManager.PublishToTopic(eventTopic, signup)
	s.wsManager.PublishToTopic(volunteerTopic, signup)

	return signup, nil
}

func (s *SignupService) GetByID(ctx context.Context, id int64) (*models.Signup, error) {
	// Try to get from cache first
	var signup models.Signup
	err := s.cacheService.cache.Get(ctx, cache.SignupKey(id), &signup)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if signup.ID != 0 {
		return &signup, nil
	}

	// If not in cache or cache failed, get from database
	signup2, err := s.signupRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if signup2 == nil {
		return nil, ErrSignupNotFound
	}

	// Cache the signup for future requests
	if err := s.cacheService.cache.Set(ctx, cache.SignupKey(id), signup2, cache.DefaultTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache signup", err)
	}

	return signup2, nil
}

func (s *SignupService) Update(ctx context.Context, id int64, input *models.UpdateSignupInput) (*models.Signup, error) {
	signup, err := s.signupRepo.Update(ctx, id, input)
	if err != nil {
		return nil, err
	}
	if signup == nil {
		return nil, ErrSignupNotFound
	}

	// Update cache
	if err := s.cacheService.cache.Set(ctx, cache.SignupKey(id), signup, cache.DefaultTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to update signup cache", err)
	}

	// Invalidate related cache entries
	s.invalidateRelatedCaches(ctx, signup.EventID, signup.VolunteerID)

	return signup, nil
}

func (s *SignupService) Delete(ctx context.Context, id int64) error {
	signup, err := s.GetByID(ctx, id)
	if err != nil {
		return err
	}

	if err := s.signupRepo.Delete(ctx, id); err != nil {
		return err
	}

	// Delete from cache
	if err := s.cacheService.cache.Delete(ctx, cache.SignupKey(id)); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to delete signup from cache", err)
	}

	// Invalidate related cache entries
	s.invalidateRelatedCaches(ctx, signup.EventID, signup.VolunteerID)

	return nil
}

func (s *SignupService) ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.Signup, error) {
	// Try to get from cache first
	key := cache.SignupsByEventKey(eventID)
	var signups []*models.Signup
	err := s.cacheService.cache.Get(ctx, key, &signups)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if signups != nil {
		return signups, nil
	}

	// If not in cache or cache failed, get from database
	signups, err = s.signupRepo.ListByEvent(ctx, eventID, offset, limit)
	if err != nil {
		return nil, err
	}

	// Cache the results
	if err := s.cacheService.cache.Set(ctx, key, signups, cache.ListingTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache signup list", err)
	}

	return signups, nil
}

func (s *SignupService) ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Signup, error) {
	// Try to get from cache first
	key := cache.SignupsByVolunteerKey(volunteerID)
	var signups []*models.Signup
	err := s.cacheService.cache.Get(ctx, key, &signups)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if signups != nil {
		return signups, nil
	}

	// If not in cache or cache failed, get from database
	signups, err = s.signupRepo.ListByVolunteer(ctx, volunteerID, offset, limit)
	if err != nil {
		return nil, err
	}

	// Cache the results
	if err := s.cacheService.cache.Set(ctx, key, signups, cache.ListingTTL); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache signup list", err)
	}

	return signups, nil
}

// Helper method to invalidate related cache entries when a signup is modified
func (s *SignupService) invalidateRelatedCaches(ctx context.Context, eventID, volunteerID int64) {
	// Delete event signups list cache
	if err := s.cacheService.cache.Delete(ctx, cache.SignupsByEventKey(eventID)); err != nil {
		// logger.Error("Failed to invalidate event signups cache", err)
	}

	// Delete volunteer signups list cache
	if err := s.cacheService.cache.Delete(ctx, cache.SignupsByVolunteerKey(volunteerID)); err != nil {
		// logger.Error("Failed to invalidate volunteer signups cache", err)
	}
}
