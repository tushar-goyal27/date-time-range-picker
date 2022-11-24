import {React, useState, useEffect} from "react";
import '../App.css';

const Display = (props) => {
    const [from, setFrom] = useState(new Date(
        parseInt(props.fromDateTime.year), 
        parseInt(props.fromDateTime.month), 
        parseInt(props.fromDateTime.date),
        parseInt(props.fromDateTime.hour),
        parseInt(props.fromDateTime.min)
    ));
    const [to, setTo] = useState(new Date(
        parseInt(props.toDateTime.year), 
        parseInt(props.toDateTime.month), 
        parseInt(props.toDateTime.date),
        parseInt(props.toDateTime.hour),
        parseInt(props.toDateTime.min)
    ));
    
    useEffect(() => {
        setFrom(new Date(
            parseInt(props.fromDateTime.year), 
            parseInt(props.fromDateTime.month), 
            parseInt(props.fromDateTime.date),
            parseInt(props.fromDateTime.hour),
            parseInt(props.fromDateTime.min)
        ));
        setTo(new Date(
            parseInt(props.toDateTime.year), 
            parseInt(props.toDateTime.month), 
            parseInt(props.toDateTime.date),
            parseInt(props.toDateTime.hour),
            parseInt(props.toDateTime.min)
        ));
    }, [props])

    return (
        <div className="data">
            <div className="datapoint m-2 text-center">
                <span className="key">From:</span> 
                <span className="value">  {from.toString()}</span><br /> 
            </div>
            <div className="datapoint m-2 text-center">
                <span className="key">To:</span> 
                <span className="value">  {to.toString()}</span><br /> 
            </div>
            <div className="datapoint m-2 text-center">
                <span className="key">Hours Passed:</span> 
                <span className="value">  {parseInt((to - from) / (60 * 60 * 1000))}</span><br /> 
            </div>
            <div className="datapoint m-2 text-center">
                <span className="key">Days Passed:</span> 
                <span className="value">  {parseInt((to - from) / (24 * 60 * 60 * 1000))}</span><br /> 
            </div>
            <div className="datapoint m-2 text-center">
                <span className="key">Months Passed:</span> 
                <span className="value">  {parseInt((to - from) / (30 * 24 * 60 * 60 * 1000))}</span><br /> 
            </div>
            <div className="datapoint m-2 text-center">
                <span className="key">Years Passed:</span> 
                <span className="value">  {parseInt((to - from) / (365 * 24 * 60 * 60 * 1000))}</span><br /> 
            </div>
        </div>
    )
}

export default Display;