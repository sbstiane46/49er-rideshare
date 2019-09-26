import React from 'react';
import { UserProfile } from './UserProfile';
import './SideDrawer.scss';


const sideDrawer = props => {
    return props.show ? 
        (<nav className='side-drawer open'>
            <ul>
                <li>
                    <div class="dropdown">
                        <button class="dropbtn">Where to?</button>
                        <div class="dropdown-content">
                            <p>Academic Buildings</p>
                            <a href="#">Center City Building</a>
                            <a href="#">Atkins Library</a>
                            <a href="#">Colvard</a>
                            <a href="#">Rowe</a>
                            <a href="#">Robinson Hall</a>
                            <a href="#">Johnson Band Center</a>
                            <a href="#">Storrs</a>
                            <a href="#">Denny</a>
                            <a href="#">Fretwell</a>
                            <a href="#">Friday</a>
                            <a href="#">McEniry</a>
                            <a href="#">Cameron Hall</a>
                            <a href="#">Smith</a>
                            <a href="#">Burson</a>
                            <a href="#">College of Health and Human Services</a>
                            <a href="#">Cato College of Education</a>
                            <a href="#">Woodward Hall</a>
                            <a href="#">Belk Gymnasium</a>
                            <a href="#">EPIC</a>
                            <a href="#">Grigg</a>
                            <a href="#">Duke Centennial Hall</a>
                            <a href="#">Kulwicki Motorsports Laboratory</a>
                            <a href="#">Motorsports Research</a>
                            <a href="#">Bioinformatics</a>
                            <a href="#">PORTAL</a>
                            <a href="#">Early College High School</a>
                        </div>
                    </div>
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