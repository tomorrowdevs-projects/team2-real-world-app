package api

import (
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetProducts(t *testing.T) {

	type Products struct {
		ID   string `json:"product_id"`
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

	var productsLen = len(products)

	if productsLen > 0 {

		assert.Equalf(t, reflect.TypeOf(products[0].ID), reflect.TypeOf("string"),
			"Returned an unexpected ID. "+
				"Expected type %v, returned %v",
			reflect.TypeOf("string"),
			reflect.TypeOf(products[0].ID))

		assert.Equalf(t, reflect.TypeOf(products[productsLen-1].Name), reflect.TypeOf("string"),
			"Returned an unexpected Name. "+
				"Expected type %v, returned %v",
			reflect.TypeOf("string"),
			reflect.TypeOf(products[productsLen-1].ID))

	}

}
