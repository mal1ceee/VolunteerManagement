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
	"volunteer-management/internal/routes"
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
	eventService := service.NewEventService(db)
	signupService := service.NewSignupService(db)
	organizationService := service.NewOrganizationService(db)
	volunteerService := service.NewVolunteerService(db)
	messageService := service.NewMessageService(db)
	analyticsService := service.NewAnalyticsService(db)

	// Initialize handlers
	handlers := handlers.NewHandlers(
		authService,
		eventService,
		signupService,
		organizationService,
		volunteerService,
		messageService,
		analyticsService,
		wsManager,
	)

	// Initialize middleware
	authMiddleware := middleware.NewAuthMiddleware(authService)
	roleMiddleware := middleware.NewRoleMiddleware()

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

	// Setup routes
	routes.SetupRoutes(router, handlers, authMiddleware, roleMiddleware)

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
