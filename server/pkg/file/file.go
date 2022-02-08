package file

import (
	"errors"
	"fmt"
	"os"
	"path/filepath" // check file extension
)

// handle errors
var (
	ErrInvalidFileExtension = errors.New("the file extension is not .csv")
)

//
type HandleFile struct {
	//fileSplitted type
}

func GetHandleFile() *HandleFile {
	return &HandleFile{} // to get the address or a pointer variable
}

// for local testing, waiting to understand type of passed file
func (handleFile HandleFile) SplitFile(filePath string) error {

	if !handleFile.isCsvExtension(filePath) { // check file extension
		return ErrInvalidFileExtension
	}

	csvFile, err := os.Open(filePath)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened CSV file")

	// close inside or out?
	defer csvFile.Close()
	return nil
}

// check if the file is a csv
func (handleFile HandleFile) isCsvExtension(filePath string) bool {
	fileExtension := filepath.Ext(filePath)

	if fileExtension == ".csv" {
		return true
	}
	return false
}
