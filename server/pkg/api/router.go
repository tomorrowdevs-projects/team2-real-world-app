package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {

	router := gin.Default()

	// enabling CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "https://localhost:3000"} // "*" to allow all
	router.Use(cors.New(config))

	// linking paths to api handlers
	router.POST("/upload", UploadFile)
	router.GET("/products", GetProducts)
	router.GET("/product_metrics", GetOrdersAndRevenue)

	return router
}
