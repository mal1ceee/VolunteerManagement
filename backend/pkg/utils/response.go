package utils

import (
	"github.com/gin-gonic/gin"
)

// Response represents a standard API response structure
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// NewSuccessResponse creates a new success response
func NewSuccessResponse(data interface{}) Response {
	return Response{
		Success: true,
		Data:    data,
	}
}

// NewErrorResponse creates a new error response
func NewErrorResponse(err string) Response {
	return Response{
		Success: false,
		Error:   err,
	}
}

// RespondWithSuccess sends a success response
func RespondWithSuccess(c *gin.Context, status int, data interface{}) {
	c.JSON(status, NewSuccessResponse(data))
}

// RespondWithError sends an error response
func RespondWithError(c *gin.Context, status int, err string) {
	c.JSON(status, NewErrorResponse(err))
}

// RespondWithValidationError sends a validation error response
func RespondWithValidationError(c *gin.Context, err error) {
	RespondWithError(c, 400, err.Error())
}

// RespondWithServerError sends a server error response
func RespondWithServerError(c *gin.Context, err error) {
	RespondWithError(c, 500, "Internal server error")
}
