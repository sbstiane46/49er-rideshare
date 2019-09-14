import React from 'react';
import './Toolbar.scss';


const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo"><a href="/">49er Rideshare Logo</a></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="#">User Profile</a></li>
                    <li><a href="#">Dashboard</a></li>
                    
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;