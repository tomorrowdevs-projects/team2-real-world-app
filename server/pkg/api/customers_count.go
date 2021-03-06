package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/request"
	"team2-real-world-app/server/pkg/model/response"
	"team2-real-world-app/server/pkg/query"
)

func GetCustomersNumber(c *gin.Context) {

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.ErrInvalidDateQuery.Error())
		return
	}
	// TODO add regex check on date formats

	//log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	// Query function with two params (start date, end date)

	var requestCustomersCount = request.CustomersCount{
		StartDate: startDate,
		EndDate:   endDate,
	}

	// return the customers count JSON
	customersCount, err := query.CustomersCount(requestCustomersCount) // <---
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}

	JsonResp := []*response.CustomersCount{customersCount}
	c.IndentedJSON(http.StatusOK, JsonResp)
	return
}
