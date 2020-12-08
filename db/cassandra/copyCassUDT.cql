USE bookingsudt;

COPY reservations (reservation_id, adults, checkin, checkout, children, infants, listing_id, name, total_cost, user_id) FROM './csv/cassandra/udt/reservations.csv' with delimiter=',' and header=true and maxattempts=10;

COPY users (user_id, name) FROM './csv/cassandra/udt/users.csv' with delimiter=',' and header=true and maxattempts=10;

COPY listings (listing_id, fees, max_guests, max_stay, name, review_count) FROM './csv/cassandra/udt/listings.csv' with delimiter=',' and header=true and maxattempts=10;

COPY reservations_by_listing (listing_id, reservation_id, checkin, checkout, guests, name, total_cost, user_id) FROM './csv/cassandra/udt/reservations_by_listing.csv' with delimiter=',' and header=true and maxattempts=10;
