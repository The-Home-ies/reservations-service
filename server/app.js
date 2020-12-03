/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Helpers = require('../db/models.js');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/api/listings/', (req, res) => {
  Helpers.listingModel.find()
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});

app.get('/api/listings/:id', (req, res) => {
  Helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});

app.post('/api/listings/:id/newReservation', (req, res) => {
  Helpers.reservationModel.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});

// app.delete('/api/listings/:id', (req, res) => {
//   Helpers.listingModel.deleteOne({ id: req.params.id })
//     .then(() => res.sendStatus(200))
//     .catch(() => res.sendStatus(404));
// });

// app.put('/api/listing/:id', (req, res) => {
//   Helpers.listingModel.findOneAndUpdate({ id: req.params.id }, (err) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

module.exports = app;
