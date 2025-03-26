package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type MessageRepository struct {
	db *gorm.DB
}

func NewMessageRepository(db *gorm.DB) *MessageRepository {
	return &MessageRepository{db: db}
}

func (r *MessageRepository) Create(ctx context.Context, input *models.CreateMessageInput) (*models.Message, error) {
	message := &models.Message{
		ConversationID: input.ConversationID,
		SenderID:       input.SenderID,
		RecipientID:    input.RecipientID,
		Text:           input.Text,
		ReadStatus:     false,
		Timestamp:      time.Now(),
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	result := r.db.WithContext(ctx).Create(message)
	if result.Error != nil {
		return nil, result.Error
	}

	return message, nil
}

func (r *MessageRepository) GetByID(ctx context.Context, id int64) (*models.Message, error) {
	var message models.Message
	result := r.db.WithContext(ctx).First(&message, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &message, nil
}

func (r *MessageRepository) Update(ctx context.Context, id int64, input *models.UpdateMessageInput) (*models.Message, error) {
	message, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if message == nil {
		return nil, nil
	}

	updates := make(map[string]interface{})
	if input.ReadStatus != nil {
		updates["read_status"] = *input.ReadStatus
	}
	updates["updated_at"] = time.Now()

	result := r.db.WithContext(ctx).Model(message).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	return message, nil
}

func (r *MessageRepository) ListByConversation(ctx context.Context, conversationID int64, offset, limit int) ([]*models.Message, error) {
	var messages []*models.Message
	result := r.db.WithContext(ctx).
		Where("conversation_id = ?", conversationID).
		Order("timestamp ASC").
		Offset(offset).
		Limit(limit).
		Find(&messages)

	if result.Error != nil {
		return nil, result.Error
	}

	return messages, nil
}

func (r *MessageRepository) MarkAsRead(ctx context.Context, messageID int64) error {
	result := r.db.WithContext(ctx).Model(&models.Message{}).
		Where("id = ?", messageID).
		Update("read_status", true)

	return result.Error
}

func (r *MessageRepository) MarkAllAsRead(ctx context.Context, conversationID, userID int64) error {
	// Mark all messages as read that are in the conversation and NOT sent by the user
	result := r.db.WithContext(ctx).Model(&models.Message{}).
		Where("conversation_id = ? AND sender_id != ?", conversationID, userID).
		Update("read_status", true)

	return result.Error
}
