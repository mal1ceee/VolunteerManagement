package websocket

import (
	"context"
	"encoding/json"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID      string
	UserID  int64
	Conn    *websocket.Conn
	Send    chan []byte
	Manager *Manager
	Topics  map[string]bool
	mu      sync.RWMutex
}

type Manager struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	topics     map[string]map[*Client]bool
	mu         sync.RWMutex
}

type Message struct {
	Type    string      `json:"type"`
	Topic   string      `json:"topic"`
	Payload interface{} `json:"payload"`
}

func NewManager() *Manager {
	return &Manager{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		topics:     make(map[string]map[*Client]bool),
	}
}

func (m *Manager) Run(ctx context.Context) {
	for {
		select {
		case client := <-m.register:
			m.mu.Lock()
			m.clients[client] = true
			m.mu.Unlock()

		case client := <-m.unregister:
			if _, ok := m.clients[client]; ok {
				m.mu.Lock()
				delete(m.clients, client)
				close(client.Send)
				// Remove client from all topics
				for topic := range client.Topics {
					if m.topics[topic] != nil {
						delete(m.topics[topic], client)
					}
				}
				m.mu.Unlock()
			}

		case message := <-m.broadcast:
			m.mu.RLock()
			for client := range m.clients {
				select {
				case client.Send <- message:
				default:
					close(client.Send)
					delete(m.clients, client)
				}
			}
			m.mu.RUnlock()

		case <-ctx.Done():
			return
		}
	}
}

func (m *Manager) Subscribe(client *Client, topic string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	client.mu.Lock()
	client.Topics[topic] = true
	client.mu.Unlock()

	if m.topics[topic] == nil {
		m.topics[topic] = make(map[*Client]bool)
	}
	m.topics[topic][client] = true
}

func (m *Manager) Unsubscribe(client *Client, topic string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	client.mu.Lock()
	delete(client.Topics, topic)
	client.mu.Unlock()

	if m.topics[topic] != nil {
		delete(m.topics[topic], client)
	}
}

func (m *Manager) PublishToTopic(topic string, message interface{}) error {
	msg := Message{
		Type:    "update",
		Topic:   topic,
		Payload: message,
	}

	data, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	m.mu.RLock()
	defer m.mu.RUnlock()

	if clients, ok := m.topics[topic]; ok {
		for client := range clients {
			select {
			case client.Send <- data:
			default:
				close(client.Send)
				delete(m.topics[topic], client)
			}
		}
	}

	return nil
}

func (m *Manager) RegisterClient(client *Client) {
	m.register <- client
}
