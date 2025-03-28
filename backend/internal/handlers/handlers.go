package handlers

import (
	"volunteer-management/internal/service"
	"volunteer-management/pkg/websocket"
)

type Handlers struct {
	Auth         *AuthHandler
	Event        *EventHandler
	Signup       *SignupHandler
	Organization *OrganizationHandler
	Volunteer    *VolunteerHandler
	Message      *MessageHandler
	Analytics    *AnalyticsHandler
	WebSocket    *WebSocketHandler
}

func NewHandlers(
	authService *service.AuthService,
	eventService *service.EventService,
	signupService *service.SignupService,
	organizationService *service.OrganizationService,
	volunteerService *service.VolunteerService,
	messageService *service.MessageService,
	analyticsService *service.AnalyticsService,
	wsManager *websocket.Manager,
) *Handlers {
	return &Handlers{
		Auth:         NewAuthHandler(authService),
		Event:        NewEventHandler(eventService),
		Signup:       NewSignupHandler(signupService),
		Organization: NewOrganizationHandler(organizationService),
		Volunteer:    NewVolunteerHandler(volunteerService),
		Message:      NewMessageHandler(messageService),
		Analytics:    NewAnalyticsHandler(analyticsService),
		WebSocket:    NewWebSocketHandler(wsManager),
	}
}
