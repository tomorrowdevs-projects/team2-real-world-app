package query

import (
	"errors"
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/model/request"
	"team2-real-world-app/server/pkg/model/response"
)

var (
	OrdersAVGError = errors.New("orders AVG query not executed")
)

func OrdersAVG(request request.OrdersAvg) ([]response.OrdersAvg, error) {
	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	var responseOrdersAVG []response.OrdersAvg

	err = dbx.Select(&responseOrdersAVG, "SELECT "+
		"COUNT(id), MIN(date), MAX(date) "+
		"FROM orders "+
		"WHERE orders.date BETWEEN ? and ?",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, OrdersAVGError
	}

	log.Println(" ▸ Orders AVG query executed")
	return responseOrdersAVG, err
}
