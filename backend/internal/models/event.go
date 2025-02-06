package models

import (
	"time"
)

type EventStatus string

const (
	EventStatusDraft     EventStatus = "draft"
	EventStatusPublished EventStatus = "published"
	EventStatusCancelled EventStatus = "cancelled"
	EventStatusComplete  EventStatus = "complete"
)

type Event struct {
	ID          int64       `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Location    string      `json:"location"`
	Date        time.Time   `json:"date"`
	CreatedBy   int64       `json:"created_by"`
	Capacity    int         `json:"capacity"`
	Status      EventStatus `json:"status"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

type CreateEventInput struct {
	Title       string      `json:"title" binding:"required"`
	Description string      `json:"description" binding:"required"`
	Location    string      `json:"location" binding:"required"`
	Date        time.Time   `json:"date" binding:"required"`
	Capacity    int         `json:"capacity" binding:"required,min=1"`
	Status      EventStatus `json:"status" binding:"required,oneof=draft published cancelled complete"`
}

type UpdateEventInput struct {
	Title       *string      `json:"title,omitempty"`
	Description *string      `json:"description,omitempty"`
	Location    *string      `json:"location,omitempty"`
	Date        *time.Time   `json:"date,omitempty"`
	Capacity    *int         `json:"capacity,omitempty" binding:"omitempty,min=1"`
	Status      *EventStatus `json:"status,omitempty" binding:"omitempty,oneof=draft published cancelled complete"`
}
