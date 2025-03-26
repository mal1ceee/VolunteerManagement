package service

import (
	"context"
	"errors"
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
	eventRepo        repository.EventRepository
	organizationRepo repository.OrganizationRepository
	volunteerRepo    repository.VolunteerRepository
	eventRegRepo     repository.EventRegistrationRepository
}

func NewEventService(
	eventRepo repository.EventRepository,
	organizationRepo repository.OrganizationRepository,
	volunteerRepo repository.VolunteerRepository,
	eventRegRepo repository.EventRegistrationRepository) *EventService {
	return &EventService{
		eventRepo:        eventRepo,
		organizationRepo: organizationRepo,
		volunteerRepo:    volunteerRepo,
		eventRegRepo:     eventRegRepo,
	}
}

func (s *EventService) Create(ctx context.Context, input *models.CreateEventInput, organizationID int64) (*models.Event, error) {
	// Verify organization exists
	org, err := s.organizationRepo.GetByID(ctx, organizationID)
	if err != nil {
		return nil, err
	}
	if org == nil {
		return nil, errors.New("organization not found")
	}

	event, err := s.eventRepo.Create(ctx, input, organizationID)
	if err != nil {
		return nil, err
	}

	return event, nil
}

func (s *EventService) GetByID(ctx context.Context, id int64) (*models.Event, error) {
	event, err := s.eventRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if event == nil {
		return nil, ErrEventNotFound
	}

	return event, nil
}

func (s *EventService) Update(ctx context.Context, id int64, input *models.UpdateEventInput, userID int64) (*models.Event, error) {
	event, err := s.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Get organization for the user
	org, err := s.organizationRepo.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if org == nil {
		return nil, ErrUnauthorized
	}

	// Check if user is authorized to update the event (belongs to their organization)
	if event.OrganizationID != org.ID {
		return nil, ErrUnauthorized
	}

	event, err = s.eventRepo.Update(ctx, id, input)
	if err != nil {
		return nil, err
	}

	return event, nil
}

func (s *EventService) Delete(ctx context.Context, id int64, userID int64) error {
	event, err := s.GetByID(ctx, id)
	if err != nil {
		return err
	}

	// Get organization for the user
	org, err := s.organizationRepo.GetByUserID(ctx, userID)
	if err != nil {
		return err
	}
	if org == nil {
		return ErrUnauthorized
	}

	// Check if user is authorized to delete the event (belongs to their organization)
	if event.OrganizationID != org.ID {
		return ErrUnauthorized
	}

	if err := s.eventRepo.Delete(ctx, id); err != nil {
		return err
	}

	return nil
}

func (s *EventService) List(ctx context.Context, offset, limit int) ([]*models.Event, error) {
	events, err := s.eventRepo.List(ctx, offset, limit)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (s *EventService) ListByOrganization(ctx context.Context, organizationID int64, offset, limit int) ([]*models.Event, error) {
	events, err := s.eventRepo.ListByOrganization(ctx, organizationID, offset, limit)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (s *EventService) ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Event, error) {
	events, err := s.eventRepo.ListByVolunteer(ctx, volunteerID, offset, limit)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (s *EventService) Search(ctx context.Context, date time.Time, location string, skills []string, status string, category string, offset, limit int) ([]*models.Event, error) {
	// Search in database
	params := repository.SearchParams{
		Date:     date,
		Location: location,
		Skills:   skills,
		Status:   status,
		Category: category,
		Offset:   offset,
		Limit:    limit,
	}

	events, err := s.eventRepo.Search(ctx, params)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (s *EventService) RegisterForEvent(ctx context.Context, eventID, volunteerID int64) (*models.EventRegistration, error) {
	event, err := s.GetByID(ctx, eventID)
	if err != nil {
		return nil, err
	}

	// Check if volunteer exists
	volunteer, err := s.volunteerRepo.GetByID(ctx, volunteerID)
	if err != nil {
		return nil, err
	}
	if volunteer == nil {
		return nil, errors.New("volunteer not found")
	}

	// Check event capacity
	registrations, err := s.eventRegRepo.ListByEvent(ctx, eventID, 0, 1000)
	if err != nil {
		return nil, err
	}

	if len(registrations) >= event.VolunteersNeeded {
		return nil, ErrEventCapacityFull
	}

	// Check if already registered
	existingReg, err := s.eventRegRepo.GetByEventAndVolunteer(ctx, eventID, volunteerID)
	if err != nil {
		return nil, err
	}
	if existingReg != nil {
		return existingReg, nil // Already registered
	}

	// Create registration
	input := &models.CreateEventRegistrationInput{
		EventID:     eventID,
		VolunteerID: volunteerID,
		Status:      "registered",
	}

	registration, err := s.eventRegRepo.Create(ctx, input)
	if err != nil {
		return nil, err
	}

	return registration, nil
}

func (s *EventService) CheckCapacity(ctx context.Context, eventID int64) (bool, error) {
	event, err := s.GetByID(ctx, eventID)
	if err != nil {
		return false, err
	}

	registrations, err := s.eventRegRepo.ListByEvent(ctx, eventID, 0, 1000)
	if err != nil {
		return false, err
	}

	return len(registrations) < event.VolunteersNeeded, nil
}
