package handlers

import (
	"net/http"
	"strconv"
	"volunteer-management/internal/models"
	"volunteer-management/internal/service"

	"github.com/gin-gonic/gin"
)

type OrganizationHandler struct {
	organizationService *service.OrganizationService
}

func NewOrganizationHandler(organizationService *service.OrganizationService) *OrganizationHandler {
	return &OrganizationHandler{
		organizationService: organizationService,
	}
}

func (h *OrganizationHandler) ListOrganizations(c *gin.Context) {
	offset, limit := getPagination(c)

	organizations, err := h.organizationService.List(c.Request.Context(), offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organizations"})
		return
	}

	c.JSON(http.StatusOK, organizations)
}

func (h *OrganizationHandler) GetOrganization(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid organization ID"})
		return
	}

	organization, err := h.organizationService.GetByID(c.Request.Context(), id)
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization"})
		return
	}

	c.JSON(http.StatusOK, organization)
}

func (h *OrganizationHandler) GetOrganizationProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	organization, err := h.organizationService.GetOrganizationProfile(c.Request.Context(), userID.(int64))
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization profile not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization profile"})
		return
	}

	c.JSON(http.StatusOK, organization)
}

func (h *OrganizationHandler) UpdateOrganizationProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var input models.UpdateOrganizationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	organization, err := h.organizationService.UpdateOrganizationProfile(c.Request.Context(), userID.(int64), &input)
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization profile not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update organization profile"})
		return
	}

	c.JSON(http.StatusOK, organization)
}

func (h *OrganizationHandler) GetOrganizationStats(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Get organization ID from user ID
	organization, err := h.organizationService.GetByUserID(c.Request.Context(), userID.(int64))
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization"})
		return
	}

	stats, err := h.organizationService.GetStats(c.Request.Context(), organization.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization stats"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func (h *OrganizationHandler) ListOrganizationEvents(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	offset, limit := getPagination(c)

	events, err := h.organizationService.ListOrganizationEvents(c.Request.Context(), userID.(int64), offset, limit)
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch organization events"})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *OrganizationHandler) ListPendingOrganizations(c *gin.Context) {
	limit := getLimitParam(c, 10)

	organizations, err := h.organizationService.ListPendingVerification(c.Request.Context(), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending organizations"})
		return
	}

	c.JSON(http.StatusOK, organizations)
}

func (h *OrganizationHandler) VerifyOrganization(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid organization ID"})
		return
	}

	err = h.organizationService.VerifyOrganization(c.Request.Context(), id, userID.(int64))
	if err != nil {
		if err == service.ErrOrganizationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
			return
		}
		if err == service.ErrUnauthorized {
			c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to verify organizations"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to verify organization"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Organization verified successfully"})
}
