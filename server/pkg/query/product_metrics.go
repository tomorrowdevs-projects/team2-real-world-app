package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/helpers"
)

type Response struct {
	ProductName string  `db:"product_name"         json:"product_name"`
	TotalOrders int     `db:"COUNT(product_id)"    json:"total_orders"`
	Revenue     float64 `db:"SUM(price)"           json:"revenue"`
	StartDate   string  `db:"MIN(order_date)"      json:"start_date"`
	EndDate     string  `db:"MAX(order_date)"      json:"end_date"`
}

type Request struct {
	ProductID int
	StartDate string
	EndDate   string
}

func ProductMetrics(request Request) ([]byte, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	var response []Response

	err = dbx.Select(&response, "SELECT "+
		"COUNT(product_id), SUM(price), product.product_name, MIN(order_date), MAX(order_date) "+
		"FROM product "+
		"JOIN orders on product.product_id = orders.product "+
		"WHERE product_id=? AND order_date BETWEEN ? and ? "+
		"GROUP BY product.product_name",
		request.ProductID, request.StartDate, request.EndDate)

	if err != nil {
		return nil, err
	}
	productsMetrics, err := helpers.StructToJSON(response)

	return productsMetrics, err
}
