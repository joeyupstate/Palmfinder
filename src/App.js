import "./styles/App.css";
import React, { useState } from "react";
import PalmContainer from "./PalmContainer";

function App() {
  return (
    <div className="app">
      <h1 className="heading">PalmFinder</h1>
      <PalmContainer />
    </div>
  );
}

export default App;
