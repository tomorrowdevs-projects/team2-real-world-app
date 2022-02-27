package helpers

import (
	"encoding/json"
)

// StructToJSON - encode a struct to JSON
func StructToJSON(v interface{}) ([]byte, error) {

	result, err := json.Marshal(v)
	if err != nil {
		return nil, err
	}

	return result, nil
}
