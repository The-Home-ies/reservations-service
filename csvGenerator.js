const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
require('events').EventEmitter.defaultMaxListeners = 100000;

const usersWriter = csvWriter();
const listingsWriter = csvWriter();
const bookingsWriter = csvWriter();

const getRandomNum = (min, max) => Math.floor((Math.random() * (max - min) ) + min);

const generateUsers = () => {
  usersWriter.pipe(fs.createWriteStream('./csv/users.csv'));
  for(let i = 1; i <= 1000; i++) {
    usersWriter.write({
      id: i,
      name: faker.name.findName(),
    });
  }
  usersWriter.end();
  console.log('Users generated!');
};

const generateListings = () => {
  listingsWriter.pipe(fs.createWriteStream('./csv/listings.csv'));
  let reservationId = 0;
  const startDate = new Date();
  for (let i = 1; i <= 1000; i++) {
    const listingInfo = {
      id: i,
      name: faker.name.findName(),
      max_guests: getRandomNum(1, 17),
      max_stay: getRandomNum(2, 32),
      review_count: getRandomNum(10, 501),
      per_night: getRandomNum(50, 801),
      cleaning: i % 3 === 0 ? getRandomNum(10, 101) : 0,
      service: getRandomNum(20, 101),
    }
    listingsWriter.write(listingInfo);
    generateBookings(reservationId + 1, listingInfo.review_count, startDate, listingInfo);
    reservationId += listingInfo.review_count;
  }
  listingsWriter.end();
  console.log('Listings and bookings generated!');
};

 const generateBookings = (startingId, reviewCount, startDate, listingInfo) => {
   bookingsWriter.pipe(fs.createWriteStream('./csv/bookings.csv'));

   const calculateDate = (date, days) => {
     let resultDate = new Date(date);
     resultDate.setDate(resultDate.getDate() + days);
     return resultDate;
   };

   let checkin = startDate;
   for (let i = 0; i <= reviewCount; i++) {
     let maxGuests = listingInfo.max_guests;
     const adults = getRandomNum(1, maxGuests);
     maxGuests -= adults;
     const children = maxGuests ? getRandomNum(1, maxGuests) : 0; 
     maxGuests -= children;
     const infants = maxGuests ? getRandomNum(1, maxGuests) : 0; 
     const stayLength = getRandomNum(1, listingInfo.max_stay + 1);
     checkin = calculateDate(startDate, getRandomNum(1, 8));

     bookingsWriter.write({
       id: startingId + i,
       checkin,
       checkout: calculateDate(checkin, getRandomNum(1, listingInfo.max_stay + 1)),
       adults,
       children,
       infants,
       total_cost: (listingInfo.per_night * stayLength) + listingInfo.cleaning + listingInfo.service,
       listing_id: listingInfo.id,
       user_id: getRandomNum(1, 1000),
     }, () => { bookingsWriter.end() });
     checkin = calculateDate(checkin, stayLength);
   }
   
 };

async function dataGenerator() {
  await generateUsers();
  await generateListings();
  await generateBookings();
}

dataGenerator();
