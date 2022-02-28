package main

import (
	"fmt"
	"team2-real-world-app/server/pkg/query"
)

func main() {

	// launching server
	/*router := api.Router()
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}*/

	///////////////////////////////////////////////////////////////////////////////////////////

	// Create struct with the data and bulk it into the Database tables
	/*path := ""

	var newFile = file.NewFile()
	entries, err := newFile.HandleFile(path)

	if err != nil {
		fmt.Printf("error")
		//return err
	}*/

	///////////////////////////////////////////////////////////////////////////////////////////

	// return the products JSON
	products, err := query.AllProducts()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(products))

	///////////////////////////////////////////////////////////////////////////////////////////

	// request example
	var requestProductMetrics = query.ProductMetricsRequest{
		ProductID: 1,
		StartDate: "2019-01-22",
		EndDate:   "2022-02-26",
	}

	// return the product METRICS JSON
	productsMetrics, err := query.ProductMetrics(requestProductMetrics) // <---
	if err != nil {
		fmt.Println("Error", err)
	}
	fmt.Println(string(productsMetrics))

	/* var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	/*err := db.Connect(dbmanager.DBParameters{
		UserName: "root",
		Password: "root",
		Host:     "localhost",
		Port:     3306,
		DbName:   "test_db",
	})
	if err != nil {
		log.Printf(" ** Connection error: %s \n", err)
		return
	}
	log.Printf("** I should be connected. Status connection: %t\n", db.IsConnected())

	//err = db.PopulateStruct(entries)

	if err != nil {
		fmt.Println(err)
	}
	products, err := query.AllProducts(dbx)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(products))*/

	///////////////////////////////////////////////////////////////////////////////////////////

	var requestCustomersCount = query.CustomersCountRequest{
		StartDate: "2019-01-22",
		EndDate:   "2022-02-26",
	}

	// return the customers count JSON
	customersCount, err := query.CustomersCount(requestCustomersCount) // <---
	if err != nil {
		fmt.Println("Error", err)
	}
	fmt.Println(string(customersCount))
}
