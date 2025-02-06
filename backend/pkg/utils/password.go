package utils

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrHashingFailed = errors.New("failed to hash password")
	MinPasswordLen   = 6
)

// HashPassword takes a plain text password and returns its bcrypt hash
func HashPassword(password string) (string, error) {
	if len(password) < MinPasswordLen {
		return "", errors.New("password must be at least 6 characters long")
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", ErrHashingFailed
	}

	return string(hashedBytes), nil
}

// CheckPasswordHash compares a plain text password with a hashed password
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
