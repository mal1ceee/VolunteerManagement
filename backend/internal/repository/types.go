package repository

import (
	"context"
	"time"
	"volunteer-management/internal/models"
)

type SearchParams struct {
	Date     time.Time
	Location string
	Skills   []string
	Offset   int
	Limit    int
}

type EventRepository interface {
	Create(ctx context.Context, input *models.CreateEventInput, createdBy int64) (*models.Event, error)
	GetByID(ctx context.Context, id int64) (*models.Event, error)
	Update(ctx context.Context, id int64, input *models.UpdateEventInput) (*models.Event, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, offset, limit int) ([]*models.Event, error)
	Search(ctx context.Context, params SearchParams) ([]*models.Event, error)
}
