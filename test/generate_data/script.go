package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"math"
	"math/rand"
	"os"
	"strconv"

	//"strings"

	"github.com/icrowley/fake"
)

func generate_data(n_orders int, percentage_unique_clients int) {
	/*
		@param n_orders is the total number of rows of the CSV
		@param percentage_unique_clients allows (eventually) more than one order per client
	*/

	const max_n_products = 1000 // ecommerce sells maximum 1000 products
	var n_unique_clients = (n_orders * percentage_unique_clients) / 100

	// CSV FILE CREATION  (in brackets: path where the file was created, starting from the current location)
	csvFile, err := os.Create("sample.csv")
	// Error handling
	if err != nil {
		log.Fatalf("Failed creating file: %s", err)
	}

	// WRITING DATA TO FILE
	csvWriter := csv.NewWriter(csvFile)
	header := []string{
		"orderID", "clientID", "name", "surname", "productID", "product", "price", "date",
	}
	_ = csvWriter.Write(header)

	// generating ranges of clients-products-prices and respective ids, different lengths are handled in the loop
	var products []string
	var product_ids []string
	prices := make([]float64, max_n_products)
	client_names := make([]string, n_unique_clients)
	client_surnames := make([]string, n_unique_clients)
	client_ids := make([]string, n_unique_clients)

	for i := 0; i < n_unique_clients; i++ {
		if i < max_n_products {
			fl := 2 + rand.Float64()*(100-2)
			prices[i] = math.Round(fl*100) / 100
			product := fake.ProductName()
			// adding product only if not already present
			if contains(products, product) == false {
				products = append(products, product)
				product_ids = append(product_ids, strconv.Itoa(i+1))
			}
		}
		client_names[i] = fake.FirstName()
		client_surnames[i] = fake.LastName()
		client_ids[i] = strconv.Itoa(i + 1)
	}

	println(strconv.Itoa(n_orders) + " total orders")
	println(strconv.Itoa(len(products)) + " avilable products")
	println(strconv.Itoa(len(client_names)) + " unique clients")

	// populating the columns with as many entries as number of orders
	for i := 0; i < n_orders; i++ {
		productRandomIndex := rand.Intn(len(products))
		clientRandomIndex := rand.Intn(n_unique_clients)
		row := []string{
			strconv.Itoa(i + 1),
			client_ids[clientRandomIndex],
			client_names[clientRandomIndex],
			client_surnames[clientRandomIndex],
			product_ids[productRandomIndex],
			products[productRandomIndex],
			fmt.Sprintf("%f", prices[productRandomIndex]),
			strconv.Itoa(fake.Year(2018, 2021)) + "-" + fmt.Sprintf("%02d", fake.MonthNum()) + "-" + fmt.Sprintf("%02d", rand.Intn(29-1)+1),
		}
		_ = csvWriter.Write(row)
	}

	// Buffer handling
	csvWriter.Flush()

	// CLOSE THE FILE
	_ = csvFile.Close()
}

func contains(products []string, new_product string) bool {
	for _, p := range products {
		if p == new_product {
			return true
		}
	}
	return false
}

func main() {
	println("generating orders, please wait ...")

	/*
		if no CLI arguments are passed, the script will generate a sample csv with:
		1000 orders and 60% unique clients
	*/
	if len(os.Args) == 1 {
		generate_data(1000, 60)
	}

	/*
		block of code executed in case CLI arguments are passed
		e.g. --> "go run ecommerce.go 4000000 60" will generate 4 million orders with 60% unique clients
	*/
	if len(os.Args) == 3 {
		n_orders, err := strconv.Atoi(os.Args[1])
		percentage_unique_clients, err := strconv.Atoi(os.Args[2])
		if err != nil {
			panic("error in command line arguments")
		}
		generate_data(n_orders, percentage_unique_clients)
	}
}
