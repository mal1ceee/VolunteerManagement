package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type RateLimiter struct {
	sync.Mutex
	requests map[string][]time.Time
	limit    int
	window   time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
}

func (rl *RateLimiter) cleanup(now time.Time) {
	for ip, times := range rl.requests {
		var valid []time.Time
		for _, t := range times {
			if now.Sub(t) <= rl.window {
				valid = append(valid, t)
			}
		}
		if len(valid) == 0 {
			delete(rl.requests, ip)
		} else {
			rl.requests[ip] = valid
		}
	}
}

func (rl *RateLimiter) isAllowed(ip string) bool {
	rl.Lock()
	defer rl.Unlock()

	now := time.Now()
	rl.cleanup(now)

	times := rl.requests[ip]
	if len(times) < rl.limit {
		rl.requests[ip] = append(times, now)
		return true
	}

	// Check if the oldest request is outside the window
	if now.Sub(times[0]) > rl.window {
		rl.requests[ip] = append(times[1:], now)
		return true
	}

	return false
}

// RateLimit middleware limits the number of requests per IP within a time window
func RateLimit(limit int, window time.Duration) gin.HandlerFunc {
	rateLimiter := NewRateLimiter(limit, window)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		if !rateLimiter.isAllowed(ip) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Rate limit exceeded. Please try again later.",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

// ErrorMiddleware handles panics and returns appropriate error responses
func ErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Log the error here
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Internal server error",
				})
			}
		}()
		c.Next()
	}
}
