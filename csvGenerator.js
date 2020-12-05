const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const debug = require('debug')('app:gen:psql');
require('events').EventEmitter.defaultMaxListeners = 1000000;

const getRandomNum = (min, max) => Math.floor((Math.random() * (max - min) ) + min);

const writeUsers = fs.createWriteStream('./csv/users.csv');
writeUsers.write('id,name\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000;
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

const writeListings = fs.createWriteStream('./csv/listings.csv');
writeListings.write('id,name,max_guests,max_stay,review_count,per_night,cleaning,service\n', 'utf8');

function writeOneMillionListings(writer, encoding, callback) {
  let i = 1000;
  let id = 0;
  write();
  async function write() {
    let ok = true;
    let reservationId = 0;
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
      await generateBookings(reservationId + 1, listingInfo.review_count, startDate, listingInfo);
      reservationId += listingInfo.review_count;
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

const bookingsWriter = csvWriter();
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
       user_id: getRandomNum(1, 1000000),
     }, () => { bookingsWriter.end(); });
     checkin = calculateDate(checkin, stayLength);
   }
 };

function generateData() {
  writeTenMillionUsers(writeUsers, 'utf8', () => { writeUsers.end(); });
  writeOneMillionListings(writeListings, 'utf8', () => { writeListings.end(); });
};

generateData();
