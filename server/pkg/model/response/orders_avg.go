package response

// OrdersAvg - model of the struct response used for the function orders AVG
type OrdersAvg struct {
	OrdersValue float64 `db:"COUNT(id)"           json:"orders_avg"`
	StartDate   string  `db:"MIN(date)"           json:"start_date"`
	EndDate     string  `db:"MAX(date)"           json:"end_date"`
}
