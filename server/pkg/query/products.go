package query

import (
	"errors"
	"log"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/model"
	"team2-real-world-app/server/pkg/model/response"
)

type Product struct {
	ProductID   string `db:"id"   json:"product_id"`
	ProductName string `db:"name" json:"product_name"`
}

var (
	ProductsError = errors.New("products query not executed")
)

// AllProducts - query that return all product in the Database
func AllProducts() ([]response.AllProducts, error) {

	// create Database connection
	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	dbx, err := db.GetConnection()
	if err != nil {
		return nil, model.ErrDbDisconnected
	}

	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	var products []response.AllProducts
	err = dbx.Select(&products, "SELECT id, name FROM product")
	if err != nil {
		return nil, ProductsError
	}

	log.Println(" ▸ all products query executed")
	return products, nil

}
