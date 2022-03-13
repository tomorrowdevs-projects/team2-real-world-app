package handlefile

import (
	"bufio"
	"log"
	"mime/multipart"
	"os"
	"path/filepath" // check file extension
	"strconv"
	"strings"
	dbmanager "team2-real-world-app/server/pkg/database"
	"team2-real-world-app/server/pkg/helpers"
	"team2-real-world-app/server/pkg/model"

	"github.com/gocarina/gocsv"
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

	// TODO - split file in x chunk and pass it to io.Reader

	scanner := bufio.NewScanner(file)

	var db = dbmanager.NewDBManager()
	log.Printf(" ▶ Try to connected ...\n")

	_, err := db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer db.Disconnect() // close connection

	log.Printf(" ▶ Database connected ✔ \n")

	var entries []model.Entry
	var entry model.Entry
	var parts []string
	var price float64

	countRow := 0
	counter := 1
	
	log.Println("population started")
	for scanner.Scan() {
		// populating db every time a struct is filled with 10000 rows  (TODO try different ones)
		if countRow == 10000 {
			counter += 1
			//println(counter, "\n")
			db.PopulateFromStruct(entries)
			// clearing struct
			entries = nil
			entries = []model.Entry{}
			// resetting counter
			countRow = 1
		} else {
			if countRow > 0 {
				// converting scanned line in slice
				strings.Split(scanner.Text(), ",")
				parts = strings.Split(scanner.Text(), ",")
				price, _ = strconv.ParseFloat(parts[6], 2)

				entry = model.Entry{
					OrderID:   parts[0],
					ClientID:  parts[1],
					Name:      parts[2],
					Surname:   parts[3],
					ProductID: parts[4],
					Product:   parts[5],
					Price:     price,
					Date:      parts[7]}

				entries = append(entries, entry)

				countRow = countRow + 1
				//fmt.Println(entries)
			} else {
				// skip header of the csv
				countRow = countRow + 1
			}
		}

	}

	// if err := scanner.Err(); err != nil {
	// 	log.Fatal(err)
	// }

	/*fileReader := bufio.NewReader(file) // implements a buffered reader
	entries, err := handleFile.PopulateStruct(fileReader)
	if err != nil {
		return nil, err
	}
	log.Printf(" - Struct populated ")*/


	log.Println("population ended")
	return nil, err
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
