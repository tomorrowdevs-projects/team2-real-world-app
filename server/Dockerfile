FROM golang:1.17-alpine3.14

WORKDIR /server

COPY go.mod .
COPY go.sum .

RUN go mod tidy

COPY . .

EXPOSE 8080

CMD ["go", "run", "main.go"]