package cache

import (
	"fmt"
	"time"
)

const (
	// Cache key prefixes
	EventPrefix     = "event:"
	VolunteerPrefix = "volunteer:"
	SignupPrefix    = "signup:"

	// Default TTLs
	DefaultTTL     = 15 * time.Minute
	LongTTL        = 1 * time.Hour
	VeryLongTTL    = 24 * time.Hour
	ListingTTL     = 5 * time.Minute
	SearchCacheTTL = 5 * time.Minute
)

// Key generators
func EventKey(id int64) string {
	return fmt.Sprintf("%s%d", EventPrefix, id)
}

func VolunteerKey(id int64) string {
	return fmt.Sprintf("%s%d", VolunteerPrefix, id)
}

func SignupKey(id int64) string {
	return fmt.Sprintf("%s%d", SignupPrefix, id)
}

func EventListKey(page, limit int) string {
	return fmt.Sprintf("%slist:%d:%d", EventPrefix, page, limit)
}

func EventSearchKey(query, location string, date time.Time) string {
	dateStr := ""
	if !date.IsZero() {
		dateStr = date.Format("2006-01-02")
	}
	return fmt.Sprintf("%ssearch:%s:%s:%s", EventPrefix, query, location, dateStr)
}

func VolunteerListKey(page, limit int) string {
	return fmt.Sprintf("%slist:%d:%d", VolunteerPrefix, page, limit)
}

func SignupsByEventKey(eventID int64) string {
	return fmt.Sprintf("%sevent:%d", SignupPrefix, eventID)
}

func SignupsByVolunteerKey(volunteerID int64) string {
	return fmt.Sprintf("%svolunteer:%d", SignupPrefix, volunteerID)
}
