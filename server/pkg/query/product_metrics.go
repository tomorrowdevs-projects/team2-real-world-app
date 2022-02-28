package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
)

type ProductMetricsResponse struct {
	ProductName string  `db:"name"         json:"product_name"`
	TotalOrders int     `db:"COUNT(product_id)"    json:"total_orders"`
	Revenue     float64 `db:"SUM(price)"           json:"revenue"`
	StartDate   string  `db:"MIN(date)"      json:"start_date"`
	EndDate     string  `db:"MAX(date)"      json:"end_date"`
}

type ProductMetricsRequest struct {
	ProductID int
	StartDate string
	EndDate   string
}

func ProductMetrics(request ProductMetricsRequest) ([]ProductMetricsResponse, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	var response []ProductMetricsResponse
	//fmt.Println(request.ProductID)
	//fmt.Println(request.StartDate)
	//fmt.Println(request.EndDate)

	err = dbx.Select(&response, "SELECT "+
		"COUNT(product_id), SUM(price), product.name, MIN(date), MAX(date)"+
		"FROM product "+
		"JOIN orders on product.id = orders.product_id "+
		"WHERE product_id=? AND date BETWEEN ? and ? "+
		"GROUP BY product.name",
		request.ProductID, request.StartDate, request.EndDate)

	//fmt.Println(response)

	if err != nil {
		return nil, err
	}
	//productsMetrics, err := helpers.StructToJSON(response)

	//return productsMetrics, err
	return response, err
}

// Row 36 -> product.product_name -> product.name
//			order_date -> date
// Row 38 -> product.product_id -> product.id
//			orders.product -> orders.product_id
// Row 39 -> order_date -> date
// Row 40 -> product.product_name -> product.name

// Row 9 - 12 - 13  -> removed suffix product and orders
