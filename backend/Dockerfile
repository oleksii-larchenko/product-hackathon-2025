FROM golang:1.25.4-alpine AS build

WORKDIR /app

COPY ../go.mod ./
COPY ../go.sum ./

RUN apk add git

RUN go mod download

COPY .. ./

RUN go build -o ./backend ./cmd

FROM alpine AS prod

COPY --from=build /app/backend /

EXPOSE 8080

ENTRYPOINT ["/backend"]