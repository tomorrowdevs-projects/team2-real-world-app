package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"path/filepath"
	"team2-real-world-app/server/pkg/model"
)

func UploadFile(c *gin.Context) {
	/*
		- at the moment this api returns either 200 (upload is OK) or 400 (something went wrong)
		- there are a few lines of commented code to save the data in a Golang struct
	*/
	// retrieving csv file from form-data body of http request, key is "file"
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		formError := model.Error{ErrorType: "request form error", Message: "request form key not valid"}
		c.IndentedJSON(http.StatusBadRequest, formError)
	}
	defer file.Close()

	// logging successful reception of the file
	log.Println("file received: " + header.Filename)

	// file extension check (NOTE: temporarily here, will be externalized invoking check function)
	if filepath.Ext(header.Filename) != ".csv" {
		extensionError := model.Error{ErrorType: "file error", Message: "file extension must be .csv"}
		c.IndentedJSON(http.StatusBadRequest, extensionError)
	}

	//// uncomment this to save csv entries into struct Entry (NOTE: slow with millions entries)
	//var entries []model.Entry
	//err = gocsv.Unmarshal(file, &entries)
	//if err != nil {
	//	fileFormatError := model.Error{ErrorType: "file error", Message: "1 or more entries do not respect the db structure"}
	//	c.AbortWithStatusJSON(http.StatusBadRequest, fileFormatError)
	//}
	//log.Println("entries saved in struct !") // spew.Dump(entries) to show them
	//// **** TODO invoke function to write entries to DB ****

	// response status for successful upload
	c.Status(http.StatusOK)
}

//// **** code to open reader on file
//reader := csv.NewReader(file)
//var _ []string
//_, err = reader.Read()
//if err != nil {
//	fileReadingError := model.Error{ErrorType: "file error", Message: "unable to read the file content"}
//	c.IndentedJSON(http.StatusBadRequest, fileReadingError)
//}
//log.Println("successfully opened reader on received file")
