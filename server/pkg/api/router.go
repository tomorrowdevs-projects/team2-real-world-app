package api

import "github.com/gin-gonic/gin"

func Router() {
	router := gin.Default()
	router.POST("/upload", UploadFile)
	router.Run("localhost:8080")
}
