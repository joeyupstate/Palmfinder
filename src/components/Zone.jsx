import React from 'react'

function Zone(props) {
    return (
        <div className='zone-container'>
            <h5 className="cityName"> ah {props.cityName}...
            </h5>
            <h1 className='zone-name'>{props.hardinessZone}</h1>
            <h4 className='low-temp-range'>{props.tempTitle}</h4>
            <p className='temp-range'>{props.tempurateRange}</p>

        </div>
    )
}


export default Zone
