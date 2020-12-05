DROP DATABASE IF EXISTS reservations;
CREATE DATABASE reservations;

\c reservations;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70)
);

DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70),
  max_guests INT NOT NULL,
  max_stay INT NOT NULL,
  review_count INT,
  per_night INT NOT NULL,
  cleaning INT NOT NULL,
  service INT NOT NULL
);

DROP TABLE IF EXISTS bookings;

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70),
  checkin VARCHAR(70),
  checkout VARCHAR(70),
  adults INT,
  children INT,
  infants INT,
  total_cost INT,
  listing_id INT REFERENCES listings(id) NOT NULL,
  user_id INT REFERENCES users(id)
);

