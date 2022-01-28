## default settings 1000 orders & 60% unique clients
go run script.go  --> sample/testing usage

## customized settings
go run script.go first_arg second_arg  --> first_arg is number of orders, second_arg is % of unique clients

## generation of huge CSV (> 2GB)
use these:
go run script.go 30000000 60  --> will create 30 million orders with 60% unique clients
