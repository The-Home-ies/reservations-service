USE bookings;

COPY reservations (reservation_id, checkin, checkout, guests, listing_id, name, total_cost, user_id) FROM './csv/cassandra/reservations.csv' with delimiter=',' and header=true and maxattempts=10;

COPY users (user_id, name) FROM './csv/cassandra/users.csv' with delimiter=',' and header=true and maxattempts=10;

COPY listings (listing_id, fees, max_guests, max_stay, name, review_count) FROM './csv/cassandra/listings.csv' with delimiter=',' and header=true and maxattempts=10;

COPY reservations_by_listings (listing_id, reservation_id, checkin, checkout, guests, listing_id, name, total_cost, user_id) FROM './csv/cassandra/reservationsByListings.csv' with delimiter=',' and header=true and maxattempts=10;
