package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/query"
)

func GetProducts(c *gin.Context) {

	// Return the products JSON
	products, err := query.AllProducts()
	if err != nil {
		return
		// return err
	}

	c.IndentedJSON(http.StatusOK, products)
}
