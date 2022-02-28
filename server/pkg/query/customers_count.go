package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
)

type CustomersCountResponse struct {
	NumCustomers int    `db:"COUNT(client_id)"        json:"num_clients"`
	StartDate    string `db:"MIN(date)"      json:"start_date"`
	EndDate      string `db:"MAX(date)"      json:"end_date"`
}

type CustomersCountRequest struct {
	StartDate string
	EndDate   string
}

func CustomersCount(request CustomersCountRequest) ([]CustomersCountResponse, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	var response []CustomersCountResponse

	err = dbx.Select(&response, "SELECT "+
		"COUNT(client_id), MIN(date), MAX(date) "+
		"FROM client "+
		"JOIN orders ON client.id = orders.client_id "+
		"WHERE date BETWEEN ? and ? ",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, err
	}
	// productsMetrics, err := helpers.StructToJSON(response)

	// return productsMetrics, err
	return response, err
}

// Row 34 -> client -> client_id
//		     order_date -> date
// Row 36 -> client.client_id ->  client.id
//			 orders.client -> orders.client_id
// Row 37 -> order_date -> date

// Rows 10 -> 12 -> Modify prefix orders and add client_id (vs client)
