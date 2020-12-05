#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
USER="meeko"

# if parameter 1 is not passed as argument default users to be generated is 10000000
# if parameter 2 is not passed as argument default listings to be generated is 1000000
USERS=${1:-10000000}
LISTINGS=${2:-1000000}

### Import Our Schema ###
SCHEMA="$DIR/db/postgres/schema.sql"
psql -U $USER < $SCHEMA

### Run Generator Script ###
node postgresGenerator.js --users=$USERS --listings=$LISTINGS

USERSFP="$DIR/csv/postgres/users.csv"
LISTINGSFP="$DIR/csv/postgres/listings.csv"
BOOKINGSFP="$DIR/csv/postgres/bookings.csv"

### Import .csv files to seed Database ###
psql -U $USER -c "\copy reservations.users(id,name) FROM '$USERSFP' CSV HEADER"
psql -U $USER -c "\copy reservations.listings(id,name,max_guests,max_stay,review_count,per_night,cleaning,service) FROM '$LISTINGSFP' CSV HEADER"
psql -U $USER -c "\copy reservations.bookings(id,name,checkin,checkout,adults,children,infants,total_cost,listing_id,user_id) FROM '$BOOKINGSFP' CSV HEADER"
