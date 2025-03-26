package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// Default pagination values
const (
	DefaultOffset = 0
	DefaultLimit  = 20
	MaxLimit      = 100
)

// getPagination extracts and validates pagination parameters from the request
func getPagination(c *gin.Context) (int, int) {
	offset := getOffsetParam(c, DefaultOffset)
	limit := getLimitParam(c, DefaultLimit)
	return offset, limit
}

// getOffsetParam extracts and validates the offset parameter
func getOffsetParam(c *gin.Context, defaultValue int) int {
	offsetStr := c.DefaultQuery("offset", strconv.Itoa(defaultValue))
	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset < 0 {
		return defaultValue
	}
	return offset
}

// getLimitParam extracts and validates the limit parameter
func getLimitParam(c *gin.Context, defaultValue int) int {
	limitStr := c.DefaultQuery("limit", strconv.Itoa(defaultValue))
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		return defaultValue
	}
	if limit > MaxLimit {
		return MaxLimit
	}
	return limit
}

// getIntParam extracts and validates an integer parameter
func getIntParam(c *gin.Context, param string, defaultValue int) int {
	valueStr := c.DefaultQuery(param, strconv.Itoa(defaultValue))
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

// getBoolParam extracts and validates a boolean parameter
func getBoolParam(c *gin.Context, param string, defaultValue bool) bool {
	valueStr := c.DefaultQuery(param, strconv.FormatBool(defaultValue))
	value, err := strconv.ParseBool(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}
