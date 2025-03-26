package service

import (
	"context"
	"errors"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
)

var (
	ErrOrganizationNotFound = errors.New("organization not found")
)

type OrganizationService struct {
	organizationRepo repository.OrganizationRepository
	userRepo         repository.UserRepository
	eventRepo        repository.EventRepository
}

func NewOrganizationService(
	organizationRepo repository.OrganizationRepository,
	userRepo repository.UserRepository,
	eventRepo repository.EventRepository) *OrganizationService {
	return &OrganizationService{
		organizationRepo: organizationRepo,
		userRepo:         userRepo,
		eventRepo:        eventRepo,
	}
}

func (s *OrganizationService) GetByID(ctx context.Context, id int64) (*models.Organization, error) {
	organization, err := s.organizationRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if organization == nil {
		return nil, ErrOrganizationNotFound
	}
	return organization, nil
}

func (s *OrganizationService) GetByUserID(ctx context.Context, userID int64) (*models.Organization, error) {
	organization, err := s.organizationRepo.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if organization == nil {
		return nil, ErrOrganizationNotFound
	}
	return organization, nil
}

func (s *OrganizationService) Update(ctx context.Context, id int64, input *models.UpdateOrganizationInput, userID int64) (*models.Organization, error) {
	organization, err := s.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Check if user is authorized to update the organization
	if organization.UserID != userID {
		return nil, ErrUnauthorized
	}

	return s.organizationRepo.Update(ctx, id, input)
}

func (s *OrganizationService) List(ctx context.Context, offset, limit int) ([]*models.Organization, error) {
	return s.organizationRepo.List(ctx, offset, limit)
}

func (s *OrganizationService) ListByStatus(ctx context.Context, status models.OrganizationStatus, offset, limit int) ([]*models.Organization, error) {
	return s.organizationRepo.ListByStatus(ctx, status, offset, limit)
}

func (s *OrganizationService) ListByCategory(ctx context.Context, category string, offset, limit int) ([]*models.Organization, error) {
	return s.organizationRepo.ListByCategory(ctx, category, offset, limit)
}

func (s *OrganizationService) ListPendingVerification(ctx context.Context, limit int) ([]*models.Organization, error) {
	return s.organizationRepo.ListPendingVerification(ctx, limit)
}

func (s *OrganizationService) ListTopByImpact(ctx context.Context, limit int) ([]*models.TopOrganization, error) {
	return s.organizationRepo.ListTopByImpact(ctx, limit)
}

func (s *OrganizationService) GetStats(ctx context.Context, orgID int64) (*models.OrganizationStatsResponse, error) {
	// Verify organization exists
	_, err := s.GetByID(ctx, orgID)
	if err != nil {
		return nil, err
	}

	return s.organizationRepo.GetStats(ctx, orgID)
}

func (s *OrganizationService) VerifyOrganization(ctx context.Context, id int64, adminID int64) error {
	// Verify organization exists
	_, err := s.GetByID(ctx, id)
	if err != nil {
		return err
	}

	// Check if user is an admin
	user, err := s.userRepo.GetByID(ctx, adminID)
	if err != nil {
		return err
	}
	if user == nil || user.Role != models.RoleAdmin {
		return ErrUnauthorized
	}

	return s.organizationRepo.VerifyOrganization(ctx, id)
}

func (s *OrganizationService) GetOrganizationProfile(ctx context.Context, userID int64) (*models.Organization, error) {
	return s.GetByUserID(ctx, userID)
}

func (s *OrganizationService) UpdateOrganizationProfile(ctx context.Context, userID int64, input *models.UpdateOrganizationInput) (*models.Organization, error) {
	// Get organization by user ID
	organization, err := s.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return s.organizationRepo.Update(ctx, organization.ID, input)
}

func (s *OrganizationService) ListOrganizationEvents(ctx context.Context, userID int64, offset, limit int) ([]*models.Event, error) {
	// Get organization by user ID
	organization, err := s.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return s.eventRepo.ListByOrganization(ctx, organization.ID, offset, limit)
}
