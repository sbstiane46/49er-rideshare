import React from 'react';
import './LogoutButton.scss'

const logoutButton = props => (
    <button className="logoutbutton" onClick={props.click}> Log Out
    </button>
);

export default logoutButton;