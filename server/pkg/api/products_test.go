package api

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"reflect"
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

	// Set the header request
	req.Header.Set("Content-Type", "application/json")

	// Create a new recorder to record the response received by the /products endpoint.
	rr := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(rr)
	ctx.Request = &http.Request{
		Header: make(http.Header),
	}

	// Check if the response status code is 200 or 400.
	if status := rr.Code; (status != http.StatusOK) && (status != http.StatusBadRequest) {
		t.Errorf("Returned wrong status code: got %v want %v or %v",
			status, http.StatusOK, http.StatusBadRequest)
	}

	// Check if the response JSON structure is correct.
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
