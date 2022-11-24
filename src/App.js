import './App.css';
import {React, useEffect, useState} from "react";
import Calender from './components/Calender';
import Display from './components/Display';

function App() {
  const [minYear, setMinYear] = useState(1950);
  const [minMonth, setMinMonth] = useState(0);
  const [fromMonth, setFromMonth] = useState(0);

  const [fromDateTime, setFromDateTime] = useState({
    date: 1,
    month: 0,
    year: 1950,
    hour: 23,
    min: 59
  });
  const [toDateTime, setToDateTime] = useState({
    date: 1,
    month: 0,
    year: 1950,
    hour: 23,
    min: 59
  });

  const sendToAppCallback = (dateTime) => {
    if(dateTime.typeOfCal === "From") {
      setMinYear(dateTime.year);
      setMinMonth(dateTime.month);
      setFromMonth(dateTime.month);
    } else {
      if(dateTime.year !== minYear) {
        setMinMonth(0);
      } else {
        setMinMonth(fromMonth);
      }
    }
  };
  const sendDateTimeToApp = (dateTime) => {
    // setMinYear(dateTime.year);
    if(dateTime.typeOfCal === "From") {
      delete dateTime.typeOfCal;
      setFromDateTime(dateTime);
    } else {
      delete dateTime.typeOfCal;
      setToDateTime(dateTime);
    }
  };

  // useEffect(() => {
  //   console.log(fromDateTime);
  //   console.log(toDateTime);
  // }, [fromDateTime, toDateTime]);

  return (
    <div className="container">
      <div className='fromto d-flex flex-row justify-content-center mt-3'>
        <Calender typeOfCal={"From"} minYear={1950} minMonth={0} sendToAppCallback={sendToAppCallback} sendDateTimeToApp={sendDateTimeToApp}/>
        <Calender typeOfCal={"To"} minYear={minYear} minMonth={minMonth} sendToAppCallback={sendToAppCallback} sendDateTimeToApp={sendDateTimeToApp}/>
      </div>
      <div className='show-data d-flex flex-col justify-content-center mt-3'>
          {/* {console.log(fromDateTime)} */}
          <Display fromDateTime={fromDateTime} toDateTime={toDateTime}/>
      </div>
    </div>
  );
}

export default App;
