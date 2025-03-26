package models

import (
	"time"
)

// Analytics periods
type AnalyticsPeriod string

const (
	AnalyticsPeriod30Days  AnalyticsPeriod = "30days"
	AnalyticsPeriod3Months AnalyticsPeriod = "3months"
	AnalyticsPeriod6Months AnalyticsPeriod = "6months"
	AnalyticsPeriodYear    AnalyticsPeriod = "year"
	AnalyticsPeriodAll     AnalyticsPeriod = "all"
)

// Activity types
type ActivityType string

const (
	ActivityUserJoined          ActivityType = "user_joined"
	ActivityOrgJoined           ActivityType = "organization_joined"
	ActivityOrgVerified         ActivityType = "organization_verified"
	ActivityEventCreated        ActivityType = "event_created"
	ActivityEventCompleted      ActivityType = "event_completed"
	ActivityVolunteerRegistered ActivityType = "volunteer_registered"
)

// Analytics response structures
type AdminDashboardStats struct {
	TotalVolunteers      int64   `json:"total_volunteers"`
	VolunteersGrowth     float64 `json:"volunteers_growth"`
	TotalOrganizations   int64   `json:"total_organizations"`
	OrganizationsGrowth  float64 `json:"organizations_growth"`
	ActiveEvents         int64   `json:"active_events"`
	TotalEvents          int64   `json:"total_events"`
	TotalHoursLogged     int64   `json:"total_hours_logged"`
	TotalHours           int64   `json:"total_hours"`           // Used internally for the total hours query
	ActiveUsers          int64   `json:"active_users"`          // Count of users active in the last 30 days
	NewUsers             int64   `json:"new_users"`             // Count of new users in the last 30 days
	PendingOrganizations int64   `json:"pending_organizations"` // Count of organizations pending approval
	UpcomingEvents       int64   `json:"upcoming_events"`       // Count of upcoming events
}

type VolunteerDemographics struct {
	AgeGroups []struct {
		Group      string `json:"group"`
		Percentage int    `json:"percentage"`
	} `json:"age_groups"`
	EngagementLevels []struct {
		Level string `json:"level"`
		Count int    `json:"count"`
	} `json:"engagement_levels"`
	LocationDistribution map[string]int `json:"location_distribution"`
	SkillsDistribution   map[string]int `json:"skills_distribution"`
}

type EventAttendance struct {
	Name       string `json:"name"`
	Attended   int    `json:"attended"`
	Registered int    `json:"registered"`
}

type TopOrganization struct {
	ID         int64  `json:"id"`
	Name       string `json:"name"`
	Logo       string `json:"logo,omitempty"`
	Hours      int    `json:"hours"`
	Events     int    `json:"events"`
	Volunteers int    `json:"volunteers"`
}

type UpcomingEvent struct {
	ID           int64  `json:"id"`
	Title        string `json:"title"`
	Date         string `json:"date"`
	Organization string `json:"organization"`
	Location     string `json:"location"`
	Volunteers   struct {
		Registered int `json:"registered"`
		Needed     int `json:"needed"`
	} `json:"volunteers"`
}

type RecentActivity struct {
	ID           int64        `json:"id"`
	Type         ActivityType `json:"type"`
	Name         string       `json:"name"`
	Organization string       `json:"organization,omitempty"`
	Timestamp    time.Time    `json:"timestamp"`
	Impact       *struct {
		Volunteers int    `json:"volunteers,omitempty"`
		Hours      int    `json:"hours,omitempty"`
		Waste      string `json:"waste,omitempty"`
	} `json:"impact,omitempty"`
}

type PendingOrganization struct {
	ID       int64     `json:"id"`
	Name     string    `json:"name"`
	Logo     string    `json:"logo,omitempty"`
	Location string    `json:"location"`
	JoinDate time.Time `json:"join_date"`
}
