import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Evolution to stay up to date 
                </p>
                <div className='input-areas'>
                    <form>
                        <input type='email' name='email' placeholder="Enter Email" className='footer-input'/>
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/termsofservice'>Contact Us</Link>
                        <Link to='/termsofservice'>Terms of Service</Link>
                    </div>
                </div>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Token Links</h2>
                        <Link to={{ pathname: "https://www.dextools.io/app/uniswap/pair-explorer/0xf38424fb7da8603e331aca2acb6cef8aed469fe2" }} target="_blank">Chart Tracker</Link>
                        <Link to={{ pathname: 'https://app.uniswap.org/#/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f&use=V2' }} target="_blank">Swap Page</Link>
                    </div>
                </div>
                <div className='footer-links-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Social Links</h2>
                        <Link to={{ pathname: 'https://t.me/eVIRALToken' }} target="_blank">Telergram</Link>
                        <Link to='/termsofservice'>Discord</Link>
                        <Link to={{ pathname: 'https://twitter.com/eVIRALToken' }} target="_blank">Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                        <i className="fas fa-dna"></i>
                    &#160;EVIRAL
                        </Link>
                    </div>
                    <small className='website-rights'> EVIRAL © 2021</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link twitter' to={{ pathname: 'https://twitter.com/eVIRALToken' }} target="_blank" aria-label='Twitter'>
                        <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className='social-icon-link telegram' to={{ pathname: 'https://t.me/eVIRALToken' }} target="_blank" aria-label='Telegram'>
                        <i className="fab fa-telegram"></i>
                        </Link>
                        <Link className='social-icon-link discord' to='/' target="_blank" aria-label='Discord'>
                        <i className="fab fa-discord"></i>
                        </Link>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Footer;
