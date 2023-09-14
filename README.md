# Docker

### dev

run docker-compose up --build -d

### prod

in client folder run Dockerfile

## To load database backup

docker exec -it map-database bash

cd docker-entrypoint-initdb.d/

chmod +x restore.sh

./restore.sh
