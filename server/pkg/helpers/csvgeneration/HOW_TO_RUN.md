## default settings 1000 orders & 60% unique clients
`csvgeneration.RunGeneration()`  --> sample/testing usage

## customized settings
`csvgeneration.BuildCSV(first_arg, second_arg)` --> first_arg is number of orders, second_arg is % of unique clients

## generation of huge CSV (> 2GB)
use these:\
`csvgeneration.BuildCSV(30000000, 60)` --> will create 30 million orders with 60% unique clients

***
*** **note** ***:\
the code samples above will work from the *main.go* script after importing
the module as `"team2-real-world-app/server/pkg/helpers/csvgeneration"`