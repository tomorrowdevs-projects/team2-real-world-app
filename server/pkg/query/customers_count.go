package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/helpers"
)

type CustomersCountResponse struct {
	NumCustomers int    `db:"COUNT(client)"        json:"num_clients"`
	StartDate    string `db:"MIN(order_date)"      json:"start_date"`
	EndDate      string `db:"MAX(order_date)"      json:"end_date"`
}

type CustomersCountRequest struct {
	StartDate string
	EndDate   string
}

func CustomersCount(request CustomersCountRequest) ([]byte, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	var response []CustomersCountResponse

	err = dbx.Select(&response, "SELECT "+
		"COUNT(client), MIN(order_date), MAX(order_date) "+
		"FROM client "+
		"JOIN orders ON client.client_id = orders.client "+
		"WHERE order_date BETWEEN ? and ? ",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, err
	}
	productsMetrics, err := helpers.StructToJSON(response)

	return productsMetrics, err
}
