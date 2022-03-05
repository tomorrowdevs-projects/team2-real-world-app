package query

import (
	"errors"
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/model/request"
	"team2-real-world-app/server/pkg/model/response"
)

var (
	CustomersCountError = errors.New("customers count query not executed")
)

func CustomersCount(request request.CustomersCount) (*response.CustomersCount, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer db.Disconnect() // close connection
	log.Printf(" ▶ Database connected ✔ \n")

	// get the customers count value from the query result
	var customersCount int

	err = dbx.Get(&customersCount, "SELECT "+
		"COUNT(client_id)"+
		"FROM client "+
		"JOIN orders ON client.id = orders.client_id "+
		"WHERE date BETWEEN ? and ? ",
		request.StartDate, request.EndDate)

	// create the query response
	responseCustomersCount := &response.CustomersCount{
		CustomersCount: customersCount,
		StartDate:      request.StartDate,
		EndDate:        request.EndDate}

	if err != nil {
		return nil, CustomersCountError
	}

	log.Println(" ▸ Customers count query executed")
	return responseCustomersCount, err
}
