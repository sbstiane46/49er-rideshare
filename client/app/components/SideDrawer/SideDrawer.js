import React from 'react';
import './SideDrawer.scss';

const sideDrawer = props => {
    let drawerClasses='side-drawer';
    if(props.show) {
        drawerClasses='side-drawer open';
    }
    return (<nav className={drawerClasses}>
        <ul>
            <li><a href="#">Feature 1</a></li>
            <li><a href="#">Feature 2</a></li>
            <li><a href="#">Feature 3</a></li>
        </ul>
    </nav>)
};

export default sideDrawer;