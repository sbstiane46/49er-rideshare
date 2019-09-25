import React from 'react';
import { UserProfile } from './UserProfile';
import './SideDrawer.scss';

const sideDrawer = props => {
    return props.show ? 
        (<nav className='side-drawer open'>
            <ul>
                <li>
                    <a href="#">Where to?</a>
                </li>
                <li>
                    <a href="#">Find Driver</a>
                </li>
                <li><UserProfile /></li>
            </ul>
        </nav>)
        : <></>
};

export default sideDrawer