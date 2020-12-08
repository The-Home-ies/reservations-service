#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
USER="meeko"
KEYSPACE="bookings"

# if parameter 1 is not passed as argument default users to be generated is 10000000
# if parameter 2 is not passed as argument default listings to be generated is 1000000
USERS=${1:-10000000}
LISTINGS=${2:-1000000}

### Import the Schema ###
SCHEMA="$DIR/db/cassandra/schema.cql"
cqlsh -e "SOURCE ./db/cassandra/schema.cql"

### Run Generator Script ###
node cassandraGenerator.js --users=$USERS --listings=$LISTINGS

### Connect to Cassandra ###
USERSFP="$DIR/csv/cassandra/users.csv"
LISTINGSFP="$DIR/csv/cassandra/listings.csv"
BOOKINGSFP="$DIR/csv/cassandra/bookings.csv"
cqlsh
use $KEYSPACE;

### Import .csv files to seed Database ###
"COPY users(id,name) FROM '$USERSFP' WITH HEADER=true AND DELIMITER=','"
"COPY listings(id,name,max_guests,max_stay,review_count,per_night,cleaning,service) FROM '$LISTINGSFP' WITH HEADER=true AND DELIMITER=','"
"COPY bookings(id,name,checkin,checkout,adults,children,infants,total_cost,listing_id,user_id) FROM '$BOOKINGSFP'WITH HEADER=true AND DELIMITER=','"
