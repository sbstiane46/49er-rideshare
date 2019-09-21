import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import LogoutButton from '../Logout/LogoutButton';
import CurrentLocationButton from '../CurrentLocation/CurrentLocationButton';
import './Toolbar.scss';


const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar_logo">
                <a href="/">
                    <img src='https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2018/08/unc_charlotte_logo_colors-279x300.png' />  
                    <p>Rideshare</p>
                </a>
            </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    {/* <li><a href="#">User Profile</a></li> */}
                    <li><CurrentLocationButton /></li>
                    <li><LogoutButton click={props.logoutClickHandler}/></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;