import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  const [cityName, setCityName] = useState("");
  const [listItems, setListItems] = useState();
  const [tempTitle, setTempTitle] = useState("");
  const [style, setStyle] = useState("palm-container-muted");
  const [pstyle, setPStyle] = useState("p-active");
  const [searchStyle, setSearchStyle] = useState("search-bar-muted");
  const [buttonStyle, setButtonStyle] = useState("button-container-active");
  const [location, setLocation] = useState("");


  const showSearchBar = () => {
    if (searchStyle === "search-bar-muted") setStyle("search-bar-active");
    else setStyle("search-bar-muted");
  };

  const buttonContainerToggle = () => {
    if (buttonStyle === "button-container-active") setButtonStyle("button-container-muted");
    else setButtonStyle("button-container-muted");
    setSearchStyle("search-bar-active");
  }


  const changeStyle = () => {
    //this function makes the palm container visible once function is called.  it is used below
    if (style === "palm-container-muted") setStyle("palm-container-active");
    else setStyle("palm-container-muted");
  };

  async function checkZip() {
    changeStyle(); //this is the above function that makes container visible
    setPStyle("p-muted");
    setSearchStyle("search-bar-active");

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
        console.log(result);
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
        cityNameFunction();
      } catch (error) {
        console.error(error);
      }
    }

  }


  //this runs if the use location feature is used
  async function checkZipLocation(zip) {
    if (window.confirm("Allow Palmfinder to access your location?")) {
      changeStyle(); //this is the above function that makes container visible
      setPStyle("p-muted");
      // setSearchStyle("search-bar-active");

      const url = `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${zip}`;
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


      checkZipLocation(result.postcode);
      setCityName(result.city.name)

    } catch (error) {
      console.error(error);
    }
  }

  async function cityNameFunction() {
    const z = zipData
    const url = `https://community-zippopotamus.p.rapidapi.com/us/${zipData}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '74d8672b18msh0a1e3329629ffabp1d9947jsndffb0cba6f05',
        'X-RapidAPI-Host': 'community-zippopotamus.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result.places[0[0]]);
      setCityName(Object.values(result.places[0])[0]);
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <div className="container">
      <div className={buttonStyle}>
        <button className="confirm" onClick={getLocation}>Use My Location</button>
        <button className="deny" onClick={buttonContainerToggle}>Enter Location Manually</button>
        {/* <button onClick={CityName}>City</button> */}
      </div>
      <div className={searchStyle}>
        <Search setZipData={setZipData} />

        <img src={searchIcon} onClick={checkZip} className="search-icon" />
      </div>

      <p className={pstyle}>
        Use this application to see if you can grow palm trees in your city.{" "}
      </p>
      <div className={style}>
        <Zone
          hardinessZone={hardinessZone}
          tempurateRange={tempurateRange}
          tempTitle={tempTitle}
          cityName={cityName}
        />

        <Palms listItems={listItems} />
      </div>
    </div>
  );
}

export default PalmContainer;
