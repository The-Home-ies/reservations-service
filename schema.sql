DROP SCHEMA IF EXISTS reservations CASCADE;
CREATE SCHEMA reservations;

CREATE TABLE reservations.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70)
);

CREATE TABLE reservations.listings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70),
  max_guests INT NOT NULL,
  per_night INT NOT NULL,
  cleaning INT NOT NULL,
  service INT NOT NULL
);

CREATE TABLE reservations.bookings (
  id SERIAL PRIMARY KEY,
  reservation_id INT NOT NULL,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  adults INT,
  children INT,
  infants INT,
  listing_id INT REFERENCES reservations.listings(id) NOT NULL,
  user_id INT REFERENCES reservations.users(id)
);

