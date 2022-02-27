package helpers

type Credentials struct {
	UserName string
	Password string
	Host     string
	Port     int
	DbName   string
}

// GetCredentials - TEMPORARY
// will implement a better way to get credentials from the ENV
func GetCredentials() Credentials {

	credentials := Credentials{
		UserName: "root",
		Password: "root",
		Host:     "localhost",
		Port:     3306,
		DbName:   "test_db",
	}

	return credentials
}
