package main

import (
	//"fmt"
	//"log"
	"team2-real-world-app/server/pkg/api"
	//dbmanager "team2-real-world-app/server/pkg/database"
	//"team2-real-world-app/server/pkg/file"
)

func main() {

	// launching server
	router := api.Router()
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}

	///////////////////////////////////////////////////////////////////////////////////////////

	// Create struct with the data and bulk it into the Database tables
	/*path := ""

	var newFile = file.NewFile()
	entries, err := newFile.HandleFile(path)

	if err != nil {
		fmt.Printf("error")
		//return err
	}

	///////////////////////////////////////////////////////////////////////////////////////////

	/*
	// return the products JSON
	products, err := query.AllProducts()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(products))
	*/

	/*
		var db = dbmanager.NewDBManager()
		//log.Printf("** Try to connected\n")

		err = db.Connect(dbmanager.DBParameters{
			UserName: "root",
			Password: "root",
			Host:     "localhost",
			Port:     3306,
			DbName:   "real_world_app",
		})
		if err != nil {
			log.Printf(" ** Connection error: %s \n", err)
			return
		}
		log.Printf("** I should be connected. Status connection: %t\n", db.IsConnected())

		err = db.PopulateStruct(entries)

		if err != nil {
			fmt.Println(err)
		}
	*/
	/*products, err := query.AllProducts(dbx)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(products))
	*/
	///////////////////////////////////////////////////////////////////////////////////////////

}
