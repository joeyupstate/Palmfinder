import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";
import Palms from "./components/Palms";
import Zone from "./components/Zone";
import { palmData } from "./Data";
import searchIcon from "./assets/search-icon.png";

function App() {
  const [zipData, setZipData] = useState([]);
  const [hardinessZone, sethardinessZone] = useState("");
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
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="app">
      <div className="search-bar">
        <Search setZipData={setZipData} />
        <img src={searchIcon} onClick={checkZip} className="search-icon" />
      </div>
      <Zone hardinessZone={hardinessZone} />
      <Palms listItems={listItems} />
    </div>
  );
}

export default App;
