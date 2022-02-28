package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
)

type OrdersAVGResponse struct {
	AVGOrders int    `db:"COUNT(id)"           json:"orders_avg"`
	StartDate string `db:"MIN(date)"           json:"start_date"`
	EndDate   string `db:"MAX(date)"           json:"end_date"`
}

type OrdersAVGRequest struct {
	StartDate string
	EndDate   string
}

func OrdersAVG(request OrdersAVGRequest) ([]OrdersAVGResponse, error) {
	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	var response []OrdersAVGResponse

	err = dbx.Select(&response, "SELECT "+
		"COUNT(id), MIN(date), MAX(date) "+
		"FROM orders "+
		"WHERE orders.date BETWEEN ? and ?",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, err
	}

	// return productsMetrics, err
	return response, err
}
