const mongoose = require('mongoose');
/*
 * Schemas
 */
const listingSchema = new mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  reserved: [{type: Schema.Types.ObjectId, ref: 'Reservation'}],
  fees: {
    pernight: Number,
    cleaning: Number,
    service: Number,
  },
});

const reservationSchema = new mongoose.Schema({
  id: Number,
  reservationId: Number,
  name:  String,
  checkin:  Date,
  checkout:  Date,
  adults:  Number,
  children:  Number,
  infants:  Number,
});

const Listing = mongoose.model('Listing', listingSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = {
  listingModel: Listing,
  reservationModel: Reservation,
};
