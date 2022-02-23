package file

import (
	"bufio"
	"errors"
	"fmt"
	"github.com/gocarina/gocsv"
	"os"
	"path/filepath" // check file extension
	helpers "team2-real-world-app/server/pkg/helpers"
	model "team2-real-world-app/server/pkg/model"
)

var (
	ErrInvalidFileExtension = errors.New("the file extension is not .csv")
	ErrInvalidFileSize      = errors.New("the file size exceeds the maximum allowed")
)

// TEMPORARY struct Entry global var
var entries []model.Entry

type ImportFile struct {
	//fileSplitted type
}

func NewImportFile() *ImportFile {
	return &ImportFile{} // to get the address or a pointer variable
}

//
func (importFile ImportFile) SplitFile(filePath string) error {

	if !importFile.isCsvExtension(filePath) { // check file extension
		return ErrInvalidFileExtension
	}

	status, err := importFile.isTheRightSize(filePath)
	if !status {
		return ErrInvalidFileSize
	}

	file, err := os.Open(filePath)
	defer file.Close()

	if err != nil {
		// TO DO
		// handle error
		return err
	}

	// TO DO
	// split file in x chunk and pass it to io.Reader
	fileReader := bufio.NewReader(file) // implements a buffered reader
	err = importFile.populateStruct(fileReader)
	if err != nil {
		return err
	}
	fmt.Println("struct populated")

	fmt.Println(entries)
	return nil
}

// check if the file is a csv
func (importFile ImportFile) isCsvExtension(filePath string) bool {
	return filepath.Ext(filePath) == ".csv"
}

// check if the file size does not exceed the maximum allowed
func (importFile ImportFile) isTheRightSize(filePath string) (bool, error) {

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

// save the file row into a struct
func (importFile ImportFile) populateStruct(fileReader *bufio.Reader) error {

	err := gocsv.Unmarshal(fileReader, &entries)

	if err != nil {
		// handle returned errors
		return err
	}
	return err
}
