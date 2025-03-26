package models

import (
	"time"
)

type Role string

const (
	RoleAdmin        Role = "admin"
	RoleVolunteer    Role = "volunteer"
	RoleOrganization Role = "organization"
)

type User struct {
	ID           int64     `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"` // "-" means this field won't be included in JSON
	Role         Role      `json:"role"`
	Avatar       string    `json:"avatar,omitempty"`
	Phone        string    `json:"phone,omitempty"`
	Location     string    `json:"location,omitempty"`
	LastActive   time.Time `json:"last_active,omitempty"`
	Status       string    `json:"status,omitempty"` // active, pending, suspended
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateUserInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Role     Role   `json:"role" binding:"required,oneof=admin volunteer organization"`
	Avatar   string `json:"avatar,omitempty"`
	Phone    string `json:"phone,omitempty"`
	Location string `json:"location,omitempty"`
}

type UpdateUserInput struct {
	Name     *string `json:"name,omitempty"`
	Email    *string `json:"email,omitempty" binding:"omitempty,email"`
	Password *string `json:"password,omitempty" binding:"omitempty,min=6"`
	Avatar   *string `json:"avatar,omitempty"`
	Phone    *string `json:"phone,omitempty"`
	Location *string `json:"location,omitempty"`
	Status   *string `json:"status,omitempty" binding:"omitempty,oneof=active pending suspended"`
}

type UserResponse struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      Role      `json:"role"`
	Avatar    string    `json:"avatar,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Location  string    `json:"location,omitempty"`
	Status    string    `json:"status,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
	Role     Role   `json:"role" binding:"required,oneof=admin volunteer organization"`
}

type LoginResponse struct {
	Token        string       `json:"token"`
	RefreshToken string       `json:"refresh_token"`
	User         UserResponse `json:"user"`
}
