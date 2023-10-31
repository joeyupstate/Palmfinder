import React, { useState, useEffect } from "react";
import "../styles/ComponentStyles.css";
// Declare a new state variable, which we'll call "count"

function Search({ setZipData }) {
  const [zip, setZip] = useState();

  const zipInput = (e) => {
    setZip(e.target.value);

    setZipData(zip);
  };

  useEffect(() => {
    setZipData(zip);
  }, [zip]);

  return (
    <div className="search-input-bar">
      <input
        type="text"
        onChange={zipInput}
        className="search-input"
        placeholder="Enter a ZIP Code"
        value={zip}
      ></input>
    </div>
  );
}

export default Search;
