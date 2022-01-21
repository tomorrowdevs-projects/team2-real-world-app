package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"math"
	"math/rand"
	"os"
	"strconv"
	"strings"

	"github.com/icrowley/fake"
	"github.com/lithammer/shortuuid"
)

func main() {
	// CHANGE THESE constants to test different data
	const iterations = 4000000                                                 // total number of entries (orders)
	const percentage_unique_clients = 60                                    // 100% means all clients are different
	const n_unique_clients = (iterations * percentage_unique_clients) / 100 // number of unique clients
	const n_products = 500                                                  // total number of products available on the ecommerce

	// CSV FILE CREATION  (in brackets: path where the file was created, starting from the current location)
	csvFile, err := os.Create("ecommerce.csv")
	// Error handling
	if err != nil {
		log.Fatalf("Failed creating file: %s", err)
	}

	// WRITING DATA TO FILE
	csvWriter := csv.NewWriter(csvFile)
	header := []string{
		"fullName", "product", "price", "orderID", "productID", "email", "date",
	}
	_ = csvWriter.Write(header)

	var products [n_products]string
	var prices [n_products]float64
	var unique_clients [n_unique_clients]string
	var product_ids [n_products]string
	var emails [n_unique_clients]string

	const email_host = "@mymail.com"

	for i := 0; i < n_unique_clients; i++ {
		if i < n_products {
			fl := 2 + rand.Float64()*(100-2)
			prices[i] = math.Round(fl*100) / 100
			products[i] = fake.ProductName()
			product_ids[i] = "PROD00" + strconv.Itoa(i)
		}
		unique_clients[i] = fake.FirstName() + " " + fake.LastName()
		emails[i] = strings.ToLower(strings.ReplaceAll(unique_clients[i], " ", "") + strconv.Itoa(i) + email_host)
	}

	for i := 0; i < iterations; i++ {
		productRandomIndex := rand.Intn(499)
		clientRandomIndex := rand.Intn(n_unique_clients)
		row := []string{
			unique_clients[clientRandomIndex],
			products[productRandomIndex],
			fmt.Sprintf("%f", prices[productRandomIndex]),
			shortuuid.New(),
			product_ids[productRandomIndex],
			emails[clientRandomIndex],
			strconv.Itoa(rand.Intn(29-1)+1) + "-" + strconv.Itoa(fake.MonthNum()) + "-" + strconv.Itoa(fake.Year(2018, 2021)),
		}
		_ = csvWriter.Write(row)
	}

	// Buffer handling
	csvWriter.Flush()

	// CLOSE THE FILE
	_ = csvFile.Close()
}
