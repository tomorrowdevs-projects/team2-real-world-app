package api

import (
	"encoding/json"
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
		t.Errorf("Returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	// Check if the response JSON structure is correct.
	var metrics []OrdersAndRevenueByProduct
	json.Unmarshal(rr.Body.Bytes(), &metrics)

	for i := 0; i < len(metrics); i++ {
		if reflect.TypeOf(metrics[i].ProductName) != (reflect.TypeOf("string")) {
			t.Errorf("Returned an unexpected Name (see line %v)", i)
			break
		} else if reflect.TypeOf(metrics[i].TotalOrders) != (reflect.TypeOf(0)) {
			t.Errorf("Returned an unexpected value of Orders (see line %v)", i)
			break
		} else if reflect.TypeOf(metrics[i].Revenue) != (reflect.TypeOf(0.0)) {
			t.Errorf("Returned an unexpected value of Revenue (see line %v)", i)
			break
		} else if reflect.TypeOf(metrics[i].StartDate) != (reflect.TypeOf("string")) ||
			reflect.TypeOf(metrics[i].EndDate) != (reflect.TypeOf("string")) {
			t.Errorf("Returned an unexpected Date (see line %v)", i)
			break
		}
		if metrics[i].ProductName != "0" {
			t.Errorf("Returned an unexpected Product (see line %v)", i)
		}
	}

}
