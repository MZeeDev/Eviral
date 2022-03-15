import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            
            <div className='footer-links'>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to="/">Homepage</Link>
                        <Link to={{ pathname: 'https://t.me/ViralCryptoApp' }}>Contact Us</Link>
                    </div>
                </div>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Token Links</h2>
                        <Link to={{ pathname: "https://www.dextools.io/app/uniswap/pair-explorer/0xf38424fb7da8603e331aca2acb6cef8aed469fe2" }} target="_blank">Chart Tracker</Link>
                        <Link to={{ pathname: 'https://app.uniswap.org/#/swap?use=V2&chain=mainnet&outputCurrency=0x77a2F05cb71e2DA093764DC83D7a59C1Fe09f43A' }} target="_blank">Swap Page</Link>
                    </div>
                </div>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Social Links</h2>
                        <Link to={{ pathname: 'https://t.me/ViralCryptoApp' }} target="_blank"><i className="fab fa-telegram"></i>{"  "}Telergram</Link>
  
                        <Link to={{ pathname: 'https://twitter.com/ViralCryptoApp' }} target="_blank"><i className="fab fa-twitter"></i>{"  "}Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        
                    </div>
                    <small className='website-rights'> </small>
                    <div className='social-icons'>
                        
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Footer;
