const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const debug = require('debug')('app:gen:psql');
const argv = require('yargs').argv;
require('events').EventEmitter.defaultMaxListeners = 1000000;

const getRandomNum = (min, max) => Math.floor((Math.random() * (max - min) ) + min);

const users = argv.users;
const writeUsers = fs.createWriteStream('../../csv/cassandra/noudt/users.csv');
writeUsers.write('user_id,name\n', 'utf8');

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
const writeListings = fs.createWriteStream('../../csv/cassandra/noudt/listings.csv');
writeListings.write('listing_id,cleaning,max_guests,max_stay,name,per_night,review_count,service\n', 'utf8');
let reservationId = 1;

function writeOneMillionListings(writer, encoding, callback) {
  let i = listings || 1000000;
  let id = 0;
  write();
  async function write() {
    let ok = true;
    const startDate = new Date();
    do {
      i--;
      id++;
      const listingInfo = {
        id,
        cleaning: i % 3 === 0 ? getRandomNum(10, 101) : 0,
        per_night: getRandomNum(50, 801),
        max_guests: getRandomNum(1, 17),
        max_stay: getRandomNum(2, 32),
        name: faker.name.findName(),
        review_count: getRandomNum(50, 150),
        service: getRandomNum(20, 101),
      };
      const data = `${listingInfo.id},${listingInfo.cleaning},${listingInfo.max_guests},${listingInfo.max_stay},${listingInfo.name},${listingInfo.per_night},${listingInfo.review_count},${listingInfo.service}\n`;
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

const writeReservations = fs.createWriteStream('../../csv/cassandra/noudt/reservations.csv');
writeReservations.write('reservation_id,adults,checkin,checkout,children,infants,listing_id,name,total_cost,user_id\n', 'utf8');

const generateBookings = async (startingId, reviewCount, startDate, listingInfo) => {

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
    const bookingInfo = {
      id: startingId + i,
      adults,
      checkin,
      checkout: calculateDate(checkin, getRandomNum(1, listingInfo.max_stay + 1)),
      children,
      infants,
      listing_id: listingInfo.id,
      name: faker.name.findName(),
      total_cost: (listingInfo.per_night * stayLength) + listingInfo.cleaning + listingInfo.service,
      user_id: getRandomNum(1, 1000000),
    };
    const data = `${bookingInfo.id},${bookingInfo.adults},${bookingInfo.checkin},${bookingInfo.checkout},${bookingInfo.children},${bookingInfo.infants},${bookingInfo.listing_id},${bookingInfo.name},${bookingInfo.total_cost},${bookingInfo.user_id}\n`;
    writeReservations.write(data, 'utf8');
    await reservationsByListings(bookingInfo);
    checkin = calculateDate(checkin, stayLength);
  }
};

const writeReservationsByListings = fs.createWriteStream('../../csv/cassandra/noudt/reservations_by_listing.csv');
writeReservationsByListings.write('listing_id,reservation_id,adults,checkin,checkout,children,infants,name,total_cost,user_id\n', 'utf8');

const reservationsByListings = (bookingInfo) => {
  const data = `${bookingInfo.listing_id},${bookingInfo.id},${bookingInfo.adults},${bookingInfo.checkin},${bookingInfo.checkout},${bookingInfo.children},${bookingInfo.infants},${bookingInfo.name},${bookingInfo.total_cost},${bookingInfo.user_id}\n`;
  writeReservationsByListings.write(data, 'utf8');
};

function generateData() {
  debug('start');
  writeTenMillionUsers(writeUsers, 'utf8', () => { writeUsers.end(); });
  writeOneMillionListings(writeListings, 'utf8', () => { writeListings.end(); debug('done generating csv files'); });
};

generateData();
