package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/response"
)

func GetOrdersAndRevenue(c *gin.Context) {
	product, isProductQueried := c.GetQuery("product_name")
	// consider all products if no product is queried
	if !isProductQueried {
		product = "*"
	}

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
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
		{ProductName: product, TotalOrders: 30, Revenue: 350.45, StartDate: startDate, EndDate: endDate},
	}
	c.IndentedJSON(http.StatusOK, ordersAndRevenue)
}
