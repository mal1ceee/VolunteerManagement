package models

import (
	"time"
)

type Volunteer struct {
	ID           int64     `json:"id"`
	UserID       int64     `json:"user_id"`
	Skills       []string  `json:"skills"`
	Availability string    `json:"availability"`
	Bio          string    `json:"bio"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateVolunteerInput struct {
	UserID       int64    `json:"user_id" binding:"required"`
	Skills       []string `json:"skills" binding:"required"`
	Availability string   `json:"availability" binding:"required"`
	Bio          string   `json:"bio" binding:"required"`
}

type UpdateVolunteerInput struct {
	Skills       *[]string `json:"skills,omitempty"`
	Availability *string   `json:"availability,omitempty"`
	Bio          *string   `json:"bio,omitempty"`
}
