package postgres

import (
	"context"
	"time"
	"volunteer-management/internal/models"

	"gorm.io/gorm"
)

type ConversationRepository struct {
	db *gorm.DB
}

func NewConversationRepository(db *gorm.DB) *ConversationRepository {
	return &ConversationRepository{db: db}
}

func (r *ConversationRepository) Create(ctx context.Context, user1ID, user2ID int64) (*models.Conversation, error) {
	// Check if a conversation already exists between these users
	existing, err := r.GetByUsers(ctx, user1ID, user2ID)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return existing, nil
	}

	conversation := &models.Conversation{
		UserID1:         user1ID,
		UserID2:         user2ID,
		LastMessageTime: time.Now(),
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}

	result := r.db.WithContext(ctx).Create(conversation)
	if result.Error != nil {
		return nil, result.Error
	}

	return conversation, nil
}

func (r *ConversationRepository) GetByID(ctx context.Context, id int64) (*models.Conversation, error) {
	var conversation models.Conversation
	result := r.db.WithContext(ctx).First(&conversation, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &conversation, nil
}

func (r *ConversationRepository) GetByUsers(ctx context.Context, user1ID, user2ID int64) (*models.Conversation, error) {
	var conversation models.Conversation
	result := r.db.WithContext(ctx).
		Where("(user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)",
			user1ID, user2ID, user2ID, user1ID).
		First(&conversation)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &conversation, nil
}

func (r *ConversationRepository) ListByUser(ctx context.Context, userID int64, offset, limit int) ([]*models.ConversationResponse, error) {
	// This query joins conversations with users and includes the last message
	query := `
		WITH last_messages AS (
			SELECT DISTINCT ON (conversation_id) 
				conversation_id, 
				content AS last_message, 
				sent_at AS last_message_time
			FROM messages
			ORDER BY conversation_id, sent_at DESC
		)
		SELECT 
			c.id,
			CASE 
				WHEN c.user_id_1 = ? THEN c.user_id_2
				ELSE c.user_id_1
			END AS other_user_id,
			u.name AS other_user_name,
			u.avatar AS other_user_avatar,
			lm.last_message,
			lm.last_message_time,
			(
				SELECT COUNT(*) FROM messages 
				WHERE conversation_id = c.id AND sender_id != ? AND is_read = FALSE
			) AS unread_count
		FROM conversations c
		JOIN users u ON (
			CASE 
				WHEN c.user_id_1 = ? THEN c.user_id_2
				ELSE c.user_id_1
			END = u.id
		)
		LEFT JOIN last_messages lm ON c.id = lm.conversation_id
		WHERE c.user_id_1 = ? OR c.user_id_2 = ?
		ORDER BY lm.last_message_time DESC NULLS LAST
		LIMIT ? OFFSET ?
	`

	var responses []*models.ConversationResponse
	result := r.db.WithContext(ctx).Raw(
		query,
		userID,         // For selecting other_user_id
		userID,         // For unread count
		userID,         // For joining with users
		userID, userID, // Where clause
		limit, offset,
	).Scan(&responses)

	if result.Error != nil {
		return nil, result.Error
	}

	return responses, nil
}

func (r *ConversationRepository) UpdateLastMessage(ctx context.Context, id int64, text string, messageTime time.Time) error {
	currentTime := time.Now()
	result := r.db.WithContext(ctx).Model(&models.Conversation{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"last_message_text": text,
			"last_message_time": messageTime,
			"updated_at":        currentTime,
		})

	return result.Error
}

func (r *ConversationRepository) GetUnreadCount(ctx context.Context, conversationID, userID int64) (int, error) {
	var count int64
	result := r.db.WithContext(ctx).Model(&models.Message{}).
		Where("conversation_id = ? AND sender_id != ? AND is_read = FALSE",
			conversationID, userID).
		Count(&count)

	if result.Error != nil {
		return 0, result.Error
	}

	return int(count), nil
}
