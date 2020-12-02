const mongoose = require('mongoose');
/*
 * Schemas
 */
const listingSchema = new mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  reserved: [Date],
  fees: {
    pernight: Number,
    cleaning: Number,
    service: Number,
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = {
  listingModel: Listing,
};
