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

type DBManager struct {
	conn        *sql.DB
	isConnected bool
}

var IsDisconnectedError = errors.New("database not connected")
var AlreadyConnectedError = errors.New("database already connected")

func GetDBManager() *DBManager {
	return &DBManager{
		conn: nil,
	}
}

func (dbm *DBManager) Connect(dBParameters DBParameters) error {
	if dbm.isConnected {
		return AlreadyConnectedError
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", dBParameters.UserName, dBParameters.Password,
		dBParameters.Host, dBParameters.Port, dBParameters.DbName)
	//
	//	// open database connection
	db, err := sql.Open("mysql", conn)
	if err != nil {
		return err
	}
	dbm.conn = db
	dbm.isConnected = true
	return nil
}

func (dbm *DBManager) Disconnect() error {
	if !dbm.isConnected {
		return IsDisconnectedError
	}
	dbm.isConnected = false
	return dbm.conn.Close()
}

func (dbm *DBManager) IsConnected() bool {
	return dbm.conn != nil && dbm.isConnected
}

func (dbm *DBManager) DoSomething() error {
	if !dbm.isConnected {
		return IsDisconnectedError
	}
	return nil
}
