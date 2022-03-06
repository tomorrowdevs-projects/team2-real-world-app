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

func OrdersAVG(request request.OrdersAvg) (*response.OrdersAvg, error) {
	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	// get the order's avg value from the query result
	var ordersAvg float64

	err = dbx.Get(&ordersAvg, "SELECT "+
		"COUNT(id)"+
		"FROM orders "+
		"WHERE orders.date BETWEEN ? and ?",
		request.StartDate, request.EndDate)

	if err != nil {
		return nil, OrdersAVGError
	}

	// create the query response
	responseOrdersAVG := &response.OrdersAvg{
		OrdersAvg: ordersAvg,
		StartDate: request.StartDate,
		EndDate:   request.EndDate}

	log.Println(" ▸ Orders AVG query executed")
	return responseOrdersAVG, err
}
