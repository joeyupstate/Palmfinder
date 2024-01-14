import React from 'react'

function Location() {


    async function getLocation() {
        const url = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '74d8672b18msh0a1e3329629ffabp1d9947jsndffb0cba6f05',
                'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.postcode);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            {/* <button onClick={getLocation}>click</button> */}

        </div>
    )
}

export default Location
