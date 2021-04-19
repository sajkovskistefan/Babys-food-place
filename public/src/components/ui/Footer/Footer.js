import React from 'react';
import logo from '../../../assets/img/logo_white.svg';

import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
            <div className="logo-white">
                <img src={logo} alt="footer-logo" />
            </div>
            <div className="categories-footer">
                <span>Breakfast</span>
                <div className="circlefooter"></div>
                <span>Brunch</span>
                <div className="circlefooter"></div>
                <span>Lunch</span>
                <div className="circlefooter"></div>
                <span>Dinner</span>
            </div>
            <div className="copyright">
                <span>Baby's Food Place</span> <br />
                <span>copyright © 2021</span>
            </div>
            </div>
        </div>
    );
}

export default Footer;