import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";
import { palmData } from "./Data";
import searchIcon from "./assets/search-icon.png";

function App() {
  const [zipData, setZipData] = useState([]);
  const [zone, setZone] = useState();
  const [palms, setPalms] = useState();

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
      const palmList = palmData.find((palm) => palm.id === zone);

      for (let i = 0; i < palmList.palms.length; i++) {
        console.log(palmList.palms[i]);
        setPalms(palmList.palms[i]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // const object = palmData.find((obj) => obj.id === "7a");
  // const object2 = object.palms;

  // const test = () => {
  //   for (let i = 0; i < result2.length; i++) {
  //     console.log(result2[i]);
  //   }
  // };
  // const returnPalms = () => {
  //   // palmData.map((palm) => {
  //   //   if (zone !== [palm.id]) {
  //   //     palm.id;
  //   //   }
  //   // });
  //   palmData.filter((palm) => [palm.id] === zone);
  // };

  return (
    <div className="app">
      <div className="search-bar">
        <Search setZipData={setZipData} />
        <img src={searchIcon} onClick={checkZip} className="search-icon" />
      </div>
      <div>{zone}</div>
      {/* <div>{palms}</div> */}
      <ul>map</ul>
    </div>
  );
}

export default App;
