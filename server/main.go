package main

import (
	"team2-real-world-app/server/pkg/api"
)

func main() {

	// launching server
	router := api.Router()
	err := router.Run("localhost:8080")

	if err != nil {
		return
	}
}

///////////////////////////////////////////////////////////////////////////////////////////

/*// Create struct with the data and bulk it into the Database tables
path := ""

var newFile = file.NewFile()
entries, err := newFile.HandleFile(path)

if err != nil {
	fmt.Printf("error")
	//return err
}

var db = dbmanager.NewDBManager()
log.Printf("** Try to connected\n")

err = db.Connect(dbmanager.DBParameters{
	UserName: "root",
	Password: "root",
	Host:     "localhost",
	Port:     3306,
	DbName:   "real_world_app",
})
if err != nil {
	log.Printf(" ** Connection error: %s \n", err)
	return
}
log.Printf("** I should be connected. Status connection: %t\n", db.IsConnected())

err = db.PopulateStruct(entries)

///////////////////////////////////////////////////////////////////////////////////////////

// return the products JSON
products, err := query.AllProducts()
if err != nil {
	fmt.Println(err)
}
fmt.Println(products)

///////////////////////////////////////////////////////////////////////////////////////////

// request example
var request = query.ProductMetricsRequest{
	ProductID: 1,
	StartDate: "2019-01-22",
	EndDate:   "2022-02-26",
}

// return the product METRICS JSON
productsMetrics, err := query.ProductMetrics(request) // <---
if err != nil {
	fmt.Println("Error", err)
}
fmt.Println(productsMetrics)

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
fmt.Println(customersCount)

///////////////////////////////////////////////////////////////////////////////////////////

var requestAVGOrders = query.OrdersAVGRequest{
	StartDate: "2019-01-01",
	EndDate:   "2022-01-01",
}

// return AVG orders JSON
OrdersAVG, err := query.OrdersAVG(requestAVGOrders) // <---
if err != nil {
	fmt.Println("Error", err)
}
fmt.Println(OrdersAVG)*/
