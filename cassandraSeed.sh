#!/bin/bash
 
######################################################
# Bash script to generate CSV files and seed database
######################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# if parameter 1 is not passed as argument default users to be generated is 10000000
# if parameter 2 is not passed as argument default listings to be generated is 1000000
USERS=${1:-10000000}
LISTINGS=${2:-1000000}

### Run Generator Script ###
node cassandraGenerator.js --users=$USERS --listings=$LISTINGS

### Run Cassandra Copy File ###
cqlsh -f ./db/cassandra/copyCassandra.cql
