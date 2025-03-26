package handlers

import (
	"net/http"
	"volunteer-management/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var input service.RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := h.authService.Register(c.Request.Context(), &input)
	if err != nil {
		switch err {
		case service.ErrUserExists:
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusCreated, response)
}

// Login handles user authentication
func (h *AuthHandler) Login(c *gin.Context) {
	var input service.LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := h.authService.Login(c.Request.Context(), &input)
	if err != nil {
		switch err {
		case service.ErrInvalidCredentials:
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, response)
}

// RefreshToken handles refreshing an auth token
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	// Implementation for refreshing token
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Not implemented yet"})
}

// Logout handles user logout
func (h *AuthHandler) Logout(c *gin.Context) {
	// Implementation for logout
	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}

// GetCurrentUser retrieves the current authenticated user
func (h *AuthHandler) GetCurrentUser(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Implementation for getting user details
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Not implemented yet", "userID": userID})
}

// UpdateCurrentUser updates the current user's details
func (h *AuthHandler) UpdateCurrentUser(c *gin.Context) {
	// Implementation for updating user details
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Not implemented yet"})
}

// ChangePassword handles password change requests
func (h *AuthHandler) ChangePassword(c *gin.Context) {
	// Implementation for changing password
	c.JSON(http.StatusNotImplemented, gin.H{"message": "Not implemented yet"})
}

func (h *AuthHandler) RegisterRoutes(router *gin.Engine) {
	auth := router.Group("/api/auth")
	{
		auth.POST("/register", h.Register)
		auth.POST("/login", h.Login)
	}
}
