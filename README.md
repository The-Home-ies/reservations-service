# Ailpup

### Frontend Developer: Chris Diep

Reservations component for a vacation rental marketplace site
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/WholeSite.png" height="450">
</div>
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/CalendarComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/FeesComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/GuestsComponent.png" height="275">
</div>

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [CRUD Operations](#CRUD)

## Usage

- Access the individual component through http://18.217.62.125:3002/listings/5/
- Access the site in whole through http://3.20.233.115:3000/5/
- Change listings by modifying the numerical value after the site, e.g. from http://3.20.233.115:3000/5/ to http://3.20.233.115:3000/10/

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run seed
npm run server
npm run build
```

### Backend Developer: Meeko Rusdi

# CRUD Operations

  ## Reservations

### Add new listing
  > Create / POST
  - Allows you to create a listing for a property
  1. Endpoint
    - /api/listings
  2. Request body
  ```json
      {
        "id": "Number",
        "name": "String",
        "maxGuests": "Number",
        "fees": {
          "pernight": "Number",
          "cleaning": "Number",
          "service": "Number"
        }
      }
  ```
  3. Response object
    - HTTP Status Code 201

### Add new reservation
  > Create / POST
  - Allows you to create a reservation for specified dates, number of adults, children, and infants
  1. Endpoint
    - /api/listings/:id
  2. Path params
    - `id` - listing ID
  3. Request body
  ```json
      {
        "id": "Number",
        "reservation_id": "Number",
        "name": "String",
        "checkin": "Date",
        "checkout": "Date",
        "adults": "Number",
        "children": "Number",
        "infants": "Number"
      }
  ```
  4. Response object
    - HTTP Status Code 201

### Retrieve Listings
  > Read / GET
  1. Endpoint
    - /api/listings
  2. Response object - Array of JSON objects representing available listings
  ```json
      [{
        "id": "Number",
        "name": "String",
        "maxGuests": "Number",
        "fees": {
          "pernight": "Number",
          "cleaning": "Number",
          "service": "Number"
        }
      }...]
  ```
### Retrieve reservation data for one listing
  > Read / GET
  - Allows you to get reservation data from a listing
  1. Endpoint
    - /api/listings/:id/:reservationId
  2. Path params
    - `id` - listing ID
    - `reservationId` - reservation ID
  3. Response object
  ```json
      {
        "id": "Number",
        "name": "String",
        "fees": {
         "pernight": "Number",
         "cleaning": "Number",
         "service": "Number"
        }
      }
  ```

### Update listing info
  > Update / PUT
  - Allows you to update listing info
  1. Endpoint
    - /api/listings/:id
  2. Path params
    - `id` - listing ID
  3. Request body - Expects JSON with any of the following keys (include only keys to be updated)
  ```json
      {
        "reservationId": "Number",
        "name": "String",
        "checkin": "Date",
        "checkout": "Date",
        "adults": "Number",
        "children": "Number",
        "infants": "Number"
      }
  ```
  4. Response object
    - HTTP Status Code 200

### Delete Listing
  > Delete / DELETE 
  - Allows you to delete a Listing
  1. Endpoint
    - /api/listings/:id
  2. Path params
    - `id` - listing ID
  3. Response object
    - HTTP Status Code 204

### Delete A Reservation
  > Delete / DELETE 
  - Allows you to delete a reservation from a listing at a specific reservation ID
  1. Endpoint
    - /api/reservation/:id
  2. Path params
    - `id` - reservation ID
  3. Response object
    - HTTP Status Code 204
