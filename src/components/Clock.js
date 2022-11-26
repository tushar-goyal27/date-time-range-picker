import {React, useState, useEffect, useRef} from "react";
import '../App.css';

const Clock = (props) => {
    const [timeData, setTimeData] = useState({
        hour: 0,
        min: 0
    });
    const [ampm, setAMPM] = useState(true);

    const [selHourID, setSelHourID] = useState('NA');

    const hourSelected = (e) => {
        if(e.target.classList.contains('hour-selected')) {
            e.target.classList.remove('hour-selected');
            setSelHourID('NA');
            setTimeData({
                ...timeData,
                hour: 0
            })
        } else {
            if(selHourID === 'NA') {
                e.target.classList.add('hour-selected');
                setSelHourID(e.target.id);
            } else {
                document.getElementById(selHourID).classList.remove('hour-selected');
                console.log(document.getElementById(selHourID));
                e.target.classList.add('hour-selected');
                setSelHourID(e.target.id);
            }
            let hr = e.target.innerText;
            if(ampm) {
                setTimeData({
                    ...timeData,
                    hour: hr
                })
            } else {
                setTimeData({
                    ...timeData,
                    hour: parseInt(hr) + 12
                })
            }
        }
    }

    const minSelected = (e) => {
        if(e.target.value >= 60) {
            e.target.value = 59;
        } else if(e.target.value < 0) {
            e.target.value = 0
        }

        setTimeData({
            ...timeData,
            min: e.target.value
        })
    }

    const ampmChange = (e) => {
        if(e.target.value == 'pm') {
            setAMPM(false);
            if(timeData.hour == 12) {
                setTimeData({
                    ...timeData,
                    hour: 0
                })
            } else {
                setTimeData(timedata => ({
                    ...timeData,
                    hour: parseInt(timeData.hour) + 12
                }))
            }
        } else {
            setAMPM(true);
            if(timeData.hour >= 12) {
                setTimeData({
                    ...timeData,
                    hour: parseInt(timeData.hour) - 12
                })
            }
        }
    }

    useEffect(() => {
        props.sendTimeToApp({
            ...timeData,
            typeOfClock: props.typeOfClock
        })
    }, [timeData])

    const mainDiv = useRef(null);
    const calClick = () => {
        props.clockOrCaltoggle({
            type: props.typeOfClock,
            state: true
        })
        mainDiv.current.setAttribute('style', "display: none !important");
    }

    useEffect(() => {
        if(!props.display) {
            mainDiv.current.setAttribute('style', "display: flex !important");
        }
    }, [props.display])

    return(
        <div className="clock-container d-flex flex-column align-items-center justify-content-center mx-3" ref={mainDiv}>
            <div className="clock">
                <div className="hours">
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 9}>
                        9
                    </div>
                    <div className="clock-cen"></div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 3}>
                        3
                    </div>
                </div>
                <div className="hours" style={{transform: "rotate(30deg)"}}>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 10} style={{transform: "rotate(-30deg)"}}>
                        10
                    </div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 4} style={{transform: "rotate(-30deg)"}}>
                        4
                    </div>
                </div>
                <div className="hours" style={{transform: "rotate(60deg)"}}>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 11} style={{transform: "rotate(-60deg)"}}>
                        11
                    </div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 5} style={{transform: "rotate(-60deg)"}}>
                        5
                    </div>
                </div>
                <div className="hours" style={{transform: "rotate(90deg)"}}>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 12} style={{transform: "rotate(-90deg)"}}>
                        12
                    </div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 6} style={{transform: "rotate(-90deg)"}}>
                        6
                    </div>
                </div>
                <div className="hours" style={{transform: "rotate(120deg)"}}>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 1} style={{transform: "rotate(-120deg)"}}>
                        1
                    </div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 7} style={{transform: "rotate(-120deg)"}}>
                        7
                    </div>
                </div>
                <div className="hours" style={{transform: "rotate(150deg)"}}>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 2} style={{transform: "rotate(-150deg)"}}>
                        2
                    </div>
                    <div className="hour" onClick={(e) => {hourSelected(e)}} id={props.typeOfClock.charAt(0) + 'T' + 8} style={{transform: "rotate(-150deg)"}}>
                        8
                    </div>
                </div>
                
            </div>
            <div className="minute-container d-flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="whitesmoke" className="bi bi-calendar cal-ico" viewBox="0 0 16 16" onClick={calClick}>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                <input type="number" className="minute mx-4 text-center" placeholder="Minutes" onChange={(e) => {minSelected(e)}}/>
                <select name="ampm" className="ampm mx-4" onChange={(e) => {ampmChange(e)}}>
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>
        </div>
    )
}

export default Clock;