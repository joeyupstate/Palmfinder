import React from 'react'

function Palms(props) {
    return (
        <div>
            <h1>These are the palms you can grow</h1>
            <ul className="palm-list">{props.listItems}</ul>
        </div>
    )
}

export default Palms
