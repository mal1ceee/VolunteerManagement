package repository

import (
	"context"
	"time"
	"volunteer-management/internal/models"
)

type SearchParams struct {
	Date     time.Time
	Location string
	Skills   []string
	Status   string
	Category string
	Offset   int
	Limit    int
}

// User repositories
type UserRepository interface {
	Create(ctx context.Context, input *models.CreateUserInput) (*models.User, error)
	GetByID(ctx context.Context, id int64) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	Update(ctx context.Context, id int64, input *models.UpdateUserInput) (*models.User, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.User, error)
	ListByRole(ctx context.Context, role models.Role, offset, limit int) ([]*models.User, error)
	UpdateLastActive(ctx context.Context, id int64) error
}

// Event repositories
type EventRepository interface {
	Create(ctx context.Context, input *models.CreateEventInput, organizationID int64) (*models.Event, error)
	GetByID(ctx context.Context, id int64) (*models.Event, error)
	Update(ctx context.Context, id int64, input *models.UpdateEventInput) (*models.Event, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Event, error)
	ListByOrganization(ctx context.Context, organizationID int64, offset, limit int) ([]*models.Event, error)
	ListByStatus(ctx context.Context, status models.EventStatus, offset, limit int) ([]*models.Event, error)
	ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.Event, error)
	Search(ctx context.Context, params SearchParams) ([]*models.Event, error)
	CountByStatus(ctx context.Context) (map[models.EventStatus]int, error)
	ListUpcoming(ctx context.Context, limit int) ([]*models.Event, error)
}

// Volunteer repositories
type VolunteerRepository interface {
	Create(ctx context.Context, input *models.CreateVolunteerInput) (*models.Volunteer, error)
	GetByID(ctx context.Context, id int64) (*models.Volunteer, error)
	GetByUserID(ctx context.Context, userID int64) (*models.Volunteer, error)
	Update(ctx context.Context, id int64, input *models.UpdateVolunteerInput) (*models.Volunteer, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Volunteer, error)
	ListByStatus(ctx context.Context, status models.VolunteerStatus, offset, limit int) ([]*models.Volunteer, error)
	ListBySkills(ctx context.Context, skills []string, offset, limit int) ([]*models.Volunteer, error)
	ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.Volunteer, error)
	GetStats(ctx context.Context, volunteerID int64) (*models.VolunteerStatsResponse, error)
	ListAchievements(ctx context.Context, volunteerID int64) ([]*models.Achievement, error)
}

// Organization repositories
type OrganizationRepository interface {
	Create(ctx context.Context, input *models.CreateOrganizationInput) (*models.Organization, error)
	GetByID(ctx context.Context, id int64) (*models.Organization, error)
	GetByUserID(ctx context.Context, userID int64) (*models.Organization, error)
	Update(ctx context.Context, id int64, input *models.UpdateOrganizationInput) (*models.Organization, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Organization, error)
	ListByStatus(ctx context.Context, status models.OrganizationStatus, offset, limit int) ([]*models.Organization, error)
	ListByCategory(ctx context.Context, category string, offset, limit int) ([]*models.Organization, error)
	ListPendingVerification(ctx context.Context, limit int) ([]*models.Organization, error)
	ListTopByImpact(ctx context.Context, limit int) ([]*models.TopOrganization, error)
	GetStats(ctx context.Context, orgID int64) (*models.OrganizationStatsResponse, error)
	VerifyOrganization(ctx context.Context, id int64) error
}

// Event Registration repositories
type EventRegistrationRepository interface {
	Create(ctx context.Context, input *models.CreateEventRegistrationInput) (*models.EventRegistration, error)
	GetByID(ctx context.Context, id int64) (*models.EventRegistration, error)
	GetByEventAndVolunteer(ctx context.Context, eventID, volunteerID int64) (*models.EventRegistration, error)
	Update(ctx context.Context, id int64, input *models.UpdateEventRegistrationInput) (*models.EventRegistration, error)
	Delete(ctx context.Context, id int64) error
	ListByEvent(ctx context.Context, eventID int64, offset, limit int) ([]*models.EventRegistration, error)
	ListByVolunteer(ctx context.Context, volunteerID int64, offset, limit int) ([]*models.EventRegistration, error)
	CountByEvent(ctx context.Context, eventID int64) (int, error)
}

// Message repositories
type MessageRepository interface {
	Create(ctx context.Context, input *models.CreateMessageInput) (*models.Message, error)
	GetByID(ctx context.Context, id int64) (*models.Message, error)
	Update(ctx context.Context, id int64, input *models.UpdateMessageInput) (*models.Message, error)
	ListByConversation(ctx context.Context, conversationID int64, offset, limit int) ([]*models.Message, error)
	MarkAsRead(ctx context.Context, messageID int64) error
	MarkAllAsRead(ctx context.Context, conversationID, userID int64) error
}

// Conversation repositories
type ConversationRepository interface {
	Create(ctx context.Context, user1ID, user2ID int64) (*models.Conversation, error)
	GetByID(ctx context.Context, id int64) (*models.Conversation, error)
	GetByUsers(ctx context.Context, user1ID, user2ID int64) (*models.Conversation, error)
	ListByUser(ctx context.Context, userID int64, offset, limit int) ([]*models.ConversationResponse, error)
	UpdateLastMessage(ctx context.Context, id int64, text string, time time.Time) error
	GetUnreadCount(ctx context.Context, conversationID, userID int64) (int, error)
}

// Analytics repositories
type AnalyticsRepository interface {
	GetAdminDashboardStats(ctx context.Context) (*models.AdminDashboardStats, error)
	GetRecentActivity(ctx context.Context, limit int) ([]*models.RecentActivity, error)
	GetPendingOrganizations(ctx context.Context, limit int) ([]*models.PendingOrganization, error)
	GetTopOrganizations(ctx context.Context, limit int) ([]*models.TopOrganization, error)
	GetUpcomingEvents(ctx context.Context, limit int) ([]*models.UpcomingEvent, error)
	GetVolunteerDemographics(ctx context.Context) (*models.VolunteerDemographics, error)
	GetEventAttendance(ctx context.Context, limit int) ([]*models.EventAttendance, error)
}
