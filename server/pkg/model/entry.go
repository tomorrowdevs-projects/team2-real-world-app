package model

import "gorm.io/gorm"

// NOTE: only for TESTING/POC PURPOSE (it reflects the exact structure of the CSV

type Entry struct {
	gorm.Model
	OrderID   int     `csv:"orderID"`
	ClientID  int     `csv:"clientID"`
	Name      string  `csv:"name"`
	Surname   string  `csv:"surname"`
	ProductID int     `csv:"productID"`
	Product   string  `csv:"product"`
	Price     float64 `csv:"price"`
	Date      string  `csv:"date"`
}
