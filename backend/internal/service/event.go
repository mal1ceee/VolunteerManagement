package service

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
)

var (
	ErrEventNotFound     = errors.New("event not found")
	ErrEventCapacityFull = errors.New("event has reached maximum capacity")
	ErrUnauthorized      = errors.New("user is not authorized to perform this action")
)

type EventService struct {
	eventRepo    EventRepository
	signupRepo   SignupRepository
	cacheService *CacheService
}

type EventRepository interface {
	Create(ctx context.Context, input *models.CreateEventInput, createdBy int64) (*models.Event, error)
	GetByID(ctx context.Context, id int64) (*models.Event, error)
	Update(ctx context.Context, id int64, input *models.UpdateEventInput) (*models.Event, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Event, error)
	Search(ctx context.Context, params repository.SearchParams) ([]*models.Event, error)
}

func NewEventService(eventRepo EventRepository, signupRepo SignupRepository, cacheService *CacheService) *EventService {
	return &EventService{
		eventRepo:    eventRepo,
		signupRepo:   signupRepo,
		cacheService: cacheService,
	}
}

func (s *EventService) Create(ctx context.Context, input *models.CreateEventInput, userID int64) (*models.Event, error) {
	event, err := s.eventRepo.Create(ctx, input, userID)
	if err != nil {
		return nil, err
	}

	// Cache the new event
	if err := s.cacheService.SetEvent(ctx, event); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache event", err)
	}

	return event, nil
}

func (s *EventService) GetByID(ctx context.Context, id int64) (*models.Event, error) {
	// Try to get from cache first
	event, err := s.cacheService.GetEvent(ctx, id)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if event != nil {
		return event, nil
	}

	// If not in cache or cache failed, get from database
	event, err = s.eventRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if event == nil {
		return nil, ErrEventNotFound
	}

	// Cache the event for future requests
	if err := s.cacheService.SetEvent(ctx, event); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache event", err)
	}

	return event, nil
}

func (s *EventService) Update(ctx context.Context, id int64, input *models.UpdateEventInput, userID int64) (*models.Event, error) {
	event, err := s.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Check if user is authorized to update the event
	if event.CreatedBy != userID {
		return nil, ErrUnauthorized
	}

	event, err = s.eventRepo.Update(ctx, id, input)
	if err != nil {
		return nil, err
	}

	// Update cache
	if err := s.cacheService.SetEvent(ctx, event); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to update event cache", err)
	}

	return event, nil
}

func (s *EventService) Delete(ctx context.Context, id int64, userID int64) error {
	event, err := s.GetByID(ctx, id)
	if err != nil {
		return err
	}

	// Check if user is authorized to delete the event
	if event.CreatedBy != userID {
		return ErrUnauthorized
	}

	if err := s.eventRepo.Delete(ctx, id); err != nil {
		return err
	}

	// Delete from cache
	if err := s.cacheService.DeleteEvent(ctx, id); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to delete event from cache", err)
	}

	return nil
}

func (s *EventService) List(ctx context.Context, offset, limit int) ([]*models.Event, error) {
	// Try to get from cache first
	events, err := s.cacheService.GetEventList(ctx, offset/limit+1, limit)
	if err != nil {
		// Log error but continue to database
		// logger.Error("Cache get failed", err)
	}
	if events != nil {
		return events, nil
	}

	// If not in cache or cache failed, get from database
	events, err = s.eventRepo.List(ctx, offset, limit)
	if err != nil {
		return nil, err
	}

	// Cache the results
	if err := s.cacheService.SetEventList(ctx, events, offset/limit+1, limit); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to cache event list", err)
	}

	return events, nil
}

func (s *EventService) Search(ctx context.Context, date time.Time, location string, skills []string, offset, limit int) ([]*models.Event, error) {
	// Try to get from cache first
	cacheKey := fmt.Sprintf("search:%s:%s:%v:%d:%d",
		date.Format("2006-01-02"),
		location,
		skills,
		offset,
		limit,
	)

	var events []*models.Event
	err := s.cacheService.cache.Get(ctx, cacheKey, &events)
	if err == nil && events != nil {
		return events, nil
	}

	// If not in cache, search in database
	params := repository.SearchParams{
		Date:     date,
		Location: location,
		Skills:   skills,
		Offset:   offset,
		Limit:    limit,
	}

	events, err = s.eventRepo.Search(ctx, params)
	if err != nil {
		return nil, err
	}

	// Cache the results
	if err := s.cacheService.cache.Set(ctx, cacheKey, events, 5*time.Minute); err != nil {
		// Log error but don't fail the operation
		log.Printf("Failed to cache search results: %v", err)
	}

	return events, nil
}

func (s *EventService) CheckCapacity(ctx context.Context, eventID int64) (bool, error) {
	event, err := s.GetByID(ctx, eventID)
	if err != nil {
		return false, err
	}

	count, err := s.signupRepo.CountByEvent(ctx, eventID)
	if err != nil {
		return false, err
	}

	return count < int64(event.Capacity), nil
}
