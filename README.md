# Project Name
> SDC
## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [CRUD Operations](#CRUD)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## CRUD Operations

  ### Reservations

  #### Create / POST
  **Endpoint**
    - /listings/:ids
  **Path params**
    - id
  **Request body**
    - {
        id: Number,
        owner: String,
        name: String,
        reserved: [Date],
        fees: {
         pernight: Number,
         cleaning: Number,
         service: Number,
        }
      }
  **Response object**
    - HTTP Status Code 200

  #### Read / GET
  1. Endpoint
    - /listings/:id
  2. Path params
    - id
  3. Request body
    - {id: number}
  4. Response object
    - {
        id: Number,
        owner: String,
        name: String,
        reserved: [Date],
        fees: {
         pernight: Number,
         cleaning: Number,
         service: Number,
        }
      }

  #### Update / PUT - Update reservation date
  1. Endpoint
    - /listings/:id
  2. Path params
    - id
  3. Request body
    - {
      }
  4. Response object
    - HTTP Status Code 200

  #### Delete / DELETE - Delete Reservation
  1. Endpoint
    - /listings/:id
  2. Path params
    - id
  3. Request body
    - {id: number}
  4. Response object
    - HTTP Status Code 200

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

