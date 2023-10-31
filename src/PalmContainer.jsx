import React, { useState } from "react";
import Search from "./components/Search";
import Palms from "./components/Palms";
import Zone from "./components/Zone";
import { palmData } from "./Data";
import searchIcon from "./assets/search-icon.png";

import "./styles/PalmContainer.css";

function PalmContainer(props) {
  const [zipData, setZipData] = useState([]);
  const [hardinessZone, sethardinessZone] = useState("");
  const [tempurateRange, setTempurateRange] = useState("");
  const [listItems, setListItems] = useState();
  const [tempTitle, setTempTitle] = useState("");
  const [style, setStyle] = useState("palm-container-muted");
  const [pstyle, setPStyle] = useState("p-active");

  const changeStyle = () => {
    //this function makes the palm container visible once function is called.  it is used below
    if (style === "palm-container-muted") setStyle("palm-container-active");
    else setStyle("palm-container-muted");
  };

  async function checkZip() {
    changeStyle(); //this is the above function that makes container visible
    setPStyle("p-muted")
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
          setListItems("Im Sorry You Can't Grow Palm Trees In This Climate");
        } else {
          setListItems(
            palmTrees.map((pt) => (
              <li key={Math.random(Math.floor + 10)}>{pt}</li>
            ))
          );
        }

        sethardinessZone("Zone" + " " + zone);
        setTempurateRange(tempRange);
        setTempTitle("Max Low Temp");
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
      <p className={pstyle}>Use this to application to see if you are able to grow palm trees in your city. </p>
      <div className={style}>
        <Zone
          hardinessZone={hardinessZone}
          tempurateRange={tempurateRange}
          tempTitle={tempTitle}
        />

        <Palms listItems={listItems} />
      </div>
    </div>
  );
}

export default PalmContainer;
