package response

// AllProducts - model of the struct response used for the function AllProducts
type AllProducts struct {
	ID   string `db:"id"   json:"product_id"`
	Name string `db:"name" json:"product_name"`
}
