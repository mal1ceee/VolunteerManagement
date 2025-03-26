package models

import (
	"time"
)

type Message struct {
	ID             int64     `json:"id"`
	SenderID       int64     `json:"sender_id"`
	RecipientID    int64     `json:"recipient_id"`
	ConversationID int64     `json:"conversation_id"`
	Text           string    `json:"text"`
	ReadStatus     bool      `json:"read_status"`
	Timestamp      time.Time `json:"timestamp"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type Conversation struct {
	ID              int64     `json:"id"`
	UserID1         int64     `json:"user_id_1"`
	UserID2         int64     `json:"user_id_2"`
	LastMessageText string    `json:"last_message_text,omitempty"`
	LastMessageTime time.Time `json:"last_message_time,omitempty"`
	UnreadCount     int       `json:"unread_count"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type CreateMessageInput struct {
	SenderID       int64  `json:"sender_id" binding:"required"`
	RecipientID    int64  `json:"recipient_id" binding:"required"`
	ConversationID int64  `json:"conversation_id,omitempty"`
	Text           string `json:"text" binding:"required"`
}

type UpdateMessageInput struct {
	ReadStatus *bool `json:"read_status,omitempty"`
}

type ConversationResponse struct {
	ID              int64     `json:"id"`
	ContactID       int64     `json:"contact_id"`
	ContactName     string    `json:"contact_name"`
	ContactAvatar   string    `json:"contact_avatar,omitempty"`
	ContactType     string    `json:"contact_type"` // volunteer, organization, admin
	LastMessage     string    `json:"last_message"`
	LastMessageTime time.Time `json:"last_message_time"`
	UnreadCount     int       `json:"unread_count"`
}

type MessageResponse struct {
	ID             int64     `json:"id"`
	SenderID       int64     `json:"sender_id"`
	RecipientID    int64     `json:"recipient_id"`
	ConversationID int64     `json:"conversation_id"`
	Text           string    `json:"text"`
	ReadStatus     bool      `json:"read_status"`
	Timestamp      time.Time `json:"timestamp"`
	Sender         string    `json:"sender"` // "user" or "other"
}
