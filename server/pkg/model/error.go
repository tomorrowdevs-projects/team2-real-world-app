package model

import "errors"

const UploadErrorMessage = "file upload error"
const ExtensionErrorMessage = "the file extension is not .csv"
const SizeErrorMessage = "the file size exceeds the maximum allowed"
const FormatErrorMessage = "csv format error"
const DbDisconnectedMessage = "db disconnected error"
const DbAlreadyConnectedMessage = "database already connected"
const DbPopulationMessage = "unable to populate db"
const DateRangeMessage = "invalid date query"

var (
	ErrInvalidFileExtension = errors.New(ExtensionErrorMessage)
	ErrInvalidFileSize      = errors.New(SizeErrorMessage)
	ErrFileFormat           = errors.New(FormatErrorMessage)
	ErrFileUpload           = errors.New(UploadErrorMessage)
	ErrDbDisconnected       = errors.New(DbDisconnectedMessage)
	ErrDbAlreadyConnected   = errors.New(DbAlreadyConnectedMessage)
	ErrDbPopulation         = errors.New(DbPopulationMessage)
	ErrInvalidDateQuery     = errors.New(DateRangeMessage)
)
