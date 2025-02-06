package models

import (
	"time"
)

type SignupStatus string

const (
	SignupStatusPending   SignupStatus = "pending"
	SignupStatusConfirmed SignupStatus = "confirmed"
	SignupStatusCancelled SignupStatus = "cancelled"
)

type Signup struct {
	ID          int64        `json:"id"`
	EventID     int64        `json:"event_id"`
	VolunteerID int64        `json:"volunteer_id"`
	Status      SignupStatus `json:"status"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
}

type CreateSignupInput struct {
	EventID     int64        `json:"event_id" binding:"required"`
	VolunteerID int64        `json:"volunteer_id" binding:"required"`
	Status      SignupStatus `json:"status" binding:"required,oneof=pending confirmed cancelled"`
}

type UpdateSignupInput struct {
	Status *SignupStatus `json:"status,omitempty" binding:"omitempty,oneof=pending confirmed cancelled"`
}
