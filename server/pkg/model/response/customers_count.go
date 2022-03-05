package response

// CustomersCount - model of the struct response used for the function customersCount
type CustomersCount struct {
	CustomersCount int    `db:"COUNT(client_id)"   json:"num_clients"`
	StartDate      string `json:"start_date"`
	EndDate        string `json:"end_date"`
}
