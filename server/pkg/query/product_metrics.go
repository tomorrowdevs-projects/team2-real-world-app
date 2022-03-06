package query

import (
	"errors"
	"fmt"
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/request"
	response "team2-real-world-app/server/pkg/model/response"
)

var (
	ProductMetricsError = errors.New("product metrics query not executed")
)

func ProductMetrics(request request.ProductMetrics) (*response.ProductMetrics, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, model.ErrDbDisconnected
	}

	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	// execute query
	row := dbx.QueryRow("SELECT "+
		"COUNT(product_id), SUM(price), product.name "+
		"FROM product "+
		"JOIN orders on product.id = orders.product_id "+
		"WHERE product_id=? AND date BETWEEN ? and ? "+
		"GROUP BY product.name",
		request.ProductID, request.StartDate, request.EndDate)

	// scan query row value
	var totOrders int
	var revenue float64
	var product string
	err = row.Scan(&totOrders, &revenue, &product)

	// create response struct
	var responseProductMetrics = &response.ProductMetrics{
		ProductName: product,
		TotalOrders: totOrders,
		Revenue:     revenue,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
	}

	if err != nil {
		fmt.Println(err)
		return nil, ProductMetricsError
	}

	log.Println(" ▸ Product metrics query executed")
	return responseProductMetrics, err
}
