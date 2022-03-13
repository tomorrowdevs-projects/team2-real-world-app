package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"path/filepath"
	"team2-real-world-app/server/pkg/handle_file"
	"team2-real-world-app/server/pkg/model"
)

func UploadFile(c *gin.Context) {
	// retrieving csv file from form-data body of http request, key is "file"
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.ErrFileUpload.Error())
		return
	}
	defer file.Close()

	log.Println("file received: " + header.Filename)

	// file extension check
	if !handlefile.IsCsvExtension(filepath.Ext(header.Filename)) {
		c.AbortWithStatusJSON(http.StatusBadRequest, model.ErrInvalidFileExtension.Error())
		return
	}

	// processing csv: saves entries in struct, opens db connection and migrates struct to db
	//err = handlefile.ProcessFileUpload(file)
	var newFile = handlefile.NewFile()
	_, err = newFile.HandleFile(file)
	if err != nil {
		return
	}

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}

	// response status for successful upload
	c.Status(http.StatusOK)
}
