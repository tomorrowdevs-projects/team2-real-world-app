package api

import (
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetCustomersNumber(t *testing.T) {

	type CustomersNumber struct {
		NumCustomers int    `json:"num_clients"`
		StartDate    string `json:"start_date"`
		EndDate      string `json:"end_date"`
	}

	router := Router()

	// Create a new recorder to record the response received by the /customers_count endpoint.
	rr := httptest.NewRecorder()

	// Create a new request to the /customers_count endpoint
	req, err := http.NewRequest("GET", "/customers_count", nil)
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
		t.Errorf("Returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	var customers = CustomersNumber{}
	json.Unmarshal(rr.Body.Bytes(), &customers)

	assert.Equalf(t, reflect.TypeOf(customers.NumCustomers), reflect.TypeOf(0),
		"Returned an unexpected value of Customers. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf(0),
		reflect.TypeOf(customers.NumCustomers))

	assert.Equalf(t, reflect.TypeOf(customers.StartDate), reflect.TypeOf("string"),
		"Returned an unexpected Start Date. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf("string"),
		reflect.TypeOf(customers.StartDate))

	assert.Equalf(t, reflect.TypeOf(customers.EndDate), reflect.TypeOf("string"),
		"Returned an unexpected End Date. \n"+
			"Expected %v value, returned %v value ",
		reflect.TypeOf("string"),
		reflect.TypeOf(customers.EndDate))
}
