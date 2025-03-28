package routes

import (
	"volunteer-management/internal/handlers"
	"volunteer-management/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware, roleMiddleware *middleware.RoleMiddleware) {
	// Public routes
	router.POST("/api/auth/register", handlers.Auth.Register)
	router.POST("/api/auth/login", handlers.Auth.Login)
	router.POST("/api/auth/refresh-token", authMiddleware.AuthRequired(), handlers.Auth.RefreshToken)
	router.POST("/api/auth/logout", authMiddleware.AuthRequired(), handlers.Auth.Logout)

	// Protected routes
	auth := router.Group("/api")
	auth.Use(authMiddleware.AuthRequired())
	{
		// User routes
		auth.GET("/auth/me", handlers.Auth.GetCurrentUser)
		auth.PUT("/auth/me", handlers.Auth.UpdateCurrentUser)
		auth.PUT("/auth/change-password", handlers.Auth.ChangePassword)

		// Event routes
		auth.GET("/events", handlers.Event.List)
		auth.GET("/events/:id", handlers.Event.GetByID)
		auth.GET("/events/search", handlers.Event.Search)

		// Admin/Organization only event routes
		auth.POST("/events", roleMiddleware.RequireRole("admin", "organization"), handlers.Event.Create)
		auth.PUT("/events/:id", roleMiddleware.RequireRole("admin", "organization"), handlers.Event.Update)
		auth.DELETE("/events/:id", roleMiddleware.RequireRole("admin", "organization"), handlers.Event.Delete)

		// Signup routes
		auth.POST("/signups", handlers.Signup.Create)
		auth.GET("/signups/event/:event_id", handlers.Signup.ListByEvent)
		auth.GET("/signups/volunteer/:volunteer_id", handlers.Signup.ListByVolunteer)
		auth.PUT("/signups/:id", handlers.Signup.Update)
		auth.DELETE("/signups/:id", handlers.Signup.Delete)

		// Organization routes
		auth.GET("/organizations", handlers.Organization.ListOrganizations)
		auth.GET("/organizations/:id", handlers.Organization.GetOrganization)
		auth.GET("/organizations/:id/profile", handlers.Organization.GetOrganizationProfile)
		auth.PUT("/organizations/:id/profile", roleMiddleware.RequireRole("organization"), handlers.Organization.UpdateOrganizationProfile)
		auth.GET("/organizations/:id/stats", handlers.Organization.GetOrganizationStats)
		auth.GET("/organizations/:id/events", handlers.Organization.ListOrganizationEvents)

		// Admin only organization routes
		auth.GET("/organizations/pending", roleMiddleware.RequireRole("admin"), handlers.Organization.ListPendingOrganizations)
		auth.PUT("/organizations/:id/verify", roleMiddleware.RequireRole("admin"), handlers.Organization.VerifyOrganization)

		// Volunteer routes
		auth.GET("/volunteers", roleMiddleware.RequireRole("admin"), handlers.Volunteer.List)
		auth.GET("/volunteers/:id", handlers.Volunteer.GetByID)
		auth.POST("/volunteers", handlers.Volunteer.Create)
		auth.PUT("/volunteers/:id", handlers.Volunteer.Update)
		auth.DELETE("/volunteers/:id", roleMiddleware.RequireRole("admin"), handlers.Volunteer.Delete)

		// Message routes
		auth.POST("/messages", handlers.Message.SendMessage)
		auth.GET("/messages/conversations", handlers.Message.ListConversations)
		auth.GET("/messages/conversations/:id", handlers.Message.GetConversation)
		auth.GET("/messages/conversations/:id/messages", handlers.Message.ListMessages)
		auth.POST("/messages/conversations", handlers.Message.CreateConversation)
		auth.PUT("/messages/:id/read", handlers.Message.MarkAsRead)
		auth.PUT("/messages/conversations/:id/read-all", handlers.Message.MarkAllAsRead)

		// Analytics routes
		auth.GET("/analytics/admin/dashboard", roleMiddleware.RequireRole("admin"), handlers.Analytics.GetAdminDashboardStats)
		auth.GET("/analytics/recent-activity", handlers.Analytics.GetRecentActivity)
		auth.GET("/analytics/pending-organizations", roleMiddleware.RequireRole("admin"), handlers.Analytics.GetPendingOrganizations)
		auth.GET("/analytics/top-organizations", handlers.Analytics.GetTopOrganizations)
		auth.GET("/analytics/upcoming-events", handlers.Analytics.GetUpcomingEvents)
		auth.GET("/analytics/volunteer-demographics", roleMiddleware.RequireRole("admin"), handlers.Analytics.GetVolunteerDemographics)
		auth.GET("/analytics/event-attendance", handlers.Analytics.GetEventAttendance)
		auth.GET("/analytics/organization-stats", handlers.Analytics.GetOrganizationStats)
		auth.GET("/analytics/organization-event-stats", handlers.Analytics.GetOrganizationEventStats)
		auth.GET("/analytics/volunteer-stats", handlers.Analytics.GetVolunteerStats)
	}

	// WebSocket route
	router.GET("/ws", authMiddleware.AuthRequired(), handlers.WebSocket.HandleWebSocket)
}
