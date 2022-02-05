package database

import (
	"fmt"
	"team2-real-world-app/server/pkg/helpers"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func GetConnection() *sql.DB {

	var username string = helpers.GetEnv("DB_HOST")
	var password string = helpers.GetEnv("DB_PORT")
	var host string = helpers.GetEnv("DB_USERNAME")
	var port string = helpers.GetEnv("DB_PASSWORD")
	var db_name string = helpers.GetEnv("DB_NAME")

	conn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, host, port, db_name)

	// open database connection
	db, err := sql.Open("mysql", conn)

	if err != nil {
		panic(err.Error())
	}

	return db

}
