package api

import (
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetOrdersAvg(t *testing.T) {

	type OrdersAvg struct {
		OrdersValue float64 `json:"orders_avg"`
		StartDate   string  `json:"start_date"`
		EndDate     string  `json:"end_date"`
	}

	router := Router()

	// Create a new recorder to record the response received by the /orders_avg endpoint.
	rr := httptest.NewRecorder()

	// Create a new request to the /orders_avg endpoint
	req, err := http.NewRequest("GET", "/orders_avg", nil)
	if err != nil {
		t.Fatal(err)
	}
	q := req.URL.Query()
	q.Add("start_date", "2022-01-01")
	q.Add("end_date", "2022-02-20")
	req.URL.RawQuery = q.Encode()
	router.ServeHTTP(rr, req)

	// Check if the response status code is 200 or 400.
	if status := rr.Code; (status != http.StatusOK) && (status != http.StatusBadRequest) {
		t.Errorf(`Returned wrong status code: got %v want %v or %v`,
			status, http.StatusOK, http.StatusBadRequest)
	}

	var orders = OrdersAvg{}
	json.Unmarshal(rr.Body.Bytes(), &orders)

	assert.Equalf(t, reflect.TypeOf(orders.OrdersValue), reflect.TypeOf(0.5),
		"Returned an unexpected average Orders value. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf(0.5),
		reflect.TypeOf(orders.OrdersValue))

	assert.Equalf(t, reflect.TypeOf(orders.StartDate), reflect.TypeOf("string"),
		"Returned an unexpected Start Date. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf("string"),
		reflect.TypeOf(orders.StartDate))

	assert.Equalf(t, reflect.TypeOf(orders.EndDate), reflect.TypeOf("string"),
		"Returned an unexpected End Date. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf("string"),
		reflect.TypeOf(orders.EndDate))
}
