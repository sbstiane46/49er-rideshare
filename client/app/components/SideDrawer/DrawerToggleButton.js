import React from 'react';
import './DrawerToggleButton.scss'

const drawerToggleButton = props => (
    <button className="togglebutton" onClick={props.click}>
        <div className="togglebutton_line" />
        <div className="togglebutton_line" />
        <div className="togglebutton_line" />
    </button>
);

export default drawerToggleButton;