package database

import (
	"errors"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"log"
	"team2-real-world-app/server/pkg/helpers"
	"team2-real-world-app/server/pkg/model"
)

type DBParameters struct {
	UserName string
	Password string
	Host     string
	Port     int
	DbName   string
}

// DBManager - we can use struct as "class" and add method to it
type DBManager struct {
	conn        *sqlx.DB // declare pointer variable
	isConnected bool
}

// define expected errors at the top
var (
	IsDisconnectedError   = errors.New("database not connected")
	AlreadyConnectedError = errors.New("database already connected")
)

func NewDBManager() *DBManager {
	return &DBManager{ // to get the address or a pointer variable
		conn: nil,
	}
}

func (dbm *DBManager) GetConnection() (*sqlx.DB, error) {

	// get Database credentials and create connection
	parameters := helpers.GetCredentials()

	err := dbm.Connect(DBParameters{
		UserName: parameters.UserName,
		Password: parameters.Password,
		Host:     parameters.Host,
		Port:     parameters.Port,
		DbName:   parameters.DbName,
	})

	if err != nil {
		log.Printf(" ** Connection error: %s \n", err)
		return nil, err
	}

	return dbm.conn, nil
}

// Connect - create Database connection
func (dbm *DBManager) Connect(dBParameters DBParameters) error {
	// check the db status and if true return the error
	if dbm.isConnected {
		return AlreadyConnectedError
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", dBParameters.UserName, dBParameters.Password,
		dBParameters.Host, dBParameters.Port, dBParameters.DbName)

	// open database connection
	db, err := sqlx.Connect("mysql", conn)

	if err != nil {
		// HANDLE ERROR
		return err
	}

	// change the value of the DBM struct
	dbm.conn = db
	dbm.isConnected = true
	return nil
}

// Disconnect - close the Database connection
func (dbm *DBManager) Disconnect() error {
	if !dbm.isConnected {
		return IsDisconnectedError
	}
	dbm.isConnected = false
	return dbm.conn.Close()
}

// IsConnected - check the Database connection
func (dbm *DBManager) IsConnected() bool {
	return dbm.conn != nil && dbm.isConnected
}

// PopulateStruct - populate the struct with the csv data
func (dbm *DBManager) PopulateStruct(entries []model.Entry) error {

	// check the connection
	if !dbm.isConnected {
		return IsDisconnectedError
	}

	// batch insert product table
	_, err := dbm.conn.NamedExec(`INSERT IGNORE INTO product(id, name, price)
	VALUES(:product_id, :product_name, :price)`, entries)
	if err != nil {
		return err
	}
	log.Println(" - Product data added in Database")

	// batch insert client table
	_, err = dbm.conn.NamedExec(`INSERT IGNORE INTO client(id, name, surname)
	VALUES(:client_id, :name, :surname)`, entries)
	if err != nil {
		return err
	}
	log.Println(" - Client data added in Database")

	// batch insert order table
	_, err = dbm.conn.NamedExec(`INSERT IGNORE INTO orders(id, client_id, product_id, date) 
	VALUES(:order_id, :client_id, :product_id, :order_date)`, entries)
	if err != nil {
		return err
	}
	log.Println(" - Orders data added in Database")
	return nil
}
