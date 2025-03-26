package middleware

import (
	"net/http"
	"volunteer-management/internal/models"

	"github.com/gin-gonic/gin"
)

type RoleMiddleware struct{}

func NewRoleMiddleware() *RoleMiddleware {
	return &RoleMiddleware{}
}

// RequireRole is a middleware that checks if the user has any of the specified roles
func (m *RoleMiddleware) RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get user role from the context (set by AuthMiddleware)
		userRoleInterface, exists := c.Get("userRole")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user role not found in context"})
			c.Abort()
			return
		}

		userRole, ok := userRoleInterface.(string)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid user role type"})
			c.Abort()
			return
		}

		// Check if the user has any of the required roles
		hasRequiredRole := false
		for _, role := range roles {
			if userRole == role {
				hasRequiredRole = true
				break
			}
		}

		if !hasRequiredRole {
			c.JSON(http.StatusForbidden, gin.H{"error": "insufficient permissions to access this resource"})
			c.Abort()
			return
		}

		c.Next()
	}
}

// AdminOnly is a shortcut middleware for admin-only routes
func (m *RoleMiddleware) AdminOnly() gin.HandlerFunc {
	return m.RequireRole(string(models.RoleAdmin))
}

// VolunteerOnly is a shortcut middleware for volunteer-only routes
func (m *RoleMiddleware) VolunteerOnly() gin.HandlerFunc {
	return m.RequireRole(string(models.RoleVolunteer))
}

// OrganizationOnly is a shortcut middleware for organization-only routes
func (m *RoleMiddleware) OrganizationOnly() gin.HandlerFunc {
	return m.RequireRole(string(models.RoleOrganization))
}
