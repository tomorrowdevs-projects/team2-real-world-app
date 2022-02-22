package response

type OrdersAvg struct {
	OrdersValue float64 `json:"orders_avg"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
}
