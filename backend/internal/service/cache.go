package service

import (
	"context"
	"time"
	"volunteer-management/internal/models"
	"volunteer-management/pkg/cache"
)

type CacheService struct {
	cache *cache.RedisCache
}

func NewCacheService(redisCache *cache.RedisCache) *CacheService {
	return &CacheService{
		cache: redisCache,
	}
}

// Event caching methods
func (s *CacheService) GetEvent(ctx context.Context, id int64) (*models.Event, error) {
	var event models.Event
	err := s.cache.Get(ctx, cache.EventKey(id), &event)
	if err != nil {
		return nil, err
	}
	if event.ID == 0 {
		return nil, nil
	}
	return &event, nil
}

func (s *CacheService) SetEvent(ctx context.Context, event *models.Event) error {
	return s.cache.Set(ctx, cache.EventKey(event.ID), event, cache.DefaultTTL)
}

func (s *CacheService) DeleteEvent(ctx context.Context, id int64) error {
	return s.cache.Delete(ctx, cache.EventKey(id))
}

// Volunteer caching methods
func (s *CacheService) GetVolunteer(ctx context.Context, id int64) (*models.Volunteer, error) {
	var volunteer models.Volunteer
	err := s.cache.Get(ctx, cache.VolunteerKey(id), &volunteer)
	if err != nil {
		return nil, err
	}
	if volunteer.ID == 0 {
		return nil, nil
	}
	return &volunteer, nil
}

func (s *CacheService) SetVolunteer(ctx context.Context, volunteer *models.Volunteer) error {
	return s.cache.Set(ctx, cache.VolunteerKey(volunteer.ID), volunteer, cache.DefaultTTL)
}

func (s *CacheService) DeleteVolunteer(ctx context.Context, id int64) error {
	return s.cache.Delete(ctx, cache.VolunteerKey(id))
}

// Event list caching
func (s *CacheService) GetEventList(ctx context.Context, page, limit int) ([]*models.Event, error) {
	var events []*models.Event
	err := s.cache.Get(ctx, cache.EventListKey(page, limit), &events)
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (s *CacheService) SetEventList(ctx context.Context, events []*models.Event, page, limit int) error {
	return s.cache.Set(ctx, cache.EventListKey(page, limit), events, cache.ListingTTL)
}

// Event search caching
func (s *CacheService) GetEventSearch(ctx context.Context, query, location string, date time.Time) ([]*models.Event, error) {
	var events []*models.Event
	err := s.cache.Get(ctx, cache.EventSearchKey(query, location, date), &events)
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (s *CacheService) SetEventSearch(ctx context.Context, events []*models.Event, query, location string, date time.Time) error {
	return s.cache.Set(ctx, cache.EventSearchKey(query, location, date), events, cache.SearchCacheTTL)
}
