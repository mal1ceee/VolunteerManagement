# Volunteer Management System

A modern web platform connecting volunteers with organizations, streamlining volunteer coordination and management through an intuitive interface and powerful features.

## 🌟 Features

- **User Management**
  - Role-based authentication (Admin, Volunteer)
  - Secure JWT-based authentication
  - User profiles and preferences

- **Event Management**
  - Create and manage volunteer events
  - Event registration and attendance tracking
  - Search and filter events by various criteria

- **Organization Management**
  - Organization profiles and verification
  - Event hosting capabilities
  - Analytics dashboard

- **Real-time Communication**
  - WebSocket-based messaging system
  - Conversation management
  - Notifications for important updates

- **Analytics & Reporting**
  - Organization performance metrics
  - Volunteer participation statistics
  - Event success tracking
  - Demographics analysis

## 🛠 Technology Stack

- **Backend**
  - Go (Gin Framework)
  - PostgreSQL
  - Redis
  - WebSocket

- **Infrastructure**
  - Docker
  - Docker Compose

## 📁 Project Structure

```
.
├── backend/                 # Go backend service
│   ├── cmd/                # Application entrypoints
│   ├── internal/           # Private application code
│   ├── pkg/                # Public library code
│   ├── migrations/         # Database migrations
│   └── docker-compose.yml  # Docker compose configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Go 1.19 or higher
- Docker and Docker Compose
- PostgreSQL 14 or higher
- Redis

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/volunteer-management.git
cd volunteer-management
```

2. Start the database and Redis:
```bash
cd backend
docker-compose up -d
```

3. Run database migrations:
```bash
cd backend
go run cmd/migrate/main.go
```

4. Start the backend server:
```bash
cd backend
go run cmd/server/main.go
```

The server will start on `http://localhost:8080`

## 🔑 Environment Variables

Backend environment variables (`.env`):
```
# Server
SERVER_PORT=8080
SERVER_READ_TIMEOUT=10s
SERVER_WRITE_TIMEOUT=10s

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=volunteer_mgmt
DB_SSLMODE=disable

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRY=24h
JWT_REFRESH_EXPIRY=168h
```

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # Register new user
POST /api/auth/login        # Login user
POST /api/auth/refresh      # Refresh access token
POST /api/auth/logout       # Logout user
```

### Event Endpoints
```
GET    /api/events         # List all events
POST   /api/events         # Create new event
GET    /api/events/:id     # Get event details
PUT    /api/events/:id     # Update event
DELETE /api/events/:id     # Delete event
```

### Organization Endpoints
```
GET    /api/organizations          # List organizations
GET    /api/organizations/:id      # Get organization details
PUT    /api/organizations/:id      # Update organization
GET    /api/organizations/pending  # List pending organizations
```

### Volunteer Endpoints
```
GET    /api/volunteers     # List volunteers
GET    /api/volunteers/:id # Get volunteer details
PUT    /api/volunteers/:id # Update volunteer profile
```

## 🧪 Testing

Run the test suite:
```bash
cd backend
go test ./...
```

## 🔒 Security

- Password hashing using SCRAM-SHA-256
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS protection

## 📊 Database Schema

The system uses PostgreSQL with the following main tables:
- users
- organizations
- events
- signups
- messages
- conversations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Gin Framework
- PostgreSQL
- Redis
- Docker 