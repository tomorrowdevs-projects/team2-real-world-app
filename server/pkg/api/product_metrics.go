package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/request"
	"team2-real-world-app/server/pkg/model/response"
	"team2-real-world-app/server/pkg/query"
)

func GetOrdersAndRevenue(c *gin.Context) {
	//fmt.Println(c.Request)
	productStr, _ := c.GetQuery("product_name") // will be change in product_id or product_uuid

	startDate, isStartDateQueried := c.GetQuery("start_date")
	endDate, isEndDateQueried := c.GetQuery("end_date")
	// request is not valid without a date range
	if !isStartDateQueried || !isEndDateQueried {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.ErrInvalidDateQuery.Error())
		return
	}
	// TODO add regex check on date formats

	// log.Printf("searching KPIs in date range %s -> %s", startDate, endDate)

	// Query function with the three params (product, start date, end date)
	var requestProductMetrics = request.ProductMetrics{
		ProductID: productStr,
		StartDate: startDate,
		EndDate:   endDate,
	}

	// return the product metrics JSON
	productsMetrics, err := query.ProductMetrics(requestProductMetrics)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}

	JsonResp := []*response.ProductMetrics{productsMetrics}
	c.IndentedJSON(http.StatusOK, JsonResp)
	return
}
