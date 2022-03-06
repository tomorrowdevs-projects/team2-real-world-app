package handlefile

import (
	"bufio"
	"github.com/gocarina/gocsv"
	"log"
	"mime/multipart"
	"os"
	"path/filepath" // check file extension
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/helpers"
	"team2-real-world-app/server/pkg/model"
)

// define expected errors at the top

type NewHandleFile struct {
}

func NewFile() *NewHandleFile {
	return &NewHandleFile{} // to get the address or a pointer variable
}

// HandleFile populates struct from file
func (handleFile NewHandleFile) HandleFile(file multipart.File) ([]model.Entry, error) {

	/*/
	// check the file size
	status, err := handleFile.IsTheRightSize(filePath)
	if !status {
		return nil, ErrInvalidFileSize
	}

	file, err := os.Open(filePath)
	defer file.Close()

	if err != nil {
		return nil, err
	}
	*/

	// TODO
	// split file in x chunk and pass it to io.Reader
	fileReader := bufio.NewReader(file) // implements a buffered reader
	entries, err := handleFile.PopulateStruct(fileReader)
	if err != nil {
		return nil, err
	}
	log.Printf(" - Struct populated ")

	return entries, err
}

// IsCsvExtension - check if the file is a csv
func IsCsvExtension(filePath string) bool {
	return filepath.Ext(filePath) == ".csv"
}

// IsTheRightSize - check if the file size does not exceed the maximum allowed
func (handleFile NewHandleFile) IsTheRightSize(filePath string) (bool, error) {

	maxSize := 10 // max size of the file

	// FileInfo structure that describing file
	fileInfo, err := os.Stat(filePath)
	if err != nil {
		return false, err
	}

	fileSize := fileInfo.Size()
	fileGB := helpers.BytesToGB(fileSize)

	return int64(fileGB) < int64(maxSize), err
}

// PopulateStruct - save the file row into a struct
func (handleFile NewHandleFile) PopulateStruct(fileReader *bufio.Reader) ([]model.Entry, error) {

	var entries []model.Entry

	err := gocsv.Unmarshal(fileReader, &entries)

	if err != nil {
		return nil, err
	}
	return entries, nil
}

// ProcessFileUpload fills struct with csv entries, opens db connection and migrates entries to database
func ProcessFileUpload(file multipart.File) error {
	var newFile = NewFile()
	// filling struct with csv entries
	entries, err := newFile.HandleFile(file) // <---
	if err != nil {
		return model.ErrFileFormat
	}

	// opening db connection
	var db = dbmanager.NewDBManager()
	_, err = db.GetConnection()
	if err != nil {
		return model.ErrDbDisconnected
	}
	defer db.Disconnect() // close connection

	// populating db with saved entries
	err = db.PopulateFromStruct(entries)
	if err != nil {
		return model.ErrDbPopulation
	}

	return err
}
