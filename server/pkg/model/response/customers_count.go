package response

// CustomersCount - model of the struct response used for the function customersCount
type CustomersCount struct {
	NumCustomers int    `db:"COUNT(client_id)"   json:"num_clients"`
	StartDate    string `db:"MIN(date)"          json:"start_date"`
	EndDate      string `db:"MAX(date)"          json:"end_date"`
}
