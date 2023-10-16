import React, { useState, useEffect } from 'react';




// Declare a new state variable, which we'll call "count"





function Search({ setZipData }) {
    const [zip, setZip] = useState(0);

    const zipInput = (e) => {

        setZip(e.target.value)


        setZipData(zip)
    }




    useEffect(() => {
        setZipData(zip)
    }, [zip]);



    return (
        <div className='search-bar'>
            <input type="text" onChange={zipInput} className='search-input' value={zip}></input>

        </div>
    )
}


export default Search


