package handlers

import (
	"net/http"
	"strconv"
	"volunteer-management/internal/service"

	"github.com/gin-gonic/gin"
)

type AnalyticsHandler struct {
	analyticsService *service.AnalyticsService
}

func NewAnalyticsHandler(analyticsService *service.AnalyticsService) *AnalyticsHandler {
	return &AnalyticsHandler{
		analyticsService: analyticsService,
	}
}

func (h *AnalyticsHandler) GetAdminDashboardStats(c *gin.Context) {
	stats, err := h.analyticsService.GetAdminDashboardStats(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch admin dashboard stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func (h *AnalyticsHandler) GetRecentActivity(c *gin.Context) {
	limit := getLimitParam(c, DefaultLimit)
	activities, err := h.analyticsService.GetRecentActivity(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recent activity"})
		return
	}

	c.JSON(http.StatusOK, activities)
}

func (h *AnalyticsHandler) GetPendingOrganizations(c *gin.Context) {
	limit := getLimitParam(c, DefaultLimit)
	organizations, err := h.analyticsService.GetPendingOrganizations(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending organizations"})
		return
	}

	c.JSON(http.StatusOK, organizations)
}

func (h *AnalyticsHandler) GetTopOrganizations(c *gin.Context) {
	limit := getLimitParam(c, DefaultLimit)
	organizations, err := h.analyticsService.GetTopOrganizations(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch top organizations"})
		return
	}

	c.JSON(http.StatusOK, organizations)
}

func (h *AnalyticsHandler) GetUpcomingEvents(c *gin.Context) {
	limit := getLimitParam(c, DefaultLimit)
	events, err := h.analyticsService.GetUpcomingEvents(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch upcoming events"})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *AnalyticsHandler) GetVolunteerDemographics(c *gin.Context) {
	demographics, err := h.analyticsService.GetVolunteerDemographics(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch volunteer demographics"})
		return
	}

	c.JSON(http.StatusOK, demographics)
}

func (h *AnalyticsHandler) GetEventAttendance(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "10")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	attendance, err := h.analyticsService.GetEventAttendance(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch event attendance"})
		return
	}

	c.JSON(http.StatusOK, attendance)
}

func (h *AnalyticsHandler) GetOrganizationStats(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid organization ID"})
		return
	}

	stats, err := h.analyticsService.GetOrganizationStats(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func (h *AnalyticsHandler) GetOrganizationEventStats(c *gin.Context) {
	orgIDStr := c.Param("id")
	orgID, err := strconv.ParseInt(orgIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid organization ID"})
		return
	}

	stats, err := h.analyticsService.GetOrganizationEventStats(c.Request.Context(), orgID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization event stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func (h *AnalyticsHandler) GetVolunteerStats(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	stats, err := h.analyticsService.GetVolunteerStats(c.Request.Context(), userID.(int64))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch volunteer stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}
