package main

// import package from other folder
import (
	"fmt"
	"os"
	//yml "gopkg.in/yaml.v2"
)

func main() {

	// Set Environment Variables
	os.Setenv("SITE_TITLE", "Test Site")
	os.Setenv("DB_HOST", "localhost")
	os.Setenv("DB_PORT", "27017")
	os.Setenv("DB_USERNAME", "admin")
	os.Setenv("DB_PASSWORD", "password")
	os.Setenv("DB_NAME", "testdb")

	// Get the value of an Environment Variable
	host := os.Getenv("SITE_TITLE")
	port := os.Getenv("DB_HOST")
	fmt.Printf("Site Title: %s, Host: %s\n", host, port)

}
