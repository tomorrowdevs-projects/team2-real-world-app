package query

import (
	"errors"
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/model/request"
	response "team2-real-world-app/server/pkg/model/response"
)

var (
	ProductMetricsError = errors.New("product metrics query not executed")
)

func ProductMetrics(request request.ProductMetrics) ([]response.ProductMetrics, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	var responseProductMetrics []response.ProductMetrics

	err = dbx.Select(&responseProductMetrics, "SELECT "+
		"COUNT(product_id), SUM(price), product.name, MIN(date), MAX(date)"+
		"FROM product "+
		"JOIN orders on product.id = orders.product_id "+
		"WHERE product_id=? AND date BETWEEN ? and ? "+
		"GROUP BY product.name",
		request.ProductID, request.StartDate, request.EndDate)

	if err != nil {
		return nil, ProductMetricsError
	}
	log.Println(" ▸ Product metrics query executed")
	return responseProductMetrics, err
}
