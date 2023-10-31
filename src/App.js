import "./styles/App.css";
import React, { useState } from "react";
import PalmContainer from "./PalmContainer";

function App() {
  const resetter = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <h1 className="heading" onClick={resetter}>
        PalmFinder
      </h1>
      <PalmContainer />
    </div>
  );
}

export default App;
