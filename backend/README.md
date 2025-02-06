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
   docker-compose up -d
   ```

2. **Create the PostgreSQL Database:**
   ```bash
   docker exec -i backend-postgres-1 psql -U postgres -c "CREATE DATABASE volunteer_mgmt;"
   ```

3. **Run Database Migrations (for PowerShell):**
   ```bash
   Get-Content .\backend\internal\repository\postgres\migrations\000001_init_schema.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
   ```

4. **Verify Table Creation:**
   ```bash
   docker exec -it backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "\dt"
   ```

5. **Run the Go Backend:**
   ```bash
   cd backend
   go run cmd/main.go
   ```

6. **Check Running Containers:**
   ```bash
   docker ps
   ```

7. **Recheck Database Tables:**
   ```bash
   docker exec -it backend-postgres-1 psql -U postgres -d volunteer_mgmt -c "\dt"
   ```

8. **Restart PostgreSQL Container (if needed):**
   ```bash
   docker-compose restart
   ```

9. **Drop and Recreate Database:**
   ```bash
   docker exec -i backend-postgres-1 psql -U postgres -c "DROP DATABASE volunteer_mgmt;"
   docker exec -i backend-postgres-1 psql -U postgres -c "CREATE DATABASE volunteer_mgmt;"
   ```

---

## 📂 Project Structure
```
backend/
├── cmd/
│   └── main.go            # Entry point for the Go application
├── internal/
│   └── repository/
│       └── postgres/
│           └── migrations/
│               └── 000001_init_schema.sql  # Initial database schema
├── Dockerfile              # Docker configuration for the backend
└── docker-compose.yml      # Docker Compose configuration
```

---

## 🛠️ Technologies Used
- **Go (Golang)** - Backend API
- **PostgreSQL** - Database
- **Redis** - Caching
- **Docker** & **Docker Compose** - Containerization

---

## ✅ Verifying the Setup
After running the above commands:
- Ensure the API is reachable at the specified port (check `main.go` for details).
- Verify the PostgreSQL database contains the required tables.
- Check the running Docker containers with `docker ps`.

---

## 📋 Troubleshooting
- **Database connection issues?** Restart the PostgreSQL container:
  ```bash
  docker-compose restart
  ```
- **Database not reflecting changes?** Drop and recreate the database:
  ```bash
  docker exec -i backend-postgres-1 psql -U postgres -c "DROP DATABASE volunteer_mgmt;"
  docker exec -i backend-postgres-1 psql -U postgres -c "CREATE DATABASE volunteer_mgmt;"
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
