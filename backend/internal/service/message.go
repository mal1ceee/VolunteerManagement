package service

import (
	"context"
	"errors"
	"volunteer-management/internal/models"
	"volunteer-management/internal/repository"
)

var (
	ErrMessageNotFound      = errors.New("message not found")
	ErrConversationNotFound = errors.New("conversation not found")
)

type MessageService struct {
	messageRepo      repository.MessageRepository
	conversationRepo repository.ConversationRepository
	userRepo         repository.UserRepository
}

func NewMessageService(
	messageRepo repository.MessageRepository,
	conversationRepo repository.ConversationRepository,
	userRepo repository.UserRepository) *MessageService {
	return &MessageService{
		messageRepo:      messageRepo,
		conversationRepo: conversationRepo,
		userRepo:         userRepo,
	}
}

func (s *MessageService) SendMessage(ctx context.Context, senderID, receiverID int64, content string) (*models.Message, error) {
	// Verify both users exist
	sender, err := s.userRepo.GetByID(ctx, senderID)
	if err != nil {
		return nil, err
	}
	if sender == nil {
		return nil, errors.New("sender not found")
	}

	receiver, err := s.userRepo.GetByID(ctx, receiverID)
	if err != nil {
		return nil, err
	}
	if receiver == nil {
		return nil, errors.New("receiver not found")
	}

	// Get or create conversation
	conversation, err := s.conversationRepo.GetByUsers(ctx, senderID, receiverID)
	if err != nil {
		return nil, err
	}

	if conversation == nil {
		conversation, err = s.conversationRepo.Create(ctx, senderID, receiverID)
		if err != nil {
			return nil, err
		}
	}

	// Create message
	input := &models.CreateMessageInput{
		ConversationID: conversation.ID,
		SenderID:       senderID,
		RecipientID:    receiverID,
		Text:           content,
	}

	message, err := s.messageRepo.Create(ctx, input)
	if err != nil {
		return nil, err
	}

	// Update conversation with last message
	if err := s.conversationRepo.UpdateLastMessage(ctx, conversation.ID, content, message.Timestamp); err != nil {
		// Log error but don't fail the operation
		// logger.Error("Failed to update conversation last message", err)
	}

	return message, nil
}

func (s *MessageService) GetMessage(ctx context.Context, messageID int64) (*models.Message, error) {
	message, err := s.messageRepo.GetByID(ctx, messageID)
	if err != nil {
		return nil, err
	}
	if message == nil {
		return nil, ErrMessageNotFound
	}
	return message, nil
}

func (s *MessageService) GetConversation(ctx context.Context, conversationID, userID int64) (*models.Conversation, error) {
	conversation, err := s.conversationRepo.GetByID(ctx, conversationID)
	if err != nil {
		return nil, err
	}
	if conversation == nil {
		return nil, ErrConversationNotFound
	}

	// Verify user is part of the conversation
	if conversation.UserID1 != userID && conversation.UserID2 != userID {
		return nil, ErrUnauthorized
	}

	return conversation, nil
}

func (s *MessageService) ListConversations(ctx context.Context, userID int64, offset, limit int) ([]*models.ConversationResponse, error) {
	return s.conversationRepo.ListByUser(ctx, userID, offset, limit)
}

func (s *MessageService) ListMessages(ctx context.Context, conversationID, userID int64, offset, limit int) ([]*models.Message, error) {
	// Verify user has access to this conversation
	_, err := s.GetConversation(ctx, conversationID, userID)
	if err != nil {
		return nil, err
	}

	return s.messageRepo.ListByConversation(ctx, conversationID, offset, limit)
}

func (s *MessageService) MarkAsRead(ctx context.Context, messageID, userID int64) error {
	message, err := s.GetMessage(ctx, messageID)
	if err != nil {
		return err
	}

	// Verify user has access to this message
	_, err = s.GetConversation(ctx, message.ConversationID, userID)
	if err != nil {
		return err
	}

	// Only mark as read if user is the recipient
	if message.SenderID == userID {
		return errors.New("cannot mark your own message as read")
	}

	return s.messageRepo.MarkAsRead(ctx, messageID)
}

func (s *MessageService) MarkAllAsRead(ctx context.Context, conversationID, userID int64) error {
	// Verify user has access to this conversation
	_, err := s.GetConversation(ctx, conversationID, userID)
	if err != nil {
		return err
	}

	return s.messageRepo.MarkAllAsRead(ctx, conversationID, userID)
}

func (s *MessageService) CreateConversation(ctx context.Context, user1ID, user2ID int64) (*models.Conversation, error) {
	// Verify both users exist
	user1, err := s.userRepo.GetByID(ctx, user1ID)
	if err != nil {
		return nil, err
	}
	if user1 == nil {
		return nil, errors.New("user 1 not found")
	}

	user2, err := s.userRepo.GetByID(ctx, user2ID)
	if err != nil {
		return nil, err
	}
	if user2 == nil {
		return nil, errors.New("user 2 not found")
	}

	return s.conversationRepo.Create(ctx, user1ID, user2ID)
}
