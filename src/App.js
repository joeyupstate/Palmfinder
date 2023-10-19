import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";
import { palmData } from "./Data";
import searchIcon from "./assets/search-icon.png";

function App() {
  const [zipData, setZipData] = useState([]);
  const [zone, setZone] = useState();
  const [palmTrees, setPalmTrees] = useState();

  async function checkZip() {
    const url = `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${zipData}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "74d8672b18msh0a1e3329629ffabp1d9947jsndffb0cba6f05",
        "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.hardiness_zone);
      setZone(result.hardiness_zone);
      const palmList = palmData.find((palm) => palm.id === zone); //this searches the palmdata for the matching zone

      setPalmTrees(palmList.palms);
      // const listItems = palmTrees.map((pt) => <li>{pt}</li>);
    } catch (error) {
      console.error(error);
    }
  }
  const listItems = palmTrees.map((pt) => <li>{pt}</li>);

  return (
    <div className="app">
      <div className="search-bar">
        <Search setZipData={setZipData} />
        <img src={searchIcon} onClick={checkZip} className="search-icon" />
      </div>
      <div>{zone}</div>
      <ul className="palm-list">{listItems}</ul>
    </div>
  );
}

export default App;
