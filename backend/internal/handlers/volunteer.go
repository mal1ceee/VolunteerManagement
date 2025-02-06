package handlers

import (
	"net/http"
	"strconv"
	"volunteer-management/internal/models"
	"volunteer-management/internal/service"

	"github.com/gin-gonic/gin"
)

type VolunteerHandler struct {
	volunteerService *service.VolunteerService
}

func NewVolunteerHandler(volunteerService *service.VolunteerService) *VolunteerHandler {
	return &VolunteerHandler{
		volunteerService: volunteerService,
	}
}

func (h *VolunteerHandler) Create(c *gin.Context) {
	var input models.CreateVolunteerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user ID from context (set by auth middleware)
	userID := c.GetInt64("userID")

	volunteer, err := h.volunteerService.Create(c.Request.Context(), userID, &input)
	if err != nil {
		switch err {
		case service.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusCreated, volunteer)
}

func (h *VolunteerHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	volunteer, err := h.volunteerService.GetByID(c.Request.Context(), id)
	if err != nil {
		switch err {
		case service.ErrVolunteerNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, volunteer)
}

func (h *VolunteerHandler) Update(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var input models.UpdateVolunteerInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	volunteer, err := h.volunteerService.Update(c.Request.Context(), id, &input)
	if err != nil {
		switch err {
		case service.ErrVolunteerNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, volunteer)
}

func (h *VolunteerHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	if err := h.volunteerService.Delete(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *VolunteerHandler) List(c *gin.Context) {
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	volunteers, err := h.volunteerService.List(c.Request.Context(), offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, volunteers)
}

func (h *VolunteerHandler) RegisterRoutes(router *gin.Engine, authMiddleware gin.HandlerFunc) {
	volunteers := router.Group("/api/volunteers")
	volunteers.Use(authMiddleware)
	{
		volunteers.POST("", h.Create)
		volunteers.GET("/:id", h.GetByID)
		volunteers.PUT("/:id", h.Update)
		volunteers.DELETE("/:id", h.Delete)
		volunteers.GET("", h.List)
	}
}
