package response

type OrdersAndRevenueByProduct struct {
	ProductName string  `json:"productName"`
	TotalOrders int     `json:"totalOrders"`
	Revenue     float64 `json:"revenue"`
}
