import React from "react";
import palmtreeIcon from "../assets/palmtree.png"

function Palms(props) {
  return (
    <div className="palm-list-container">
      <img src={palmtreeIcon} className="palm-tree-icon" />
      <h4 className="palm-list-title">Try these palms trees</h4>
      <ul className="palm-list">{props.listItems}</ul>
    </div>
  );
}

export default Palms;
