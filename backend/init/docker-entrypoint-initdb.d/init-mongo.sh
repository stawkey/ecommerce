#!/bin/bash
set -e

DB="${MONGO_INITDB_DATABASE:-leyndell}"
USER="${MONGO_INITDB_ROOT_USERNAME:-admin}"
PASS="${MONGO_INITDB_ROOT_PASSWORD:-example}"

BASE_ARGS="--db $DB --username $USER --password $PASS --authenticationDatabase admin --jsonArray --drop"

echo "Waiting for MongoDB to start..."
sleep 5

echo "Importing categories..."
mongoimport $BASE_ARGS --collection categories --file /docker-entrypoint-initdb.d/categories.json

echo "Importing products..."
mongoimport $BASE_ARGS --collection products --file /docker-entrypoint-initdb.d/products.json

echo "Importing featuredproducts..."
mongoimport $BASE_ARGS --collection featuredproducts --file /docker-entrypoint-initdb.d/featuredproducts.json

echo "All imports done."