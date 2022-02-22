package response

type CustomersNumber struct {
	NumCustomers int    `json:"num_clients"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
}
