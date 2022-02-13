package file

import (
	"errors"
	"os"
	"path/filepath" // check file extension
	helpers "team2-real-world-app/server/pkg/helpers"
)

// InvalidFileExtensionError handle errors
var (
	ErrInvalidFileExtension = errors.New("the file extension is not .csv")
	ErrInvalidFileSize      = errors.New("the file size exceeds the maximum allowed")

)

type ImportFile struct {
	//fileSplitted type
}

func NewImportFile() *ImportFile {
	return &ImportFile{} // to get the address or a pointer variable
}

// SplitFile for local testing, waiting to understand type of passed file
func (importFile ImportFile) SplitFile(filePath string) error {


	if !importFile.isCsvExtension(filePath) { // check file extension
		return ErrInvalidFileExtension
	}

	if !importFile.isTheRightSize(filePath) {
		return ErrInvalidFileSize
	}


	csvFile, err := os.Open(filePath)
	defer func(csvFile *os.File) error {
		return csvFile.Close()
	}(csvFile)

	if err != nil {
		return err
	}

	return nil
}

// check if the file is a csv
func (importFile ImportFile) isCsvExtension(filePath string) bool {
	return filepath.Ext(filePath) == ".csv"
}

// check if the file size does not exceed the maximum allowed
func (importFile ImportFile) isTheRightSize(filePath string) bool {

	maxSize := 10 // max size of the file

	info, err := os.Stat(filePath) // returns the FileInfo structure describing file.

	// what is the best way to handle err this situations?
	if err != nil {
		//return err
	}

	fileSize := info.Size()
	fileGB := helpers.BytesToGB(fileSize)

	return int64(fileGB) < int64(maxSize)
}
