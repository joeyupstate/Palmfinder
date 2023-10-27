import React from "react";

function Palms(props) {
  return (
    <div className="palm-list-container">
      <ul className="palm-list">{props.listItems}</ul>
    </div>
  );
}

export default Palms;
