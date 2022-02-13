package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestProducts(t *testing.T) {

	type Products struct {
		ID   int
		Name string
	}

	// Create a new request to the /products endpoint
	req, err := http.NewRequest("GET", "/products", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new recorder to record the response received by the /products endpoint.
	rr := httptest.NewRecorder()
	GetProducts(rr, req)

	// Check if the response status code is 200.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check if the (static) response body is what we expect.
	expected := []Products{
		{ID: 1, Name: "Remote Tuner"},
		{ID: 2, Name: "Direct Case"},
		{ID: 3, Name: "Audible Bridge"},
	}
	jsonExpected, _ := json.Marshal(expected)

	jsonBody := rr.Body.String()

	if jsonBody != string(jsonExpected) {
		t.Errorf("Returned an unexpected body: got %v want %v",
			rr.Body.String(), string(jsonExpected))
	}
}
