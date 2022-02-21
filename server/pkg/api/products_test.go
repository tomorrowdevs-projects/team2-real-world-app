package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetProducts(t *testing.T) {

	type Products struct {
		ID   int    `json:"product_id"`
		Name string `json:"product_name"`
	}

	router := Router()

	// Create a new recorder to record the response received by the /products endpoint.
	rr := httptest.NewRecorder()

	// Create a new request to the /products endpoint
	req, err := http.NewRequest("GET", "/products", nil)
	if err != nil {
		t.Fatal(err)
	}
	router.ServeHTTP(rr, req)

	// Check if the response status code is 200 or 400.
	if status := rr.Code; (status != http.StatusOK) && (status != http.StatusBadRequest) {
		t.Errorf("Returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	// Check if the response JSON struct is correct.
	var products []Products
	json.Unmarshal(rr.Body.Bytes(), &products)

	for i := 0; i < len(products); i++ {
		if reflect.TypeOf(products[i].ID) != (reflect.TypeOf(0)) {
			t.Errorf("Returned an unexpected ID (see line %v)", i)
			break
		} else if reflect.TypeOf(products[i].Name) != (reflect.TypeOf("string")) {
			t.Errorf("Returned an unexpected Name (see line %v)", i)
			break
		}
	}

}
