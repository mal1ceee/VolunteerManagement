package handlers

import (
	"net/http"
	"strconv"
	"volunteer-management/internal/models"
	"volunteer-management/internal/service"

	"github.com/gin-gonic/gin"
)

type SignupHandler struct {
	signupService *service.SignupService
}

func NewSignupHandler(signupService *service.SignupService) *SignupHandler {
	return &SignupHandler{
		signupService: signupService,
	}
}

func (h *SignupHandler) Create(c *gin.Context) {
	var input models.CreateSignupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	signup, err := h.signupService.Create(c.Request.Context(), &input)
	if err != nil {
		switch err {
		case service.ErrEventNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		case service.ErrVolunteerNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Volunteer not found"})
		case service.ErrEventCapacityFull:
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		case service.ErrAlreadySignedUp:
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusCreated, signup)
}

func (h *SignupHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	signup, err := h.signupService.GetByID(c.Request.Context(), id)
	if err != nil {
		switch err {
		case service.ErrSignupNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, signup)
}

func (h *SignupHandler) Update(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var input models.UpdateSignupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	signup, err := h.signupService.Update(c.Request.Context(), id, &input)
	if err != nil {
		switch err {
		case service.ErrSignupNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		case service.ErrInvalidSignupStatus:
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, signup)
}

func (h *SignupHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	if err := h.signupService.Delete(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *SignupHandler) ListByEvent(c *gin.Context) {
	eventID, err := strconv.ParseInt(c.Param("eventId"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid event ID format"})
		return
	}

	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	signups, err := h.signupService.ListByEvent(c.Request.Context(), eventID, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, signups)
}

func (h *SignupHandler) ListByVolunteer(c *gin.Context) {
	volunteerID, err := strconv.ParseInt(c.Param("volunteerId"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid volunteer ID format"})
		return
	}

	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	signups, err := h.signupService.ListByVolunteer(c.Request.Context(), volunteerID, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, signups)
}

func (h *SignupHandler) RegisterRoutes(router *gin.Engine, authMiddleware gin.HandlerFunc) {
	signups := router.Group("/api/signups")
	signups.Use(authMiddleware)
	{
		signups.POST("", h.Create)
		signups.GET("/:id", h.GetByID)
		signups.PUT("/:id", h.Update)
		signups.DELETE("/:id", h.Delete)
		signups.GET("/event/:eventId", h.ListByEvent)
		signups.GET("/volunteer/:volunteerId", h.ListByVolunteer)
	}
}
