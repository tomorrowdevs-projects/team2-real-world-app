package response

// OrdersAvg - model of the struct response used for the function orders AVG
type OrdersAvg struct {
	OrdersAvg float64 `db:"AVG(product.price)"     json:"orders_avg"`
	StartDate string  `json:"start_date"`
	EndDate   string  `json:"end_date"`
}
