package main

func main() {

	/*
		// launching server
		router := api.Router()
		err := router.Run("localhost:8080")
		if err != nil {
			return
		}
		}*/

	// Create struct with the data and bulk it into the Database tables
	/*path := ""

	var newFile = file.NewFile()
	entries, err := newFile.HandleFile(path)

	if err != nil {
		fmt.Printf("error")
		//return err
	}

	///////////////////////////////////////////////////////////////////////////////////////////

	var db = dbmanager.NewDBManager()
	log.Printf("** Try to connected\n")

	err = db.Connect(dbmanager.DBParameters{
		UserName: "root",
		Password: "root",
		Host:     "localhost",
		Port:     3306,
		DbName:   "test_db",
	})
	if err != nil {
		log.Printf(" ** Connection error: %s \n", err)
		return
	}
	log.Printf("** I should be connected. Status connection: %t\n", db.IsConnected())

	err = db.PopulateStruct(entries)*/

	/*
		this comment will be removed, at the moment I leave it here so that you all can better understand
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
