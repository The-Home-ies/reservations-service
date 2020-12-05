#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
USER="meeko"

# if parameter 1 is not passed as argument default records to be generated to 1000000
USERS=${1:-10000000}
LISTINGS=${1:-1000000}

### Import Our Database ###
SCHEMA="$DIR/db/postgres/schema.sql"
psql -U $USER < $SCHEMA

### Run Our Generator Script ###
node csvGenerator.js --users=$USERS --listings=$LISTINGS
USERSFP="$DIR/csv/users.csv"
LISTINGSFP="$DIR/csv/listings.csv"
BOOKINGSFP="$DIR/csv/bookings.csv"
### Import Our posts.csv file to seed Database ###
cat $DIR/csv/*.csv | psql -U $USER -c 'COPY from stdin CSV HEADER'
# psql -U $USER -d -c "COPY users FROM '$USERSFP' CSV HEADER"
