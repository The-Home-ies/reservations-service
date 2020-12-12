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

app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/:id', db.getBookingsByListingId);
app.post('/bookings/:id', db.createBooking);
app.put('/bookings/:id', db.updateBooking);
app.delete('/bookings/:id', db.deleteBooking);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
