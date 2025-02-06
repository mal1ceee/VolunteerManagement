package models

import (
	"time"
)

type Organization struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	ContactInfo string    `json:"contact_info"`
	AdminID     int64     `json:"admin_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateOrganizationInput struct {
	Name        string `json:"name" binding:"required"`
	ContactInfo string `json:"contact_info" binding:"required"`
	AdminID     int64  `json:"admin_id" binding:"required"`
}

type UpdateOrganizationInput struct {
	Name        *string `json:"name,omitempty"`
	ContactInfo *string `json:"contact_info,omitempty"`
	AdminID     *int64  `json:"admin_id,omitempty"`
}
