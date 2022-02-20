package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/model/response"
)

func GetProducts(c *gin.Context) {
	// TODO add link with database query function to retrieve products

	// NOTE: temporary stub of products response
	var products = []response.Product{
		{ID: 1, Name: "Remote Tuner"},
		{ID: 2, Name: "Direct Case"},
		{ID: 3, Name: "Audible Bridge"},
	}
	c.IndentedJSON(http.StatusOK, products)
}
