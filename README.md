# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Docker

run docker-compose up --build -d

### To load database backup

docker exec -it map-database bash

cd docker-entrypoint-initdb.d/

chmod +x restore.sh

./restore.sh