import './App.css';
import {React, useEffect, useState} from "react";
import Calender from './components/Calender';
import Display from './components/Display';
import Clock from './components/Clock';

function App() {
  const [minYear, setMinYear] = useState(1950);
  const [minMonth, setMinMonth] = useState(0);
  const [fromMonth, setFromMonth] = useState(0);
  const [minDate, setMinDate] = useState(1);

  const [fromClockOrCal, setFromClockOrCal] = useState(true);
  const [toClockOrCal, setToClockOrCal] = useState(true);

  const [fromDateTime, setFromDateTime] = useState({
    date: 1,
    month: 0,
    year: 2022,
    hour: 23,
    min: 59
  });
  const [toDateTime, setToDateTime] = useState({
    date: 1,
    month: 0,
    year: 2022,
    hour: 23,
    min: 59
  });

  const clockOrCaltoggle = (data) => {
    if(data.type === "From") {
      setFromClockOrCal(data.state);
    } else {
      setToClockOrCal(data.state);
    }
  }

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

  const sendDateToApp = (calDate) => { 
    if(calDate.typeOfCal === "From") {
      setFromDateTime({
        ...fromDateTime,
        year: calDate.year,
        month: calDate.month,
        date: calDate.date
      });
      setMinDate(calDate.date);
    } else {
      setToDateTime({
        ...toDateTime,
        year: calDate.year,
        month: calDate.month,
        date: calDate.date
      });
    }
  };

  const sendTimeToApp = (clockTime) => {
    if(clockTime.typeOfClock === "From") {
      setFromDateTime({
        ...fromDateTime,
        hour: clockTime.hour,
        min: clockTime.min,
      });
    } else {
      setToDateTime({
        ...toDateTime,
        hour: clockTime.hour,
        min: clockTime.min,
      });
    }
  }

  // useEffect(() => {
  //   console.log(fromDateTime);
  //   console.log(toDateTime);
  // }, [fromDateTime, toDateTime])

  return (
    <div className="container">
      <div className='fromto d-flex flex-row justify-content-center mt-3'>
        <div className='from'>
            <Calender typeOfCal={"From"} display={fromClockOrCal} minYear={1950} minMonth={0} sendToAppCallback={sendToAppCallback} sendDateToApp={sendDateToApp} clockOrCaltoggle={clockOrCaltoggle}/>
            <Clock typeOfClock={"From"} display={fromClockOrCal} clockOrCaltoggle={clockOrCaltoggle} sendTimeToApp={sendTimeToApp}/>
        </div>
        <div className='to'>
            <Calender typeOfCal={"To"} display={toClockOrCal} minYear={minYear} minMonth={minMonth} minDate={minDate} sendToAppCallback={sendToAppCallback} sendDateToApp={sendDateToApp} clockOrCaltoggle={clockOrCaltoggle}/>
            <Clock typeOfClock={"To"} display={toClockOrCal} clockOrCaltoggle={clockOrCaltoggle} sendTimeToApp={sendTimeToApp}/>
        </div>
      </div>
      <div className='show-data d-flex flex-col justify-content-center mt-3'>
          <Display fromDateTime={fromDateTime} toDateTime={toDateTime}/>
        </div>
    </div>
  );
}

export default App;
