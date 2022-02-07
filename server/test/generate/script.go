package generate

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

func BuildCSV(nOrders int, percentageUniqueClients int) {
	/*
		@param nOrders is the total number of rows of the CSV
		@param percentageUniqueClients allows (eventually) more than one order per client
	*/

	const MAX_N_PRODUCTS = 1000 // ecommerce sells maximum 1000 products
	var nUniqueClients = (nOrders * percentageUniqueClients) / 100

	// CSV FILE CREATION  (in brackets: path where the file was created, starting from the current location)
	csvFile, err := os.Create("data.csv")
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
	var productIds []string
	prices := make([]float64, MAX_N_PRODUCTS)
	clientNames := make([]string, nUniqueClients)
	clientSurnames := make([]string, nUniqueClients)
	clientIds := make([]string, nUniqueClients)

	for i := 0; i < nUniqueClients; i++ {
		if i < MAX_N_PRODUCTS {
			fl := 2 + rand.Float64()*(100-2)
			prices[i] = math.Round(fl*100) / 100
			product := fake.ProductName()
			// adding product only if not already present
			if contains(products, product) == false {
				products = append(products, product)
				productIds = append(productIds, strconv.Itoa(i+1))
			}
		}
		clientNames[i] = fake.FirstName()
		clientSurnames[i] = fake.LastName()
		clientIds[i] = strconv.Itoa(i + 1)
	}

	println(strconv.Itoa(nOrders) + " total orders")
	println(strconv.Itoa(len(products)) + " avilable products")
	println(strconv.Itoa(len(clientNames)) + " unique clients")

	// populating the columns with as many entries as number of orders
	for i := 0; i < nOrders; i++ {
		productRandomIndex := rand.Intn(len(products))
		clientRandomIndex := rand.Intn(nUniqueClients)
		row := []string{
			strconv.Itoa(i + 1),
			clientIds[clientRandomIndex],
			clientNames[clientRandomIndex],
			clientSurnames[clientRandomIndex],
			productIds[productRandomIndex],
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

func contains(products []string, newProduct string) bool {
	for _, p := range products {
		if p == newProduct {
			return true
		}
	}
	return false
}

func RunGeneration() {
	println("generating orders, please wait ...")

	/*
		if no CLI arguments are passed, the script will generate a sample csv with:
		1000 orders and 60% unique clients
	*/
	if len(os.Args) == 1 {
		BuildCSV(1000, 60)
	}

	/*
		block of code executed in case CLI arguments are passed
		e.g. --> "go run ecommerce.go 4000000 60" will generate 4 million orders with 60% unique clients
	*/
	if len(os.Args) == 3 {
		nOrders, err := strconv.Atoi(os.Args[1])
		percentageUniqueClients, err := strconv.Atoi(os.Args[2])
		if err != nil {
			panic("error in command line arguments")
		}
		BuildCSV(nOrders, percentageUniqueClients)
	}
}
