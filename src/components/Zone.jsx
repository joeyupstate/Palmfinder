import React from 'react'

function Zone(props) {
    return (
        <div className='zone-container'>
            <h1 className='zone-name'>Zone {props.hardinessZone}</h1>
            <h4 className='low-temp-range'>Max Low Temp</h4>
            <p className='temp-range'>{props.tempurateRange}</p>

        </div>
    )
}

export default Zone
