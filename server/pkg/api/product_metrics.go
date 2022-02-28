package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/query"
)

func GetOrdersAndRevenue(c *gin.Context) {
	//fmt.Println(c.Request)
	productStr, isProductQueried := c.GetQuery("product_name")
	product, err := strconv.Atoi(productStr)

	// consider all products if no product is queried
	if !isProductQueried {
		product = 0
	}
	if err != nil {
		fmt.Println("Error", err)
	}

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.Error{ErrorType: "query error", Message: "date range not valid"})
		return
	}
	// TODO add regex check on date formats

	// log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	// Query function with the three params (product, start date, end date)
	var requestProductMetrics = query.ProductMetricsRequest{
		ProductID: product,
		StartDate: startDate,
		EndDate:   endDate,
	}

	// return the product METRICS JSON
	productsMetrics, err := query.ProductMetrics(requestProductMetrics) // <---
	if err != nil {
		fmt.Println("Error", err)
	}
	//fmt.Println(productsMetrics)

	// NOTE: temporary stub of product metrics response (for POC purpose)
	// var ordersAndRevenue = []response.OrdersAndRevenueByProduct{
	// 	{ProductName: product, TotalOrders: 30, Revenue: 350.45, StartDate: startDate, EndDate: endDate},
	// }
	c.IndentedJSON(http.StatusOK, productsMetrics)
}
