package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/response"
)

func GetCustomersNumber(c *gin.Context) {

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.Error{ErrorType: "query error", Message: "date range not valid"})
		return
	}
	// TODO add regex check on date formats

	//log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	// TODO link to database query function with two params (start date, end date)

	// NOTE: temporary customers number (for POC purpose)
	var Customers = response.CustomersNumber{
		NumCustomers: 50, StartDate: startDate, EndDate: endDate,
	}
	c.IndentedJSON(http.StatusOK, Customers)
}
