package handlers

import (
	"log"
	"net/http"
	"volunteer-management/internal/websocket"

	"github.com/gin-gonic/gin"
	gorilla "github.com/gorilla/websocket"
)

var upgrader = &gorilla.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // In production, implement proper origin checking
	},
}

type WebSocketHandler struct {
	manager *websocket.Manager
}

func NewWebSocketHandler(manager *websocket.Manager) *WebSocketHandler {
	return &WebSocketHandler{
		manager: manager,
	}
}

func (h *WebSocketHandler) HandleWebSocket(c *gin.Context) {
	userID := c.GetInt64("userID")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("Failed to upgrade connection: %v", err)
		return
	}

	client := &websocket.Client{
		ID:      c.Request.RemoteAddr,
		UserID:  userID,
		Conn:    conn,
		Send:    make(chan []byte, 256),
		Manager: h.manager,
		Topics:  make(map[string]bool),
	}

	// Use the unexported register channel
	h.manager.RegisterClient(client)

	// Start goroutines for reading and writing
	go client.WritePump()
	go client.ReadPump()
}

func (h *WebSocketHandler) RegisterRoutes(router *gin.Engine, authMiddleware gin.HandlerFunc) {
	ws := router.Group("/ws")
	ws.Use(authMiddleware)
	{
		ws.GET("", h.HandleWebSocket)
	}
}
