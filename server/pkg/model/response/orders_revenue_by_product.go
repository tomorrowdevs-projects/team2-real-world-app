package response

type OrdersAndRevenueByProduct struct {
	ProductName string  `json:"product_name"`
	TotalOrders int     `json:"total_orders"`
	Revenue     float64 `json:"total_revenue"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
}
