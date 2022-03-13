FROM golang:1.17

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN go build -v -o /usr/local/bin/app ./...

EXPOSE 8080

CMD ["app"]



# FROM golang:1.17-alpine3.14

# WORKDIR /server

# COPY go.mod .
# COPY go.sum .

# RUN go mod tidy

# COPY . .

# EXPOSE 8080

# CMD ["go", "run", "main.go"]