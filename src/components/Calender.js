import {React, useState, useEffect, useRef} from "react";
import '../App.css';

const Calender = (props) => {
    const [dateData, setdateData] = useState({
        month: 0,
        year: 2022
    });
    const [selDateID, setSelDateID] = useState('NA');
    
    const dateArr = []
    const numDays = new Date(dateData.year, dateData.month+1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
        dateArr.push(i);
    }

    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const mNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(dateData.year == props.minYear) {
        monthNames = monthNames.slice(props.minMonth);
    }
    

    const yearArr = []
    for(let i = props.minYear; i <= 2100; i++) {
        yearArr.push(i);
    }
    
    // Function to change month and year state(dateData)
    const changeCal = (e, key) => {
        if (key === "month") {
            setdateData(dateData => ({
                ...dateData,
                [key]: mNames.indexOf(e.target.value)
            }))
        } else {
            setdateData(dateData => ({
                ...dateData,
                [key]: e.target.value
            }))
        }
    }

    // Function to select a particular date
    const selectDate = (e) => {
        if(e.target.classList.contains('date-selected')) {
            e.target.classList.remove('date-selected');
            setSelDateID('NA');
            removeInvalid();
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

    // Clock button click
    const mainDiv = useRef(null);
    const clockClick = () => {
        props.clockOrCaltoggle({
            type: props.typeOfCal,
            state: false
        });
        mainDiv.current.style.display = "none";
    }

    // remove invalid dates class
    const removeInvalid = () => {
        for(let i = 1; i <= 28; i++) {
            document.getElementById('T' + i).classList.remove('date-invalid');
        }
    }

    // calendar to clock
    useEffect(() => {
        if(props.display) {
            mainDiv.current.style.display = "block";
        }
    }, [props.display])

    // To calculate minYear for To Calender
    useEffect(() => {
        props.sendToAppCallback({...dateData, typeOfCal: props.typeOfCal}); 
    }, [dateData])

    // Send final data of datetime to App
    useEffect(() => {
        if(selDateID !== 'NA') {
            props.sendDateToApp({
                ...dateData,
                date: selDateID.slice(1),
                typeOfCal: props.typeOfCal
            })
        }
    }, [dateData, selDateID])

    // handle state change after minYear or minMonth is changed
    useEffect(() => {
        if((props.minYear != 1950 || props.minMonth != 0) && (dateData.year <= props.minYear || dateData.month <= props.minMonth)) {
            setdateData({
                month: props.minMonth,
                year: props.minYear
            })
        }
    }, [props.minYear, props.minMonth])

    // add invalid date class
    useEffect(() => {
        if(props.minYear == dateData.year && dateData.month == props.minMonth) {
            removeInvalid();
            for(let i = 1; i < props.minDate; i++) {
                document.getElementById('T' + i).classList.add('date-invalid');
            }
            setSelDateID('T' + props.minDate);
        } 
    }, [props.minDate])

    // remove invalid date class
    useEffect(() => {
        removeInvalid();
    }, [dateData.month, dateData.year]);


    return(
        <div className="calender mx-3" ref={mainDiv}>
            <div className="monthyear d-flex flex-column align-items-center">
                <select name="month" value={mNames[dateData.month]} className="month mx-1" onChange={(e) => {changeCal(e, "month")}}>
                    {
                        monthNames.map((month) => {
                            return(
                                <option className="opts" value={month}>{month}</option>
                            )
                        })
                    }
                </select>
                <select name="year" value={dateData.year} className="year mx-1" onChange={(e) => {changeCal(e, "year")}}>
                    {
                        yearArr.map((year) => {
                            return(
                                <option className="opts" value={year}>{year}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="dates d-flex flex-row flex-wrap mt-3">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="whitesmoke" className="bi bi-clock clock-ico" viewBox="0 0 16 16" onClick={clockClick}>
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            
        </div>
    )
}

export default Calender;