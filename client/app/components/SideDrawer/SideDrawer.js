import React from 'react';
import './SideDrawer.scss';

const sideDrawer = props => {
    let drawerClasses='side-drawer';
    if(props.show) {
        drawerClasses='side-drawer open';
    }
    return (
    <nav className={drawerClasses}>
        <ul>
            <li><a href="#">Where to?</a></li>
            <li><a href="#">Find Driver</a></li>
            <li><a href="#">User Profile</a></li>
        </ul>
    </nav>
    );
};

export default sideDrawer;