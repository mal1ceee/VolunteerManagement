package handlers

import (
	"net/http"
	"strconv"
	"strings"
	"time"
	"volunteer-management/internal/models"
	"volunteer-management/internal/service"
	"volunteer-management/internal/utils"

	"github.com/gin-gonic/gin"
)

type EventHandler struct {
	eventService *service.EventService
}

func NewEventHandler(eventService *service.EventService) *EventHandler {
	return &EventHandler{
		eventService: eventService,
	}
}

func (h *EventHandler) Create(c *gin.Context) {
	var input models.CreateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user ID from context (set by auth middleware)
	userID := c.GetInt64("userID")

	event, err := h.eventService.Create(c.Request.Context(), &input, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusCreated, event)
}

func (h *EventHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	event, err := h.eventService.GetByID(c.Request.Context(), id)
	if err != nil {
		switch err {
		case service.ErrEventNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, event)
}

func (h *EventHandler) Update(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var input models.UpdateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt64("userID")

	event, err := h.eventService.Update(c.Request.Context(), id, &input, userID)
	if err != nil {
		switch err {
		case service.ErrEventNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		case service.ErrUnauthorized:
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, event)
}

func (h *EventHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	userID := c.GetInt64("userID")

	if err := h.eventService.Delete(c.Request.Context(), id, userID); err != nil {
		switch err {
		case service.ErrEventNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		case service.ErrUnauthorized:
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *EventHandler) List(c *gin.Context) {
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	events, err := h.eventService.List(c.Request.Context(), offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *EventHandler) Search(c *gin.Context) {
	// Parse query parameters
	dateStr := c.Query("date")
	location := c.Query("location")
	skillsStr := c.Query("skills")
	status := c.Query("status")
	category := c.Query("category")
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	// Parse date if provided
	var date time.Time
	if dateStr != "" {
		var err error
		date, err = time.Parse("2006-01-02", dateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Use YYYY-MM-DD"})
			return
		}
	}

	// Parse skills if provided
	var skills []string
	if skillsStr != "" {
		skills = strings.Split(skillsStr, ",")
	}

	// Validate and adjust pagination
	limit = utils.ValidateLimit(limit)
	offset = utils.ValidateOffset(offset)

	// Perform search
	events, err := h.eventService.Search(c.Request.Context(), date, location, skills, status, category, offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search events"})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *EventHandler) RegisterRoutes(router *gin.Engine, authMiddleware gin.HandlerFunc) {
	events := router.Group("/api/events")
	{
		// Public routes
		events.GET("", h.List)
		events.GET("/search", h.Search)
		events.GET("/:id", h.GetByID)

		// Protected routes
		authorized := events.Group("")
		authorized.Use(authMiddleware)
		{
			authorized.POST("", h.Create)
			authorized.PUT("/:id", h.Update)
			authorized.DELETE("/:id", h.Delete)
		}
	}
}
