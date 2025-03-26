package models

import (
	"time"
)

type EventStatus string

const (
	EventStatusDraft     EventStatus = "draft"
	EventStatusActive    EventStatus = "active"
	EventStatusCancelled EventStatus = "cancelled"
	EventStatusComplete  EventStatus = "complete"
)

type ImpactMetrics struct {
	TreesPlanted      int     `json:"trees_planted,omitempty"`
	WasteCollected    float64 `json:"waste_collected,omitempty"`
	MealsServed       int     `json:"meals_served,omitempty"`
	PeopleHelped      int     `json:"people_helped,omitempty"`
	AreaCleaned       float64 `json:"area_cleaned,omitempty"`
	FundsRaised       float64 `json:"funds_raised,omitempty"`
	EducationHours    int     `json:"education_hours,omitempty"`
	CommunityProjects int     `json:"community_projects,omitempty"`
}

type Event struct {
	ID                   int64         `json:"id"`
	Title                string        `json:"title"`
	Description          string        `json:"description"`
	ShortDescription     string        `json:"short_description,omitempty"`
	Location             string        `json:"location"`
	Date                 time.Time     `json:"date"`
	StartTime            time.Time     `json:"start_time"`
	EndTime              time.Time     `json:"end_time"`
	OrganizationID       int64         `json:"organization_id"`
	OrganizationName     string        `json:"organization_name,omitempty"`
	Category             string        `json:"category,omitempty"`
	Image                string        `json:"image,omitempty"`
	RequiredSkills       []string      `json:"required_skills,omitempty"`
	VolunteersNeeded     int           `json:"volunteers_needed"`
	VolunteersRegistered int           `json:"volunteers_registered"`
	Status               EventStatus   `json:"status"`
	ImpactMetrics        ImpactMetrics `json:"impact_metrics,omitempty"`
	CreatedAt            time.Time     `json:"created_at"`
	UpdatedAt            time.Time     `json:"updated_at"`
}

type CreateEventInput struct {
	Title            string      `json:"title" binding:"required"`
	Description      string      `json:"description" binding:"required"`
	ShortDescription string      `json:"short_description,omitempty"`
	Location         string      `json:"location" binding:"required"`
	Date             time.Time   `json:"date" binding:"required"`
	StartTime        time.Time   `json:"start_time" binding:"required"`
	EndTime          time.Time   `json:"end_time" binding:"required"`
	Category         string      `json:"category,omitempty"`
	Image            string      `json:"image,omitempty"`
	RequiredSkills   []string    `json:"required_skills,omitempty"`
	VolunteersNeeded int         `json:"volunteers_needed" binding:"required,min=1"`
	Status           EventStatus `json:"status" binding:"required,oneof=draft active cancelled complete"`
}

type UpdateEventInput struct {
	Title            *string        `json:"title,omitempty"`
	Description      *string        `json:"description,omitempty"`
	ShortDescription *string        `json:"short_description,omitempty"`
	Location         *string        `json:"location,omitempty"`
	Date             *time.Time     `json:"date,omitempty"`
	StartTime        *time.Time     `json:"start_time,omitempty"`
	EndTime          *time.Time     `json:"end_time,omitempty"`
	Category         *string        `json:"category,omitempty"`
	Image            *string        `json:"image,omitempty"`
	RequiredSkills   *[]string      `json:"required_skills,omitempty"`
	VolunteersNeeded *int           `json:"volunteers_needed,omitempty" binding:"omitempty,min=1"`
	Status           *EventStatus   `json:"status,omitempty" binding:"omitempty,oneof=draft active cancelled complete"`
	ImpactMetrics    *ImpactMetrics `json:"impact_metrics,omitempty"`
}

type EventRegistration struct {
	ID               int64     `json:"id"`
	EventID          int64     `json:"event_id"`
	VolunteerID      int64     `json:"volunteer_id"`
	Status           string    `json:"status"` // registered, attended, cancelled, no-show
	HoursLogged      float64   `json:"hours_logged,omitempty"`
	Feedback         string    `json:"feedback,omitempty"`
	Rating           int       `json:"rating,omitempty"` // 1-5 stars
	RegistrationDate time.Time `json:"registration_date"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type CreateEventRegistrationInput struct {
	EventID     int64  `json:"event_id" binding:"required"`
	VolunteerID int64  `json:"volunteer_id" binding:"required"`
	Status      string `json:"status" binding:"required,oneof=registered attended cancelled no-show"`
}

type UpdateEventRegistrationInput struct {
	Status      *string  `json:"status,omitempty" binding:"omitempty,oneof=registered attended cancelled no-show"`
	HoursLogged *float64 `json:"hours_logged,omitempty"`
	Feedback    *string  `json:"feedback,omitempty"`
	Rating      *int     `json:"rating,omitempty" binding:"omitempty,min=1,max=5"`
}
