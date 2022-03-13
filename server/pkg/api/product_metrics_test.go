package api

import (
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetOrdersAndRevenue(t *testing.T) {

	type OrdersAndRevenueByProduct struct {
		ProductName string  `json:"product_name"`
		TotalOrders int     `json:"total_orders"`
		Revenue     float64 `json:"total_revenue"`
		StartDate   string  `json:"start_date"`
		EndDate     string  `json:"end_date"`
	}

	router := Router()

	// Create a new recorder to record the response received by the /product_metrics endpoint.
	rr := httptest.NewRecorder()

	// Create a new request to the /product_metrics endpoint
	req, err := http.NewRequest("GET", "/product_metrics", nil)
	if err != nil {
		t.Fatal(err)
	}
	q := req.URL.Query()
	q.Add("product", "")
	q.Add("start_date", "2022-01-01")
	q.Add("end_date", "2022-02-20")
	req.URL.RawQuery = q.Encode()
	router.ServeHTTP(rr, req)

	// Check if the response status code is 200 or 400.
	if status := rr.Code; (status != http.StatusOK) && (status != http.StatusBadRequest) {
		t.Errorf(`Returned wrong status code: got %v want %v or %v`,
			status, http.StatusOK, http.StatusBadRequest)
	}

	// Check if the response JSON structure is correct.
	var metrics []OrdersAndRevenueByProduct
	json.Unmarshal(rr.Body.Bytes(), &metrics)

	var metricsLen = len(metrics)

	if metricsLen > 0 {

		assert.Equalf(t, reflect.TypeOf(metrics[0].ProductName), reflect.TypeOf("string"),
			"Returned an unexpected Name. "+
				"Expected %v, returned %v",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[0].ProductName))

		assert.Equalf(t, reflect.TypeOf(metrics[0].TotalOrders), reflect.TypeOf(0),
			"Returned an unexpected value of Orders. "+
				"Expected %v value, returned %v value.",
			reflect.TypeOf(0),
			reflect.TypeOf(metrics[0].TotalOrders))

		assert.Equalf(t, reflect.TypeOf(metrics[0].Revenue), reflect.TypeOf(0.5),
			"Returned an unexpected value of Revenue. "+
				"Expected %v value, returned %v value.",
			reflect.TypeOf(0.5),
			reflect.TypeOf(metrics[0].Revenue))

		assert.Equalf(t, reflect.TypeOf(metrics[0].StartDate), reflect.TypeOf("string"),
			"Returned an unexpected Start Date. \n"+
				"Expected %v value, returned %v value ",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[0].StartDate))

		assert.Equalf(t, reflect.TypeOf(metrics[0].EndDate), reflect.TypeOf("string"),
			"Returned an unexpected End Date. \n"+
				"Expected %v value, returned %v value ",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[0].EndDate))

		assert.Equalf(t, reflect.TypeOf(metrics[metricsLen-1].ProductName), reflect.TypeOf("string"),
			"Returned an unexpected Name. "+
				"Expected %v, returned %v",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[metricsLen-1].ProductName))

		assert.Equalf(t, reflect.TypeOf(metrics[metricsLen-1].TotalOrders), reflect.TypeOf(0),
			"Returned an unexpected value of Orders. "+
				"Expected %v value, returned %v value.",
			reflect.TypeOf(0),
			reflect.TypeOf(metrics[metricsLen-1].TotalOrders))

		assert.Equalf(t, reflect.TypeOf(metrics[metricsLen-1].Revenue), reflect.TypeOf(0.5),
			"Returned an unexpected value of Revenue. "+
				"Expected %v value, returned %v value.",
			reflect.TypeOf(0.5),
			reflect.TypeOf(metrics[metricsLen-1].Revenue))

		assert.Equalf(t, reflect.TypeOf(metrics[metricsLen-1].StartDate), reflect.TypeOf("string"),
			"Returned an unexpected Start Date. \n"+
				"Expected %v value, returned %v value ",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[metricsLen-1].StartDate))

		assert.Equalf(t, reflect.TypeOf(metrics[metricsLen-1].EndDate), reflect.TypeOf("string"),
			"Returned an unexpected End Date. \n"+
				"Expected %v value, returned %v value ",
			reflect.TypeOf("string"),
			reflect.TypeOf(metrics[metricsLen-1].EndDate))

	}

}
