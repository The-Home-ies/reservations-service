import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';
import CheckingDropDown from './CheckingDropDown.jsx'
import Fees from './Fees.jsx';
import styles from './App.css';

function App(props) {
  const [guestsBool, setGuestsBool] = useState(false);
  const [guestsNum, setGuests] = useState(1);
  const [checkingBool, setCheckingBool] = useState(true);
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  const [listingData, setListingData] = useState(undefined);
  const [checkingDatesSet, setCheckingDatesSet] = useState(false);

  function getListingData() {
    const listingID = window.location.pathname.split('/')[2];
    return axios.get(`/api/listings/${listingID}`)
      .then((response) => {
        setListingData(response.data);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }
  function dropDownGuestsToggle() {
    setGuestsBool(!guestsBool);
  }
  function changeGuests(operation) {
    if (operation === 'decrease') {
      setGuests(guestsNum - 1);
    }
    if (operation === 'increase') {
      setGuests(guestsNum + 1);
    }
  }
  function dropDownCheckingToggle() {
    setCheckingBool(!checkingBool);
  }
  useEffect(() => {
    getListingData();
  }, []);
  return (
    <div className={styles.mainContainer}>
      <span className={styles.mainPrice}>
        <span id={styles.mainPriceAmount}>
          {`$${listingData === undefined ? '' : listingData[0].fees.pernight}`}
        </span>
        <span id={styles.mainPricePerNight}>/ night</span>
      </span>
      <span className={styles.calendarReviews}>
        <svg id={styles.iconStar} viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false">
          <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z"></path>
        </svg>
        <span id={styles.reviews}>{' 4.96'}</span>
        <span id={styles.reviewsNum}> {' (290)'}</span>
      </span>
      <DateSelection onDropdown={false} checkingDates={[checkInDate, checkOutDate]} />
      {checkingBool && (
        <CheckingDropDown DateSelection={<DateSelection onDropdown checkingDates={[checkInDate, checkOutDate]} />} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkingDatesSet={checkingDatesSet} checkingDates={[checkInDate, checkOutDate]} />)}
      <Guests dropdown={dropDownGuestsToggle} guestNum={guestsNum} guestsBool={guestsBool} />
      {guestsBool && (
        <GuestsDropDown dropdown={dropDownGuestsToggle} changeGuests={changeGuests} />
      )}
      <button className={styles.reserveButton} type="submit">{Boolean(checkingDatesSet) ? 'Reserve' : 'Check Availability'}</button>
      {checkingDatesSet
        && (<Fees listingData={listingData} checkInDate={checkInDate} checkOutDate={checkOutDate} />)}
    </div>
  );
}
export default App;
