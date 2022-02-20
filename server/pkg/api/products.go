package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"team2-real-world-app/server/pkg/model"
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

func GetOrdersAndRevenue(c *gin.Context) {
	product, isProductQueried := c.GetQuery("product")
	// consider all products if no product is queried
	if !isProductQueried {
		product = "*"
	}

	startDate, isStartDateQueried := c.GetQuery("startDate")
	endDate, isEndDateQueried := c.GetQuery("endDate")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.Error{ErrorType: "query error", Message: "date range not valid"})
		return
	}
	// TODO add regex check on date formats

	log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	// TODO link to database query function with the three params (product, start date, end date)

	// NOTE: temporary stub of product metrics response (for POC purpose)
	var ordersAndRevenue = []response.OrdersAndRevenueByProduct{
		{ProductName: product, TotalOrders: 30, Revenue: 350.45},
	}
	c.IndentedJSON(http.StatusOK, ordersAndRevenue)
}
