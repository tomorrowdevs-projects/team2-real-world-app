package query

import (
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
)

type Product struct {
	ProductID   int    `db:"id"   json:"product_id"`
	ProductName string `db:"name" json:"product_name"`
}

// AllProducts - query that return all product in the Database
func AllProducts() ([]Product, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, err
	}

	defer dbx.Close()

	var product []Product
	err = dbx.Select(&product, "SELECT id, name FROM product")
	if err != nil {
		return nil, err
	}

	// to read the JSON as key: value
	//fmt.Println(string(products))
	return product, nil

}
