package utils

import (
	"errors"
	"regexp"
	"strings"
)

var (
	emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
)

// ValidateEmail checks if the email is valid
func ValidateEmail(email string) error {
	if !emailRegex.MatchString(email) {
		return errors.New("invalid email format")
	}
	return nil
}

// ValidateName checks if the name is valid
func ValidateName(name string) error {
	name = strings.TrimSpace(name)
	if len(name) < 2 {
		return errors.New("name must be at least 2 characters long")
	}
	if len(name) > 50 {
		return errors.New("name must not exceed 50 characters")
	}
	return nil
}

// ValidateRole checks if the role is valid
func ValidateRole(role string) error {
	role = strings.ToLower(role)
	if role != "admin" && role != "volunteer" {
		return errors.New("invalid role: must be either 'admin' or 'volunteer'")
	}
	return nil
}

// ValidateLimit checks if the limit is within acceptable range
func ValidateLimit(limit int) int {
	if limit <= 0 {
		return 10 // default limit
	}
	if limit > 100 {
		return 100 // max limit
	}
	return limit
}

// ValidateOffset ensures offset is non-negative
func ValidateOffset(offset int) int {
	if offset < 0 {
		return 0
	}
	return offset
}
