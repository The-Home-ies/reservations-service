require('newrelic');
const compression = require('compression');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('../db/queries');

const app = express();
const port = 3002;

app.use(compression());
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true,
  })
);
app.use('/loaderio-0149e6d39b7b67e407ffe5bb88e6e425', express.static(path.join(__dirname, '..', 'loader')));
app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/api/listings/:id', db.getListing);
app.get('/api/listings/:id/reservations', db.getBookingsByListingId);
app.post('/bookings/:id', db.createBooking);
app.put('/bookings/:id', db.updateBooking);
app.delete('/bookings/:id', db.deleteBooking);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
