CREATE KEYSPACE reservations WITH replication =
{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TYPE reservations.fees (
  per_night int,
  cleaning int,
  service int 
);

CREATE TYPE reservations.guests (
  adults int,
  children int,
  infants int 
);

CREATE TABLE reservations.listings (
  listing_id int,
  name text,
  max_guests int,
  max_stay int,
  fees frozen<fees>,
  PRIMARY KEY (listing_id))
WITH comment = 'Q1. Find information about a listing';

CREATE TABLE reservations.reservations_by_listing (
  listing_id int,
  reservation_id int,
  user_id int,
  name text,
  checkin date,
  checkout date,
  guests frozen<guests>,
  total_cost decimal,
  PRIMARY KEY (listing_id))
WITH comment = 'Q2. Find all reservations by listing id';

CREATE TABLE reservations.bookings (
  reservation_id int,
  listing_id int,
  user_id int,
  name text,
  checkin date,
  checkout date,
  guests frozen<guests>,
  total_cost decimal,
  PRIMARY KEY (reservation_id))
WITH comment = 'Q3. Find reservation by reservation id';
