import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";

function App() {
  const [zipData, setZipData] = useState([]);

  async function hey() {
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
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const test = () => {
    console.log(zipData);
  };

  return (
    <div>
      <Search setZipData={setZipData} />
      <button onClick={hey}>click</button>
    </div>
  );
}

export default App;
