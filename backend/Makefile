.PHONY: build run docker-up docker-down migrate-up migrate-down migrate-create

build:
	go build -o bin/server cmd/server/main.go

run:
	go run cmd/server/main.go

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

migrate-up:
	go run migrations/migrate.go -up

migrate-down:
	go run migrations/migrate.go -down

migrate-create:
	@read -p "Enter migration name: " name; \
	go run migrations/migrate.go -create $$name

# Helper target to setup database with sample data
db-setup: docker-up migrate-up
	@echo "Database setup complete with sample data!"

# Helper target to reset database
db-reset: migrate-down migrate-up
	@echo "Database reset complete!"

# Helper target to connect to the database
db-connect:
	docker exec -it volunteer-management-postgres-1 psql -U postgres -d volunteer_mgmt 