package helpers

import (
	"log"
	"os"

	"github.com/joho/godotenv" // read .env file
)

// use godot package to load/read the .env file and
// return the value of the key
func GetEnv(key string) string {

	// load .env file
	err := godotenv.Load("config/database.env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
