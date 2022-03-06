package response

// ProductMetrics - model of the struct response used for the function productMetrics
type ProductMetrics struct {
	ProductName string  `db:"name"                 json:"product_name"`
	TotalOrders int     `db:"COUNT(product_id)"    json:"total_orders"`
	Revenue     float64 `db:"SUM(price)"           json:"revenue"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
}
