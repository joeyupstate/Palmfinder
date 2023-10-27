import React, { useState } from "react";
import Search from "./components/Search";
import Palms from "./components/Palms";
import Zone from "./components/Zone";
import { palmData } from "./Data";
import searchIcon from "./assets/search-icon.png";
import "./styles/PalmContainer.css"

function PalmContainer() {
    const [zipData, setZipData] = useState([]);
    const [hardinessZone, sethardinessZone] = useState("");
    const [tempurateRange, setTempurateRange] = useState("");
    const [listItems, setListItems] = useState();

    async function checkZip() {
        if (zipData.length < 5 || zipData === "") {
            alert("Please Enter A Valid Zipcode");
        } else {
            const url = `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${zipData}`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "74d8672b18msh0a1e3329629ffabp1d9947jsndffb0cba6f05",
                    "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
                },
            };
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                const zone = result.hardiness_zone;
                const palmList = palmData.find((palm) => palm.id === zone); //this searches the palmdata for the matching zone
                const tempRange = palmList.temp;
                const palmTrees = palmList.palms;
                if (palmTrees.length === 0) {
                    setListItems("Im Sorry You Can Grow Palm Trees In This Climate");
                } else {
                    setListItems(
                        palmTrees.map((pt) => (
                            <li key={Math.random(Math.floor + 10)}>{pt}</li>
                        ))
                    );
                }
                sethardinessZone(zone);
                setTempurateRange(tempRange);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="container">
            <div className="search-bar">
                <Search setZipData={setZipData} />
                <img src={searchIcon} onClick={checkZip} className="search-icon" />
            </div>
            <div className="palm-container">
                <Zone hardinessZone={hardinessZone} tempurateRange={tempurateRange} />
                <Palms listItems={listItems} />
            </div>
        </div>
    );
}


export default PalmContainer


