package file

import (
	"errors"
	"os"
	"path/filepath" // check file extension
)

// InvalidFileExtensionError handle errors
var (
	InvalidFileExtensionError = errors.New("the file extension is not .csv")
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
		return InvalidFileExtensionError
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
