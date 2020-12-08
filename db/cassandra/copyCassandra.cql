USE bookings;

COPY reservations (reservation_id, adults, checkin, checkout, children, infants, listing_id, name, total_cost, user_id) FROM './csv/cassandra/reservations.csv' with delimiter=',' and header=true and maxattempts=10;

COPY users (user_id, name) FROM './csv/cassandra/users.csv' with delimiter=',' and header=true and maxattempts=10;

COPY listings (listing_id, cleaning, max_guests, max_stay, name, per_night, review_count, service) FROM './csv/cassandra/listings.csv' with delimiter=',' and header=true and maxattempts=10;

COPY reservations_by_listing (listing_id, reservation_id, adults, checkin, checkout, children, infants, name, total_cost, user_id) FROM './csv/cassandra/reservations_by_listing.csv' with delimiter=',' and header=true and maxattempts=10;

