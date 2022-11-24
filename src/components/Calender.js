import {React, useState, useEffect} from "react";
import '../App.css';

const Calender = (props) => {
    const [dateData, setdateData] = useState({
        month: 0,
        year: 1950
    });
    const [timeData, setTimeData] = useState({
        hour: 23,
        min: 59
    });
    const [selDateID, setSelDateID] = useState('NA');
    
    const dateArr = []
    const numDays = new Date(dateData.year, dateData.month+1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
        dateArr.push(i);
    }

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    monthNames = monthNames.slice(props.minMonth);

    const yearArr = []
    for(let i = props.minYear; i <= 2100; i++) {
        yearArr.push(i);
    }
    
    // Function to change month and year state(dateData)
    const changeCal = (e, key) => {
        if (key === "month") {
            setdateData(dateData => ({
                ...dateData,
                [key]: monthNames.indexOf(e.target.value)
            }))
        } else {
            setdateData(dateData => ({
                ...dateData,
                [key]: e.target.value
            }))
        }
    }

    // Function to change hour and min state(timeData)
    const changeTime = (e, key) => {
        setTimeData(timeData => ({
            ...timeData,
            [key]: e.target.value
        }))
    }

    // Function to select a particular date
    const selectDate = (e) => {
        if(e.target.classList.contains('date-selected')) {
            e.target.classList.remove('date-selected');
            setSelDateID('NA');
        } else {
            if(selDateID === 'NA') {
                e.target.classList.add('date-selected');
                setSelDateID(e.target.id);
            } else {
                document.getElementById(selDateID).classList.remove('date-selected');
                e.target.classList.add('date-selected');
                setSelDateID(e.target.id);
            }
        }
    }

    // To calculate minYear for To Calender
    useEffect(() => {
        props.sendToAppCallback({...dateData, typeOfCal: props.typeOfCal}); 
    }, [dateData])

    // Send final data of datetime to App
    useEffect(() => {
        if(selDateID !== 'NA') {
            props.sendDateTimeToApp({
                ...dateData,
                ...timeData,
                date: selDateID.slice(1),
                typeOfCal: props.typeOfCal
            })
        }
    }, [dateData, timeData, selDateID])

    // handle state change after minYear or minMonth is changed
    useEffect(() => {
        if((props.minYear != 1950 || props.minMonth != 0) && (dateData.year <= props.minYear || dateData.month <= props.minMonth)) {
            setdateData({
                month: props.minMonth,
                year: props.minYear
            })
        }
    }, [props.minYear, props.minMonth])

    return(
        <div className="calender mx-3">
            <div className="monthyear d-flex flex-row justify-content-center m-2 ">
                <select name="month" className="monthyearele mx-1" onChange={(e) => {changeCal(e, "month")}}>
                    {
                        monthNames.map((month) => {
                            return(
                                <option value={month}>{month}</option>
                            )
                        })
                    }
                </select>
                <select name="year" className="monthyearele mx-1" onChange={(e) => {changeCal(e, "year")}}>
                    {
                        yearArr.map((year) => {
                            return(
                                <option value={year}>{year}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="time d-flex flex-row justify-content-center m-3">
                <input className="timeele hour mx-1 text-center" type="number" min="0" max="23" step="1" defaultValue={23} onChange={(e) => {changeTime(e, "hour")}}/>:
                <input className="timeele min mx-1 text-center" type="number" min="0" max="59" step="1" defaultValue={59} onChange={(e) => {changeTime(e, "min")}}/>
            </div>
            <div className="dates d-flex flex-row flex-wrap">
                {
                    dateArr.map((day) => {
                        return (
                            <div id={props.typeOfCal.charAt(0) + day} className="day text-center pt-2" onClick={(e) => {selectDate(e)}}>
                                {day}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Calender;