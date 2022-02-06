package database

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type DBParameters struct {
	UserName string
	Password string
	Host     string
	Port     int
	DbName   string
}

/* we can use struct as "class" and add method to it,
once defined it is passed to a function and processed
*/
type DBManager struct {
	conn        *sql.DB // declare pointer variable
	isConnected bool
}

/* define expected errors as gloabl variables,
the gloabl variables should be defined at the top of the function
*/
var IsDisconnectedError = errors.New("database not connected")
var AlreadyConnectedError = errors.New("database already connected")

func GetDBManager() *DBManager {
	return &DBManager{ // to get the address or a pointer variable
		conn: nil,
	}
}

/* add method to the DBManger struct
define the args as the DBParameters struct
define the return type
*/
func (dbm *DBManager) Connect(dBParameters DBParameters) error {
	// check the db status and if true return the error
	if dbm.isConnected {
		return AlreadyConnectedError
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", dBParameters.UserName, dBParameters.Password,
		dBParameters.Host, dBParameters.Port, dBParameters.DbName)

	// open database connection
	db, err := sql.Open("mysql", conn)
	if err != nil {
		return err
	}

	// change the value of the DBM struct
	dbm.conn = db
	dbm.isConnected = true
	return nil
}

// close the db connection
func (dbm *DBManager) Disconnect() error {
	if !dbm.isConnected {
		return IsDisconnectedError
	}
	dbm.isConnected = false
	return dbm.conn.Close()
}

// check the db connection
func (dbm *DBManager) IsConnected() bool {
	return dbm.conn != nil && dbm.isConnected
}

/*
when we need to do something with the db instace (like query, upload, ...) we need to create
a stcture like this,
func (dbm *DBManager) DoSomething() error {
	// check the connection
	if !dbm.isConnected {
		return IsDisconnectedError
	}
	return nil
}
*/
