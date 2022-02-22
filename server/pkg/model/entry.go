package model

//import "gorm.io/gorm"

// NOTE: only for TESTING/POC PURPOSE (it reflects the exact structure of the CSV

type Entry struct {
	// multiple name tags
	OrderID   int     `csv:"orderID"  db:"order_id"`
	ClientID  int     `csv:"clientID" db:"client_id"`
	Name      string  `csv:"name" db:"name"`
	Surname   string  `csv:"surname" db:"surname"`
	ProductID int     `csv:"productID"  db:"product_id"`
	Product   string  `csv:"product"  db:"product_name"`
	Price     float64 `csv:"price" db:"price"`
	Date      string  `csv:"date" db:"order_date"`
}
