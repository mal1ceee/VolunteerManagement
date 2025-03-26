# 📦 Non-Profit Volunteer Management Web Application - Backend

This is the backend for the Non-Profit Volunteer Management Web Application, built with **Go**, using **PostgreSQL** for the database, **Redis** for caching, and containerized with **Docker**.

---

## 🚀 Getting Started

### **Prerequisites:**
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Go (Golang)](https://golang.org/)

### **Step-by-Step Instructions:**

1. **Start the Containers:**
   ```bash
   make docker-up
   # or 
   docker-compose up -d
   ```

2. **Set up the Database with Migrations:**
   ```bash
   # Start the database containers
   docker-compose up -d postgres
   
   # Wait a few seconds for the database to be ready
   Start-Sleep -Seconds 5
   
   # Set environment variables for migration
   $env:DB_USER="postgres"
   $env:DB_PASSWORD="postgres"
   $env:DB_HOST="localhost"
   $env:DB_PORT="5432"
   $env:DB_NAME="volunteer_mgmt"
   $env:DB_SSL="disable"
   
   # Run the migrations
   go run migrations/migrate.go -up
   ```

3. **Seed the Database with Sample Data:**
   ```bash
   # Apply seed data directly using SQL files
   Get-Content backend/migrations/sql/002_seed_data_simple.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   Get-Content backend/migrations/sql/003_seed_organizations.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   Get-Content backend/migrations/sql/004_seed_volunteers.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   Get-Content backend/migrations/sql/005_seed_events.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   Get-Content backend/migrations/sql/006_seed_signups.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   Get-Content backend/migrations/sql/007_seed_conversations.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   ```

4. **Run the Go Backend:**
   ```bash
   make run
   # or
   go run cmd/server/main.go
   ```

5. **Check Running Containers:**
   ```bash
   docker ps
   ```

6. **Connect to the Database:**
   ```bash
   # Using the correct container name
   docker exec -it backend-postgres-1 psql -U postgres -d volunteer_mgmt
   
   # For non-interactive queries
   docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "SELECT * FROM users LIMIT 5;"
   ```

7. **Other Useful Commands:**
   ```bash
   # Reset the database (rollback and reapply all migrations)
   make db-reset

   # Stop all containers
   make docker-down
   ```

---

## 🗄️ Database Migrations

The application uses [golang-migrate](https://github.com/golang-migrate/migrate) for database migrations.

### **Managing Migrations:**

1. **Create a New Migration:**
   ```bash
   make migrate-create
   # You'll be prompted to enter a name, e.g., "add_user_preferences"
   ```

2. **Apply Migrations:**
   ```bash
   make migrate-up
   ```

3. **Rollback Migrations:**
   ```bash
   make migrate-down
   ```

See the [migrations README](./migrations/README.md) for more details.

---

## 🌱 Database Seeding

The application includes SQL files for seeding the database with sample data:

1. **Users**: Admin users and volunteer users
2. **Organizations**: Sample nonprofit organizations
3. **Volunteers**: Profiles with skills and availability
4. **Events**: Community service events
5. **Signups**: Volunteer registrations for events
6. **Conversations**: Message threads between users

To apply all seed data at once:

```bash
# Apply all seed data files sequentially
for ($i=2; $i -le 7; $i++) {
  Get-Content backend/migrations/sql/00${i}_seed_*.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
}
```

---

## 📂 Project Structure
```
backend/
├── cmd/
│   └── server/
│       └── main.go        # Entry point for the Go application
├── internal/
│   ├── config/            # Application configuration
│   ├── handlers/          # HTTP request handlers
│   ├── middleware/        # HTTP middleware
│   ├── models/            # Data models
│   ├── repository/        # Data access layer
│   ├── service/           # Business logic
│   └── websocket/         # WebSocket handling
├── migrations/
│   ├── sql/
│   │   ├── 001_initial_schema.up.sql     # Database schema
│   │   ├── 001_initial_schema.down.sql   # Schema rollback
│   │   ├── 002_seed_data.up.sql          # Basic user data
│   │   ├── 002_seed_data.down.sql        # Remove user data
│   │   ├── 003_seed_organizations.up.sql # Organization data
│   │   ├── 004_seed_volunteers.up.sql    # Volunteer profile data
│   │   ├── 005_seed_events.up.sql        # Events data
│   │   ├── 006_seed_signups.up.sql       # Event signup data
│   │   └── 007_seed_conversations.up.sql # Conversations & messages data
│   └── migrate.go         # Migration runner
├── pkg/                   # Shared packages
│   └── database/          # Database utilities
├── Dockerfile             # Docker configuration for the backend
├── docker-compose.yml     # Docker Compose configuration
├── Makefile               # Helpful commands
└── README.md              # This file
```

---

## 🛠️ Technologies Used
- **Go (Golang)** - Backend API
- **PostgreSQL** - Database
- **Redis** - Caching
- **Docker** & **Docker Compose** - Containerization
- **golang-migrate** - Database migrations

---

## ✅ Verifying the Setup
After running the above commands:
- Ensure the API is reachable at the specified port (check `main.go` for details).
- Verify the PostgreSQL database contains the required tables with `docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "\dt"`.
- Check the running Docker containers with `docker ps`.
- Verify seed data with sample queries:
  ```sql
  # Run sample queries (replace with actual container name)
  docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "SELECT * FROM users LIMIT 5;"
  docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "SELECT * FROM organizations LIMIT 2;"
  docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "SELECT * FROM events LIMIT 3;"
  ```

---

## 📋 Troubleshooting
- **Database container name issue?** Check the actual container name with:
  ```bash
  docker ps | grep postgres
  ```
  Then use the correct name for database commands.

- **Database connection issues?** Restart the PostgreSQL container:
  ```bash
  docker-compose restart postgres
  ```

- **Database not reflecting changes?** Reset the database:
  ```bash
  make db-reset
  ```

- **Migration errors?** Force the migration version:
  ```bash
  go run migrations/migrate.go -force <version>
  ```

- **Seed data issues?** Apply seed files individually to identify the problem:
  ```bash
  Get-Content backend/migrations/sql/00X_seed_*.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
  ```

---

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

## 📧 Contact
For any queries, feel free to reach out!
