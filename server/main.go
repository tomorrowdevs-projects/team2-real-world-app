package main

import (
	"team2-real-world-app/server/pkg/api"
	file "team2-real-world-app/server/pkg/file"
)

func main() {

	// launching server
	router := api.Router()
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}

	filePath := "C:/Users/Isabel/Desktop/ecommerce.csv"

	importFile := file.NewImportFile()
	importFile.SplitFile(filePath)

	/*
		this comment will be removed,
		at the moment I leave it here so that you all can better understand
		how to use the structure created in database.go

		/// LEt's suppose I run Docker in this way:
		///  docker run  --name db -p 3306:3306 \
		//   -e MYSQL_ROOT_PASSWORD=root \
		//   -e MYSQL_DATABASE=myapp \
		//   -e MYSQL_USER=test \
		//   -e MYSQL_PASSWORD=test \
		//   mysql

		var db = dbmanager.GetDBManager()
		fmt.Printf("Try to connected\n")

		err := db.Connect(dbmanager.DBParameters{
			UserName: "test",
			Password: "test",
			Host:     "localhost",
			Port:     3306,
			DbName:   "myapp",
		})
		if err != nil {
			fmt.Printf("Connection error: %s \n", err)
			return
		}
		fmt.Printf("I should be connected. Status connection: %t\n", db.IsConnected())

		err = db.Disconnect()
		if err != nil {
			fmt.Printf("Disconnection error: %s\n", err)
			return
		}
		fmt.Printf("I should be disconneted. Status connection: %t\n", db.IsConnected())

		// Here I am trying to use a closed connection
		err = db.DoSomething()
		if err != nil {
			fmt.Printf("I should receive the connection close error. error: %s\n", err)
			return
		}*/

}
