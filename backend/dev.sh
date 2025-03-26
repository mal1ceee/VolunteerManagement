#!/bin/bash

# This script sets up the development environment for the backend

# Ensure migrations directory exists
mkdir -p migrations/sql

# Start the database container
echo "Starting database container..."
docker-compose up -d postgres

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Apply database migrations
echo "Applying database migrations..."
go run migrations/migrate.go -up

# Print success message
echo "Development environment is ready!"
echo "Run 'go run cmd/server/main.go' to start the server"
echo "Run 'make db-connect' to connect to the database" 