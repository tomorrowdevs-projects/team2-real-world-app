package file

import (
	"errors"
	"fmt"
	"os"
	"path/filepath" // check file extension
	helpers "team2-real-world-app/server/pkg/helpers"
)

// handle errors
var (
	ErrInvalidFileExtension = errors.New("the file extension is not .csv")
	ErrInvalidFileSize      = errors.New("the file size exceeds the maximum allowed")
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

	if !handleFile.isCsvExtension(filePath) {
		return ErrInvalidFileExtension
	}

	if !handleFile.isTheRightSize(filePath) {
		return ErrInvalidFileSize
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

// check if the file size does not exceed the maximum allowed
func (handleFile HandleFile) isTheRightSize(filePath string) bool {
	// max size of the file
	maxSize := 10

	info, err := os.Stat(filePath)
	if err != nil {
	}

	fileSize := info.Size()

	fileGB := helpers.BytesToGB(fileSize)

	if int64(fileGB) < int64(maxSize) {
		return true
	}
	return false

}
