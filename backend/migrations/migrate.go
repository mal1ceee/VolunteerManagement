package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
)

func main() {
	// Parse command line arguments
	upPtr := flag.Bool("up", false, "Apply all migrations")
	downPtr := flag.Bool("down", false, "Rollback all migrations")
	stepPtr := flag.Int("step", 0, "Number of migrations to apply (positive) or rollback (negative)")
	versionPtr := flag.Bool("version", false, "Show current migration version")
	createPtr := flag.String("create", "", "Create a new migration with the specified name")
	forcePtr := flag.Int("force", -1, "Force set version of database (use with caution)")
	flag.Parse()

	// Load environment variables from .env file if it exists
	_ = godotenv.Load()

	// Get database connection string from environment variable or use default
	//dbURL := os.Getenv("DATABASE_URL")
	//if dbURL == "" {
	//	// If DATABASE_URL not set, try to build it from individual components
	//	dbUser := getEnvOrDefault("DB_USER", "postgres")
	//	dbPassword := getEnvOrDefault("DB_PASSWORD", "postgres")
	//	dbHost := getEnvOrDefault("DB_HOST", "localhost")
	//	dbPort := getEnvOrDefault("DB_PORT", "5432")
	//	dbName := getEnvOrDefault("DB_NAME", "volunteer_mgmt")
	//	dbSSL := getEnvOrDefault("DB_SSL", "disable")
	//
	//	dbURL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
	//		dbUser, dbPassword, dbHost, dbPort, dbName, dbSSL)
	//}

	// Hardcoded database URL for debugging
	dbURL := "postgres://postgres:postgres@localhost:5432/volunteer_mgmt?sslmode=disable"
	fmt.Println("Using database URL:", dbURL)

	// Handle create new migration
	if *createPtr != "" {
		if err := createMigration(*createPtr); err != nil {
			log.Fatalf("Failed to create migration: %v", err)
		}
		return
	}

	// Initialize the migrator
	m, err := migrate.New("file://migrations/sql", dbURL)
	if err != nil {
		log.Fatalf("Failed to initialize migrator: %v", err)
	}
	defer m.Close()

	// Show current version
	if *versionPtr {
		version, dirty, err := m.Version()
		if err != nil {
			log.Fatalf("Failed to get version: %v", err)
		}
		fmt.Printf("Current migration version: %d (dirty: %v)\n", version, dirty)
		return
	}

	// Force set version
	if *forcePtr >= 0 {
		if err := m.Force(*forcePtr); err != nil {
			log.Fatalf("Failed to force version: %v", err)
		}
		fmt.Printf("Forced migration version to: %d\n", *forcePtr)
		return
	}

	// Apply migrations
	if *upPtr {
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to apply migrations: %v", err)
		}
		fmt.Println("Successfully applied all migrations")
		return
	}

	// Rollback migrations
	if *downPtr {
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to rollback migrations: %v", err)
		}
		fmt.Println("Successfully rolled back all migrations")
		return
	}

	// Apply or rollback a specific number of migrations
	if *stepPtr != 0 {
		if *stepPtr > 0 {
			if err := m.Steps(*stepPtr); err != nil && err != migrate.ErrNoChange {
				log.Fatalf("Failed to apply %d migrations: %v", *stepPtr, err)
			}
			fmt.Printf("Successfully applied %d migrations\n", *stepPtr)
		} else {
			if err := m.Steps(*stepPtr); err != nil && err != migrate.ErrNoChange {
				log.Fatalf("Failed to rollback %d migrations: %v", -(*stepPtr), err)
			}
			fmt.Printf("Successfully rolled back %d migrations\n", -(*stepPtr))
		}
		return
	}

	// If no flags are specified, show usage
	flag.Usage()
}

func getEnvOrDefault(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func createMigration(name string) error {
	timeStamp := "000"
	version := fmt.Sprintf("%s_%s", timeStamp, name)

	// Ensure migrations/sql directory exists
	migrationsDir := filepath.Join("migrations", "sql")
	if err := os.MkdirAll(migrationsDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create migrations directory: %w", err)
	}

	// Create up migration file
	upFile := filepath.Join(migrationsDir, fmt.Sprintf("%s.up.sql", version))
	if err := os.WriteFile(upFile, []byte("-- Write your UP migration SQL here\n"), 0644); err != nil {
		return fmt.Errorf("failed to create up migration file: %w", err)
	}

	// Create down migration file
	downFile := filepath.Join(migrationsDir, fmt.Sprintf("%s.down.sql", version))
	if err := os.WriteFile(downFile, []byte("-- Write your DOWN migration SQL here\n"), 0644); err != nil {
		return fmt.Errorf("failed to create down migration file: %w", err)
	}

	fmt.Printf("Created migration files:\n%s\n%s\n", upFile, downFile)
	return nil
}
