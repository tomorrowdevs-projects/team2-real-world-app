package main

import (
	"team2-real-world-app/server/pkg/api"
)

func main() {

	// launching server
	router := api.Router()
	err := router.Run("localhost:8080")

	if err != nil {
		return
	}
}

///////////////////////////////////////////////////////////////////////////////////////////
