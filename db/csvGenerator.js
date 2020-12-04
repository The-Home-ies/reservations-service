const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const usersWriter = csvWriter();
const listingsWriter = csvWriter();
const bookingsWriter = csvWriter();

const getRandomNum = (min, max) => Math.floor((Math.random() * (max - min) ) + min);

const generateUsers = () => {
  usersWriter.pipe(fs.createWriteStream('users.csv'));
  for(let i = 0; i < 1000; i++) {
    usersWriter.write({
      id: i,
      name: faker.name.findName(),
    });
  }
  usersWriter.end();
  console.log('Users generated!');
};

const generateListings = () => {
  listingsWriter.pipe(fs.createWriteStream('listings.csv'));
  for (let i = 0; i < 1000; i++) {
    listingsWriter.write({
      id: i,
      name: faker.name.findName(),
      max_guests: getRandomNum(1, 17),
      max_stay: getRandomNum(2, 366),
      per_night: getRandomNum(50, 800),
      cleaning: getRandomNum(10, 100),
      service: getRandomNum(20, 100),
    });
  }
  listingsWriter.end();
  console.log('Listings generated!');
};

// const generateBookings = () => {
//   bookingsWriter.pipe(fs.createWriteStream('./csv/bookings.csv'));
//   for (let i = 0; i < 1000; i += 1) {
//     bookingsWriter.write({
//       id: i + 1,
//       checkin: ,
//       checkout: ,
//       adults: getRandomNum(1, 4),
//       children: getRandomNum(1, 4),
//       infants: getRandomNum(1, 4),
//       total_cost: ,
//       listing_id: i,
//       user_id: ,
//     });
//   }
// };
//

const dataGenerator = async () => {
  await generateUsers();
  await generateListings();
};

dataGenerator();
