package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"volunteer-management/internal/config"
	"volunteer-management/internal/handlers"
	"volunteer-management/internal/middleware"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository/postgres"
	"volunteer-management/internal/service"
	"volunteer-management/internal/websocket"
	"volunteer-management/pkg/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// UserRepoAdapter adapts postgres.UserRepository to repository.UserRepository
type UserRepoAdapter struct {
	*postgres.UserRepository
}

// ListByRole implements the missing method to satisfy repository.UserRepository
func (a *UserRepoAdapter) ListByRole(ctx context.Context, role models.Role, offset, limit int) ([]*models.User, error) {
	// Simple implementation that returns empty slice
	return []*models.User{}, nil
}

// UpdateLastActive implements the missing method to satisfy repository.UserRepository
func (a *UserRepoAdapter) UpdateLastActive(ctx context.Context, id int64) error {
	// Simple implementation that does nothing
	return nil
}

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize database connection
	db, err := database.NewPostgresConnection(cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Get the underlying SQL DB
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get underlying *sql.DB: %v", err)
	}
	defer sqlDB.Close()

	// Initialize repositories
	userRepo := &UserRepoAdapter{postgres.NewUserRepository(db)}
	// Commenting out unused repositories for now
	/*
		eventRepo := postgres.NewEventRepository(db)
		volunteerRepo := postgres.NewVolunteerRepository(db)
		organizationRepo := postgres.NewOrganizationRepository(db)
		eventRegRepo := postgres.NewEventRegistrationRepository(db)
		messageRepo := postgres.NewMessageRepository(db)
		conversationRepo := postgres.NewConversationRepository(db)
		analyticsRepo := postgres.NewAnalyticsRepository(db)
	*/

	// Initialize WebSocket manager
	wsManager := websocket.NewManager()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go wsManager.Run(ctx)

	// Initialize services
	// Using the adapter to satisfy the interface
	authService := service.NewAuthService(userRepo, cfg.JWT)
	/* Temporarily commenting out problematic service initializations
	eventService := service.NewEventService(eventRepo, organizationRepo, volunteerRepo, eventRegRepo)
	volunteerService := service.NewVolunteerService(volunteerRepo, userRepo, eventRegRepo)
	organizationService := service.NewOrganizationService(organizationRepo, userRepo, eventRepo)
	messageService := service.NewMessageService(messageRepo, conversationRepo, userRepo)
	analyticsService := service.NewAnalyticsService(analyticsRepo, userRepo, eventRepo, organizationRepo, volunteerRepo)
	*/

	// Initialize Gin router
	router := gin.Default()

	// Set up CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://volunteer-connect.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Add middleware
	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	// Create middleware instances
	authMiddleware := middleware.NewAuthMiddleware(authService)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(authService)
	/* Temporarily commenting out problematic handler initializations
	eventHandler := handlers.NewEventHandler(eventService)
	volunteerHandler := handlers.NewVolunteerHandler(volunteerService)
	organizationHandler := handlers.NewOrganizationHandler(organizationService)
	messageHandler := handlers.NewMessageHandler(messageService)
	analyticsHandler := handlers.NewAnalyticsHandler(analyticsService)
	*/
	wsHandler := handlers.NewWebSocketHandler(wsManager)

	// Register WebSocket routes
	wsHandler.RegisterRoutes(router, authMiddleware.AuthRequired())

	// API routes
	api := router.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.POST("/register", authHandler.Register)
			auth.POST("/refresh", authHandler.RefreshToken)
			auth.POST("/logout", authMiddleware.AuthRequired(), authHandler.Logout)
		}

		// User routes
		users := api.Group("/users")
		users.Use(authMiddleware.AuthRequired())
		{
			users.GET("/me", authHandler.GetCurrentUser)
			users.PUT("/me", authHandler.UpdateCurrentUser)
			users.PUT("/me/password", authHandler.ChangePassword)
		}

		/* Temporarily commenting out problematic routes
		// Events routes
		events := api.Group("/events")
		{
			events.GET("", eventHandler.ListEvents)
			events.GET("/:id", eventHandler.GetEvent)
			events.POST("", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), eventHandler.CreateEvent)
			events.PUT("/:id", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), eventHandler.UpdateEvent)
			events.DELETE("/:id", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), eventHandler.DeleteEvent)
			events.GET("/search", eventHandler.SearchEvents)
			events.GET("/upcoming", eventHandler.ListUpcomingEvents)

			// Registration for events
			events.POST("/:id/register", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), eventHandler.RegisterForEvent)
			events.PUT("/:id/registration/:regId", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), eventHandler.UpdateRegistration)
			events.GET("/:id/volunteers", authMiddleware.AuthRequired(), eventHandler.ListEventVolunteers)
		}

		// Volunteer routes
		volunteers := api.Group("/volunteers")
		{
			volunteers.GET("", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleAdmin), string(models.RoleOrganization)), volunteerHandler.ListVolunteers)
			volunteers.GET("/:id", volunteerHandler.GetVolunteer)
			volunteers.GET("/profile", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), volunteerHandler.GetVolunteerProfile)
			volunteers.PUT("/profile", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), volunteerHandler.UpdateVolunteerProfile)
			volunteers.GET("/stats", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), volunteerHandler.GetVolunteerStats)
			volunteers.GET("/events", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), volunteerHandler.ListVolunteerEvents)
			volunteers.GET("/achievements", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleVolunteer)), volunteerHandler.GetVolunteerAchievements)
		}

		// Organization routes
		organizations := api.Group("/organizations")
		{
			organizations.GET("", organizationHandler.ListOrganizations)
			organizations.GET("/:id", organizationHandler.GetOrganization)
			organizations.GET("/profile", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), organizationHandler.GetOrganizationProfile)
			organizations.PUT("/profile", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), organizationHandler.UpdateOrganizationProfile)
			organizations.GET("/stats", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), organizationHandler.GetOrganizationStats)
			organizations.GET("/events", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleOrganization)), organizationHandler.ListOrganizationEvents)
			organizations.GET("/pending", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleAdmin)), organizationHandler.ListPendingOrganizations)
			organizations.PUT("/:id/verify", authMiddleware.AuthRequired(), authMiddleware.RoleRequired(string(models.RoleAdmin)), organizationHandler.VerifyOrganization)
		}

		// Message routes
		messages := api.Group("/messages")
		messages.Use(authMiddleware.AuthRequired())
		{
			messages.GET("/conversations", messageHandler.ListConversations)
			messages.GET("/conversations/:id", messageHandler.GetConversation)
			messages.POST("/conversations", messageHandler.CreateConversation)
			messages.GET("/conversations/:id/messages", messageHandler.ListMessages)
			messages.POST("/send", messageHandler.SendMessage)
			messages.PUT("/messages/:id/read", messageHandler.MarkAsRead)
			messages.PUT("/conversations/:id/read", messageHandler.MarkAllAsRead)
		}

		// Analytics routes
		analytics := api.Group("/analytics")
		analytics.Use(authMiddleware.AuthRequired())
		{
			// Admin analytics
			analytics.GET("/admin/dashboard", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetAdminDashboardStats)
			analytics.GET("/admin/recent-activity", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetRecentActivity)
			analytics.GET("/admin/top-organizations", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetTopOrganizations)
			analytics.GET("/admin/upcoming-events", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetUpcomingEvents)
			analytics.GET("/admin/volunteer-demographics", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetVolunteerDemographics)
			analytics.GET("/admin/event-attendance", authMiddleware.RoleRequired(string(models.RoleAdmin)), analyticsHandler.GetEventAttendance)

			// Organization analytics
			analytics.GET("/organization", authMiddleware.RoleRequired(string(models.RoleOrganization)), analyticsHandler.GetOrganizationStats)
			analytics.GET("/organization/events", authMiddleware.RoleRequired(string(models.RoleOrganization)), analyticsHandler.GetOrganizationEventStats)

			// Volunteer analytics
			analytics.GET("/volunteer", authMiddleware.RoleRequired(string(models.RoleVolunteer)), analyticsHandler.GetVolunteerStats)
		}
		*/
	}

	// Initialize server
	srv := &http.Server{
		Addr:         ":" + cfg.Server.Port,
		Handler:      router,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}

	// Start server in a goroutine
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline context for server shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exiting")
}
