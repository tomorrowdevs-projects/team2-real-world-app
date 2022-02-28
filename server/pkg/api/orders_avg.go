package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/query"
)

func GetOrdersAvg(c *gin.Context) {

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.Error{ErrorType: "query error", Message: "date range not valid"})
		return
	}
	// TODO add regex check on date formats

	//log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	var requestAVGOrders = query.OrdersAVGRequest{
		StartDate: startDate,
		EndDate:   endDate,
	}

	// return AVG orders JSON
	OrdersAVG, err := query.OrdersAVG(requestAVGOrders) // <---
	if err != nil {
		fmt.Println("Error", err)
	}

	// NOTE: temporary average orders (for POC purpose)
	/*	var Orders = response.OrdersAvg{
		OrdersValue: 50.50, StartDate: startDate, EndDate: endDate,
	}*/
	c.IndentedJSON(http.StatusOK, OrdersAVG)
}
