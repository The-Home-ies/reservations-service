const pool = require('../config/pool.js');

const getBookingsByListingId = (req, res) => {
  const listingId = parseInt(req.params.id);
  pool.query(
    'SELECT * FROM bookings WHERE listing_id = $1',
    [listingId],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
};

const createBooking = (req, res) => {
  const { name, checkin, checkout, adults, children, infants, total_cost, user_id } = req.body;
  const listingId = parseInt(req.params.id);

  pool.query(
    "INSERT INTO bookings (name, checkin, checkout, adults, children, infants, total_cost, listing_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [ name, checkin, checkout, adults, children, infants, total_cost, listingId, user_id ], 
    (err, results) => {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
    });
}

const updateBooking = (req, res) => {
  const listingId = parseInt(req.params.id);
  const { name, checkin, checkout, adults, infants, children, total_cost, user_id } = req.body;

  pool.query(
    "UPDATE bookings SET name = $1, checkin = $2, checkout = $3, adults = $4, children = $5, infants = $6, total_cost = $7 WHERE user_id = $8",
    [ name, checkin, checkout, adults, children, infants, total_cost, user_id ], 
    (err, results) => {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
    });
};

const deleteBooking = (req, res) => {
  const reservationId = parseInt(req.params.id);

  pool.query(
    'DELETE FROM bookings WHERE id = $1', 
    [reservationId],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
    });
}

module.exports = {
  getBookingsByListingId,
  createBooking,
  updateBooking,
  deleteBooking,
};
