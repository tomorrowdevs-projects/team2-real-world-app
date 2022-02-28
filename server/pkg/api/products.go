package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/query"
)

func GetProducts(c *gin.Context) {

	// Return the products JSON
	products, err := query.AllProducts()
	if err != nil {
		fmt.Println(err)
	}

	//products, err := helpers.StructToJSON(product)

	// NOTE: temporary stub of products response
	//var products = []response.Product{
	//	{ID: 1, Name: "Remote Tuner"},
	//	{ID: 2, Name: "Direct Case"},
	//	{ID: 3, Name: "Audible Bridge"},
	//}
	c.IndentedJSON(http.StatusOK, products)
}
