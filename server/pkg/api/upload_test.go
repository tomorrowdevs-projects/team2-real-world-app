package api

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestUploadFile(t *testing.T) {

	router := Router()

	// Create a new recorder to record the response received by the /upload endpoint.
	rr := httptest.NewRecorder()

	// Create a new request to the /upload endpoint
	req, err := http.NewRequest("POST", "/upload", nil)
	if err != nil {
		t.Fatal(err)
	}
	router.ServeHTTP(rr, req)

	// Check if the response status code is 200 or 400.
	if status := rr.Code; (status != http.StatusOK) && (status != http.StatusBadRequest) {
		t.Errorf("Returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

}
