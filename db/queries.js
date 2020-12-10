const pool = require('../config/pool.js');

const getBookingsByListingId = (req, res) => {
  const listingId = parseInt(req.params.id);
  pool.query('SELECT * FROM bookings WHERE listing_id = $1', [listingId],(err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const createBooking = (req, res) => {
  const { name, checkin, checkout, adults, infants, children, total_cost, listing_id, user_id } = req.body;

  pool.query('INSERT INTO bookings (name, checkin, checkout, adults, infants, children, total_cost, listing_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [ name, checkin, checkout, adults, infants, children, total_cost, listing_id, user_id ], (err, results) => {
    if (err) {
      throw err;
    }
    res.sendStatus(201);
  })
}

module.exports = {
  getBookingsByListingId,
  createBooking,
};
