package utils

import (
	"errors"
	"time"
	"volunteer-management/internal/models"

	"github.com/golang-jwt/jwt/v4"
)

var (
	ErrInvalidToken = errors.New("invalid token")
)

// JWTConfig holds configuration for JWT tokens
type JWTConfig struct {
	Secret             string
	AccessTokenExpiry  time.Duration
	RefreshTokenExpiry time.Duration
}

// Claims represents the JWT claims
type Claims struct {
	UserID int64  `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// GenerateAccessToken generates a new JWT access token for a user
func GenerateAccessToken(user *models.User, secret string, expiry time.Duration) (string, error) {
	// Set expiration time
	expirationTime := time.Now().Add(expiry)

	// Create claims
	claims := &Claims{
		UserID: user.ID,
		Role:   string(user.Role),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign token with secret key
	return token.SignedString([]byte(secret))
}

// GenerateRefreshToken generates a new JWT refresh token for a user
func GenerateRefreshToken(user *models.User, secret string, expiry time.Duration) (string, error) {
	// Set expiration time (refresh tokens usually have longer expiry)
	expirationTime := time.Now().Add(expiry)

	// Create claims
	claims := &Claims{
		UserID: user.ID,
		Role:   string(user.Role),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign token with secret key
	return token.SignedString([]byte(secret))
}

// VerifyToken validates a JWT token and returns the claims
func VerifyToken(tokenStr string, secret string) (jwt.MapClaims, error) {
	// Parse token
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	// Validate token and extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, ErrInvalidToken
}
