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

type CustomersCountRequest struct {
	StartDate string
	EndDate   string
}

func CustomersCount(request request.CustomersCount) ([]response.CustomersCount, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	// TODO check if is connected and print status

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer db.Disconnect() // close connection
	log.Printf(" ▶ Database connected ✔ \n")

	var responseCustomersCount []response.CustomersCount

	err = dbx.Select(&responseCustomersCount, "SELECT "+
		"COUNT(client_id), MIN(date), MAX(date) "+
		"FROM client "+
		"JOIN orders ON client.id = orders.client_id "+
		"WHERE date BETWEEN ? and ? ",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, CustomersCountError
	}

	log.Println(" ▸ Customers count query executed")
	return responseCustomersCount, err
}
