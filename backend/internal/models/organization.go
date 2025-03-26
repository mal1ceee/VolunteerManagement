package models

import (
	"time"
)

type OrganizationStatus string

const (
	OrgStatusActive    OrganizationStatus = "active"
	OrgStatusPending   OrganizationStatus = "pending"
	OrgStatusSuspended OrganizationStatus = "suspended"
)

type SocialMedia struct {
	Facebook  string `json:"facebook,omitempty"`
	Twitter   string `json:"twitter,omitempty"`
	Instagram string `json:"instagram,omitempty"`
	LinkedIn  string `json:"linkedin,omitempty"`
}

type Address struct {
	Street  string `json:"street,omitempty"`
	City    string `json:"city,omitempty"`
	State   string `json:"state,omitempty"`
	ZipCode string `json:"zip_code,omitempty"`
	Country string `json:"country,omitempty"`
}

type Organization struct {
	ID              int64              `json:"id"`
	UserID          int64              `json:"user_id"`
	Name            string             `json:"name"`
	Logo            string             `json:"logo,omitempty"`
	CoverImage      string             `json:"cover_image,omitempty"`
	ShortDesc       string             `json:"short_description,omitempty"`
	LongDesc        string             `json:"long_description,omitempty"`
	Email           string             `json:"email"`
	Phone           string             `json:"phone,omitempty"`
	Website         string             `json:"website,omitempty"`
	SocialMedia     SocialMedia        `json:"social_media,omitempty"`
	Address         Address            `json:"address,omitempty"`
	Category        string             `json:"category,omitempty"`
	Subcategories   []string           `json:"subcategories,omitempty"`
	FoundingYear    int                `json:"founding_year,omitempty"`
	TeamSize        string             `json:"team_size,omitempty"`
	IsVerified      bool               `json:"is_verified"`
	Status          OrganizationStatus `json:"status"`
	TotalVolunteers int                `json:"total_volunteers,omitempty"`
	TotalEvents     int                `json:"total_events,omitempty"`
	CreatedAt       time.Time          `json:"created_at"`
	UpdatedAt       time.Time          `json:"updated_at"`
}

type CreateOrganizationInput struct {
	UserID        int64       `json:"user_id" binding:"required"`
	Name          string      `json:"name" binding:"required"`
	Logo          string      `json:"logo,omitempty"`
	ShortDesc     string      `json:"short_description,omitempty"`
	Email         string      `json:"email" binding:"required,email"`
	Phone         string      `json:"phone,omitempty"`
	Website       string      `json:"website,omitempty"`
	SocialMedia   SocialMedia `json:"social_media,omitempty"`
	Address       Address     `json:"address,omitempty"`
	Category      string      `json:"category,omitempty"`
	Subcategories []string    `json:"subcategories,omitempty"`
	FoundingYear  int         `json:"founding_year,omitempty"`
	TeamSize      string      `json:"team_size,omitempty"`
}

type UpdateOrganizationInput struct {
	Name          *string             `json:"name,omitempty"`
	Logo          *string             `json:"logo,omitempty"`
	CoverImage    *string             `json:"cover_image,omitempty"`
	ShortDesc     *string             `json:"short_description,omitempty"`
	LongDesc      *string             `json:"long_description,omitempty"`
	Email         *string             `json:"email,omitempty" binding:"omitempty,email"`
	Phone         *string             `json:"phone,omitempty"`
	Website       *string             `json:"website,omitempty"`
	SocialMedia   *SocialMedia        `json:"social_media,omitempty"`
	Address       *Address            `json:"address,omitempty"`
	Category      *string             `json:"category,omitempty"`
	Subcategories *[]string           `json:"subcategories,omitempty"`
	FoundingYear  *int                `json:"founding_year,omitempty"`
	TeamSize      *string             `json:"team_size,omitempty"`
	IsVerified    *bool               `json:"is_verified,omitempty"`
	Status        *OrganizationStatus `json:"status,omitempty"`
}

type OrganizationStatsResponse struct {
	TotalVolunteers  int `json:"total_volunteers"`
	ActiveVolunteers int `json:"active_volunteers"`
	TotalEvents      int `json:"total_events"`
	ActiveEvents     int `json:"active_events"`
	PastEvents       int `json:"past_events"`
	TotalHours       int `json:"total_hours"`
	ImpactScore      int `json:"impact_score,omitempty"`
}
