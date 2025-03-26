package service

import (
	"context"
	"errors"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
	"volunteer-management/pkg/utils"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrUserExists         = errors.New("user already exists")
	ErrInvalidToken       = errors.New("invalid or expired token")
)

// TokenClaims represents the claims in JWT token
type TokenClaims struct {
	UserID int64  `json:"user_id"`
	Role   string `json:"role"`
}

type AuthService struct {
	userRepo  repository.UserRepository
	jwtConfig *utils.JWTConfig
}

func NewAuthService(userRepo repository.UserRepository, jwtConfig *utils.JWTConfig) *AuthService {
	return &AuthService{
		userRepo:  userRepo,
		jwtConfig: jwtConfig,
	}
}

// LoginLegacy authenticates a user and returns tokens if successful (legacy method)
func (s *AuthService) LoginLegacy(ctx context.Context, email, password string, role models.Role) (*models.User, string, string, error) {
	// Find user by email
	user, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, "", "", err
	}

	// Check if user has the correct role
	if user.Role != role {
		return nil, "", "", errors.New("invalid role for this user")
	}

	// Compare provided password with stored hash
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return nil, "", "", errors.New("invalid credentials")
	}

	// Generate tokens
	accessToken, err := utils.GenerateAccessToken(user, s.jwtConfig.Secret, s.jwtConfig.AccessTokenExpiry)
	if err != nil {
		return nil, "", "", err
	}

	refreshToken, err := utils.GenerateRefreshToken(user, s.jwtConfig.Secret, s.jwtConfig.RefreshTokenExpiry)
	if err != nil {
		return nil, "", "", err
	}

	return user, accessToken, refreshToken, nil
}

// RegisterLegacy creates a new user account (legacy method)
func (s *AuthService) RegisterLegacy(ctx context.Context, input *models.CreateUserInput) (*models.User, error) {
	// Check if email already exists
	existingUser, err := s.userRepo.GetByEmail(ctx, input.Email)
	if err == nil && existingUser != nil {
		return nil, errors.New("email already registered")
	}

	// Create user through repository
	return s.userRepo.Create(ctx, input)
}

// ValidateToken validates a JWT token and returns the user ID and role
func (s *AuthService) ValidateToken(tokenString string) (int64, string, error) {
	claims, err := utils.VerifyToken(tokenString, s.jwtConfig.Secret)
	if err != nil {
		return 0, "", err
	}

	// Extract user ID and role from claims
	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		return 0, "", errors.New("invalid user ID in token")
	}

	userID := int64(userIDFloat)

	role, ok := claims["role"].(string)
	if !ok {
		return 0, "", errors.New("invalid role in token")
	}

	return userID, role, nil
}

type RegisterInput struct {
	Name     string      `json:"name" binding:"required"`
	Email    string      `json:"email" binding:"required,email"`
	Password string      `json:"password" binding:"required,min=6"`
	Role     models.Role `json:"role" binding:"required,oneof=admin volunteer"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	User         *models.User `json:"user"`
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
}

func (s *AuthService) Register(ctx context.Context, input *RegisterInput) (*AuthResponse, error) {
	// Check if user exists
	existingUser, err := s.userRepo.GetByEmail(ctx, input.Email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, ErrUserExists
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(input.Password)
	if err != nil {
		return nil, err
	}

	// Create user
	createInput := &models.CreateUserInput{
		Name:     input.Name,
		Email:    input.Email,
		Password: hashedPassword,
		Role:     input.Role,
	}

	user, err := s.userRepo.Create(ctx, createInput)
	if err != nil {
		return nil, err
	}

	// Generate tokens
	accessToken, err := utils.GenerateAccessToken(user, s.jwtConfig.Secret, s.jwtConfig.AccessTokenExpiry)
	if err != nil {
		return nil, err
	}

	refreshToken, err := utils.GenerateRefreshToken(user, s.jwtConfig.Secret, s.jwtConfig.RefreshTokenExpiry)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		User:         user,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s *AuthService) Login(ctx context.Context, input *LoginInput) (*AuthResponse, error) {
	user, err := s.userRepo.GetByEmail(ctx, input.Email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrInvalidCredentials
	}

	// Verify password
	if !utils.CheckPasswordHash(input.Password, user.PasswordHash) {
		return nil, ErrInvalidCredentials
	}

	// Generate tokens
	accessToken, err := utils.GenerateAccessToken(user, s.jwtConfig.Secret, s.jwtConfig.AccessTokenExpiry)
	if err != nil {
		return nil, err
	}

	refreshToken, err := utils.GenerateRefreshToken(user, s.jwtConfig.Secret, s.jwtConfig.RefreshTokenExpiry)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		User:         user,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
