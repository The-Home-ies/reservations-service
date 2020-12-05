const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const debug = require('debug')('app:gen:psql');
const argv = require('yargs').argv;
require('events').EventEmitter.defaultMaxListeners = 1000000;

const getRandomNum = (min, max) => Math.floor((Math.random() * (max - min) ) + min);

const users = argv.users;
const writeUsers = fs.createWriteStream('./csv/postgres/users.csv');
writeUsers.write('id,name\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = users || 10000000;
  let id = 0;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const name = faker.name.findName();
      const data = `${id},${name}\n`;
      if (i === 0) {
       writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

const listings = argv.listings;
const writeListings = fs.createWriteStream('./csv/postgres/listings.csv');
writeListings.write('id,name,max_guests,max_stay,review_count,per_night,cleaning,service\n', 'utf8');

function writeOneMillionListings(writer, encoding, callback) {
  let i = listings || 1000000;
  let id = 0;
  write();
  async function write() {
    let ok = true;
    let reservationId = 1;
    const startDate = new Date();
    do {
      i--;
      id++;
      const listingInfo = {
        id,
        name: faker.name.findName(),
        max_guests: getRandomNum(1, 17),
        max_stay: getRandomNum(2, 32),
        review_count: getRandomNum(10, 100),
        per_night: getRandomNum(50, 801),
        cleaning: i % 3 === 0 ? getRandomNum(10, 101) : 0,
        service: getRandomNum(20, 101),
      };
      const data = `${listingInfo.id},${listingInfo.name},${listingInfo.max_guests},${listingInfo.max_stay},${listingInfo.review_count},${listingInfo.per_night},${listingInfo.cleaning},${listingInfo.service}\n`;
      await generateBookings(reservationId, listingInfo.review_count, startDate, listingInfo);
      reservationId += listingInfo.review_count + 1;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

const writeBookings = fs.createWriteStream('./csv/postgres/bookings.csv');
writeBookings.write('id,name,checkin,checkout,adults,children,infants,total_cost,listing_id,user_id\n', 'utf8');

 const generateBookings = (startingId, reviewCount, startDate, listingInfo) => {

   const calculateDate = (date, days) => {
     let resultDate = new Date(date);
     resultDate.setDate(resultDate.getDate() + days);
     return resultDate.toString();
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
     const bookingInfo = {
       id: startingId + i,
       name: faker.name.findName(),
       checkin,
       checkout: calculateDate(checkin, getRandomNum(1, listingInfo.max_stay + 1)),
       adults,
       children,
       infants,
       total_cost: (listingInfo.per_night * stayLength) + listingInfo.cleaning + listingInfo.service,
       listing_id: listingInfo.id,
       user_id: getRandomNum(1, 1000000),
     };
     const data = `${bookingInfo.id},${bookingInfo.name},${bookingInfo.checkin},${bookingInfo.checkout},${bookingInfo.adults},${bookingInfo.children},${bookingInfo.infants},${bookingInfo.total_cost},${bookingInfo.listing_id},${bookingInfo.user_id}\n`;
     writeBookings.write(data, 'utf8');
     checkin = calculateDate(checkin, stayLength);
   }
 };

function generateData() {
  debug('start');
  writeTenMillionUsers(writeUsers, 'utf8', () => { writeUsers.end(); });
  writeOneMillionListings(writeListings, 'utf8', () => { writeListings.end(); debug('done'); });
};

generateData();
