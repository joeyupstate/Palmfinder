import "./styles/App.css";
import React, { useState } from "react";
import PalmContainer from "./PalmContainer";

function App() {
  const [activated, setActivated] = useState("");

  const resetter = () => {
    setActivated("reset");
    console.log("hey");
  };

  return (
    <div className="app">
      <h1 className="heading" onClick={resetter}>
        PalmFinder
      </h1>
      <PalmContainer reset={activated} />
    </div>
  );
}

export default App;
