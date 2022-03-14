FROM golang:1.16-alpine

ADD . /server
WORKDIR /server

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /docker-gs-ping

EXPOSE 8080

CMD [ "/docker-gs-ping" ]



# FROM golang:1.17-alpine3.14

# WORKDIR /server

# COPY go.mod .
# COPY go.sum .

# RUN go mod tidy

# COPY . .

# EXPOSE 8080

# CMD ["go", "run", "main.go"]