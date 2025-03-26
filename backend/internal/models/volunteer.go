package models

import (
	"time"
)

type VerificationLevel string

const (
	VerificationNone     VerificationLevel = "none"
	VerificationBasic    VerificationLevel = "basic"
	VerificationVerified VerificationLevel = "verified"
	VerificationTrusted  VerificationLevel = "trusted"
)

type VolunteerStatus string

const (
	VolunteerStatusActive   VolunteerStatus = "active"
	VolunteerStatusInactive VolunteerStatus = "inactive"
	VolunteerStatusPending  VolunteerStatus = "pending"
)

type Volunteer struct {
	ID                int64             `json:"id"`
	UserID            int64             `json:"user_id"`
	Skills            []string          `json:"skills"`
	Interests         []string          `json:"interests"`
	Availability      string            `json:"availability"`
	Bio               string            `json:"bio"`
	Location          string            `json:"location"`
	Languages         []string          `json:"languages,omitempty"`
	TotalHours        float64           `json:"total_hours"`
	EventsAttended    int               `json:"events_attended"`
	VerificationLevel VerificationLevel `json:"verification_level"`
	Status            VolunteerStatus   `json:"status"`
	LastActive        time.Time         `json:"last_active,omitempty"`
	JoinedDate        time.Time         `json:"joined_date"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
}

type CreateVolunteerInput struct {
	UserID       int64    `json:"user_id" binding:"required"`
	Skills       []string `json:"skills" binding:"required"`
	Interests    []string `json:"interests,omitempty"`
	Availability string   `json:"availability" binding:"required"`
	Bio          string   `json:"bio" binding:"required"`
	Location     string   `json:"location,omitempty"`
	Languages    []string `json:"languages,omitempty"`
}

type UpdateVolunteerInput struct {
	Skills            *[]string          `json:"skills,omitempty"`
	Interests         *[]string          `json:"interests,omitempty"`
	Availability      *string            `json:"availability,omitempty"`
	Bio               *string            `json:"bio,omitempty"`
	Location          *string            `json:"location,omitempty"`
	Languages         *[]string          `json:"languages,omitempty"`
	TotalHours        *float64           `json:"total_hours,omitempty"`
	EventsAttended    *int               `json:"events_attended,omitempty"`
	VerificationLevel *VerificationLevel `json:"verification_level,omitempty"`
	Status            *VolunteerStatus   `json:"status,omitempty"`
	LastActive        *time.Time         `json:"last_active,omitempty"`
}

type VolunteerStatsResponse struct {
	TotalHours     float64 `json:"total_hours"`
	EventsAttended int     `json:"events_attended"`
	Organizations  int     `json:"organizations"`
	UpcomingEvents int     `json:"upcoming_events"`
	Achievements   int     `json:"achievements,omitempty"`
}

type Achievement struct {
	ID          int64     `json:"id"`
	VolunteerID int64     `json:"volunteer_id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	AwardedDate time.Time `json:"awarded_date"`
	Icon        string    `json:"icon,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}
