CREATE KEYSPACE bookings WITH replication =
{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TYPE bookings.fees (
  per_night int,
  cleaning int,
  service int 
);

CREATE TYPE bookings.guests (
  adults int,
  children int,
  infants int 
);

CREATE TABLE bookings.listings (
  listing_id int,
  name text,
  max_guests int,
  max_stay int,
  review_count int,
  fees frozen<fees>,
  PRIMARY KEY (listing_id))
WITH comment = 'Q1. Find information about a listing';

CREATE TABLE bookings.reservations_by_listing (
  listing_id int,
  reservation_id uuid,
  user_id int,
  name text,
  checkin text,
  checkout text,
  guests frozen<guests>,
  total_cost decimal,
  PRIMARY KEY (listing_id))
WITH comment = 'Q2. Find all bookings / specific booking by listing id';

/* CREATE TABLE bookings.reservation ( */
/*   reservation_id int, */
/*   listing_id int, */
/*   user_id int, */
/*   name text, */
/*   checkin date, */
/*   checkout date, */
/*   guests frozen<guests>, */
/*   total_cost decimal, */
/*   PRIMARY KEY (reservation_id)) */
/* WITH comment = 'Q3. Find reservation by reservation id'; */
