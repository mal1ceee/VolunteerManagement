# Database Migrations

This directory contains database migration scripts for the Volunteer Management application.

## Structure

- `migrate.go`: Go script for handling database migrations
- `sql/`: Directory containing SQL migration files
  - `001_initial_schema.up.sql`: Initial database schema
  - `001_initial_schema.down.sql`: Script to revert the initial schema
  - `002_seed_data.up.sql`: Basic user data for development
  - `002_seed_data.down.sql`: Script to remove basic user data
  - `003_seed_organizations.up.sql`: Sample organization data
  - `004_seed_volunteers.up.sql`: Sample volunteer profile data
  - `005_seed_events.up.sql`: Sample events data
  - `006_seed_signups.up.sql`: Sample event signup data
  - `007_seed_conversations.up.sql`: Sample conversation and message data

## Usage

### Prerequisites

- Go 1.16+
- Docker and Docker Compose
- PostgreSQL client (for connecting to the database directly)

### Running Migrations

From the project root, you can use the Makefile commands:

```bash
# Start the database
make docker-up

# Apply all migrations
make migrate-up

# Rollback all migrations
make migrate-down

# Create a new migration
make migrate-create
# Enter a name when prompted, e.g., "add_verification_table"
```

You can also run the migration script directly:

```bash
go run migrations/migrate.go -up              # Apply all migrations
go run migrations/migrate.go -down            # Rollback all migrations
go run migrations/migrate.go -step 1          # Apply 1 migration
go run migrations/migrate.go -step -1         # Rollback 1 migration
go run migrations/migrate.go -version         # Show current migration version
go run migrations/migrate.go -create add_xyz  # Create a new migration
```

### Development Workflow

For local development with a fresh database:

```bash
# Start everything and populate with sample data
make db-setup

# Reset the database (rollback and reapply all migrations)
make db-reset

# Connect to the database
make db-connect
```

### Applying Seed Data Directly

For quick development, you can apply seed data SQL files directly to the database using:

```bash
# Apply seed data directly (replace XXX with the file number)
Get-Content backend/migrations/sql/XXX_seed_*.up.sql | docker exec -i backend-postgres-1 psql -U postgres -d volunteer_mgmt
```

## Migration Files

Migration files follow the naming convention: `NNN_description.up.sql` and `NNN_description.down.sql`.

- The `up` migrations apply changes to the database.
- The `down` migrations revert those changes.

Always ensure that each `up` migration has a corresponding `down` migration that properly reverts the changes. 

## Seed Data Structure

Our seed data includes:
- Users: System admin, organization admins, and volunteers
- Organizations: Sample nonprofits with description and contact info
- Volunteers: Profiles with skills and availability
- Events: Community service events created by organizations
- Signups: Volunteer registrations for events
- Conversations: Message threads between users 