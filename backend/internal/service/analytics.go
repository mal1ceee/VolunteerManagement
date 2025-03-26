package service

import (
	"context"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
)

type AnalyticsService struct {
	analyticsRepo    repository.AnalyticsRepository
	userRepo         repository.UserRepository
	eventRepo        repository.EventRepository
	organizationRepo repository.OrganizationRepository
	volunteerRepo    repository.VolunteerRepository
}

func NewAnalyticsService(
	analyticsRepo repository.AnalyticsRepository,
	userRepo repository.UserRepository,
	eventRepo repository.EventRepository,
	organizationRepo repository.OrganizationRepository,
	volunteerRepo repository.VolunteerRepository) *AnalyticsService {
	return &AnalyticsService{
		analyticsRepo:    analyticsRepo,
		userRepo:         userRepo,
		eventRepo:        eventRepo,
		organizationRepo: organizationRepo,
		volunteerRepo:    volunteerRepo,
	}
}

func (s *AnalyticsService) GetAdminDashboardStats(ctx context.Context) (*models.AdminDashboardStats, error) {
	return s.analyticsRepo.GetAdminDashboardStats(ctx)
}

func (s *AnalyticsService) GetRecentActivity(ctx context.Context, limit int) ([]*models.RecentActivity, error) {
	return s.analyticsRepo.GetRecentActivity(ctx, limit)
}

func (s *AnalyticsService) GetTopOrganizations(ctx context.Context, limit int) ([]*models.TopOrganization, error) {
	return s.analyticsRepo.GetTopOrganizations(ctx, limit)
}

func (s *AnalyticsService) GetUpcomingEvents(ctx context.Context, limit int) ([]*models.UpcomingEvent, error) {
	return s.analyticsRepo.GetUpcomingEvents(ctx, limit)
}

func (s *AnalyticsService) GetVolunteerDemographics(ctx context.Context) (*models.VolunteerDemographics, error) {
	return s.analyticsRepo.GetVolunteerDemographics(ctx)
}

func (s *AnalyticsService) GetEventAttendance(ctx context.Context, limit int) ([]*models.EventAttendance, error) {
	return s.analyticsRepo.GetEventAttendance(ctx, limit)
}

func (s *AnalyticsService) GetOrganizationStats(ctx context.Context, organizationID int64) (*models.OrganizationStatsResponse, error) {
	return s.organizationRepo.GetStats(ctx, organizationID)
}

func (s *AnalyticsService) GetOrganizationEventStats(ctx context.Context, organizationID int64) (map[string]int, error) {
	stats, err := s.organizationRepo.GetStats(ctx, organizationID)
	if err != nil {
		return nil, err
	}

	// Create a map with event status counts from the individual fields
	eventStatusMap := map[string]int{
		"active":    stats.ActiveEvents,
		"completed": stats.PastEvents,
		"total":     stats.TotalEvents,
	}

	return eventStatusMap, nil
}

func (s *AnalyticsService) GetVolunteerStats(ctx context.Context, volunteerID int64) (*models.VolunteerStatsResponse, error) {
	return s.volunteerRepo.GetStats(ctx, volunteerID)
}

func (s *AnalyticsService) GetPendingOrganizations(ctx context.Context, limit int) ([]*models.PendingOrganization, error) {
	return s.analyticsRepo.GetPendingOrganizations(ctx, limit)
}
