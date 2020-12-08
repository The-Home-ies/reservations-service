CREATE KEYSPACE IF NOT EXISTS bookingsudt 
WITH replication = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

CREATE TYPE bookingsudt.fees (
  per_night int,
  cleaning int,
  service int 
);

CREATE TYPE bookingsudt.guests (
  adults int,
  children int,
  infants int 
);

CREATE TABLE bookingsudt.users (
  user_id int,
  name text,
  PRIMARY KEY (user_id))
WITH comment = 'Find user by id';

CREATE TABLE bookingsudt.listings (
  listing_id int,
  fees frozen<fees>,
  max_guests int,
  max_stay int,
  name text,
  review_count int,
  PRIMARY KEY (listing_id))
WITH comment = 'Find information about a listing';

CREATE TABLE bookingsudt.reservations (
  reservation_id int,
  checkin text,
  checkout text,
  guests frozen<guests>,
  listing_id int,
  name text,
  total_cost decimal,
  user_id int,
  PRIMARY KEY (reservation_id))
WITH comment = 'Find reservation by id';

CREATE TABLE bookingsudt.reservations_by_listing (
  listing_id int,
  reservation_id int,
  checkin text,
  checkout text,
  guests frozen<guests>,
  name text,
  total_cost decimal,
  user_id int,
  PRIMARY KEY (listing_id, reservation_id))
WITH comment = 'Find all bookingsudt / specific booking by listing id';
