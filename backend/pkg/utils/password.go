package utils

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrHashingFailed = errors.New("failed to hash password")
	MinPasswordLen   = 6
)

// HashPassword generates a bcrypt hash from a password
func HashPassword(password string) (string, error) {
	if len(password) < MinPasswordLen {
		return "", errors.New("password must be at least 6 characters long")
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// CheckPasswordHash compares a password with a bcrypt hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// ValidatePassword checks if a password meets the minimum requirements
func ValidatePassword(password string) error {
	if len(password) < MinPasswordLen {
		return errors.New("password must be at least 6 characters long")
	}
	return nil
}
