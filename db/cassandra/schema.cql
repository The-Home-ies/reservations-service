CREATE KEYSPACE IF NOT EXISTS bookings 
WITH replication = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

CREATE TABLE bookings.users (
  user_id int,
  name text,
  PRIMARY KEY (user_id))
WITH comment = 'Find user by id';

CREATE TABLE bookings.listings (
  listing_id int,
  cleaning int,
  max_guests int,
  max_stay int,
  name text,
  per_night int,
  review_count int,
  service int, 
  PRIMARY KEY (listing_id))
WITH comment = 'Find information about a listing';

CREATE TABLE bookings.reservations (
  reservation_id int,
  adults int,
  checkin text,
  checkout text,
  children int,
  infants int, 
  listing_id int,
  name text,
  total_cost decimal,
  user_id int,
  PRIMARY KEY (reservation_id))
WITH comment = 'Find reservation by id';

CREATE TABLE bookings.reservations_by_listing (
  listing_id int,
  reservation_id int,
  adults int,
  checkin text,
  checkout text,
  children int,
  infants int,
  name text,
  total_cost decimal,
  user_id int,
  PRIMARY KEY (listing_id, reservation_id))
WITH comment = 'Find all bookings / specific booking by listing id';

