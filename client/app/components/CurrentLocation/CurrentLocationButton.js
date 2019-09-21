import React from 'react';
import './CurrentLocationButton.scss'

const CurrentLocationButton = props => (
    <button className="currentLocationButton" onClick={props.click}> Find Me
    </button>
);

export default CurrentLocationButton;