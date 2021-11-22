import React from 'react';
import { Link } from 'react-router-dom';
import { ByMoralis } from 'react-moralis';
import DesktopLogo from '../../img/headerfulllogo.svg';
import './Footer.css'


function Footer() {
    return (
        // <div className="footer-container">
            <div className="footer">
                <h4>Our Socials</h4>
                <div className='social-icon-bar'>
                    <Link className='profile-social-icon twitter' to={{ pathname: (`https://twitter.com/viralcryptoapp`) }} target="_blank" aria-label='Twitter'>
                        <i className="fab fa-twitter"></i>
                    </Link>        
                    <Link className='profile-social-icon telegram' to={{ pathname: (`https://t.me/ViralCryptoApp`) }} target="_blank" aria-label='Telegram'>
                        <i className="fab fa-telegram"></i>
                    </Link>
                
                    <Link className='profile-social-icon discord' to={{ pathname: (`https://discord.gg/qVbhwxWsEZ`) }} target="_blank" aria-label='Discord'>
                        <i className="fab fa-discord"></i>
                    </Link>
                
                    <Link className='profile-social-icon linkedIn' to={{ pathname: (`https://www.linkedin.com/company/viralcrypto`) }} target="_blank" aria-label='LinkedIn'>
                        <i className="fab fa-linkedin"></i>
                    </Link>
                    <Link className='profile-social-icon youtube' to={{ pathname: (`https://medium.com/@ViralCrypto`) }} target="_blank" aria-label='Medium'>
                    <i class="fab fa-medium"></i>
                    </Link>
                    <Link className='profile-social-icon twitch' to={{ pathname: (`https://twitch.tv/@ViralCryptoApp`) }} target="_blank" aria-label='Twitch'>
                        <i className="fab fa-twitch"></i>
                    </Link>        
                    <Link className='profile-social-icon twitch' to={{ pathname: (`https://vm.tiktok.com/ZMRv5NxqA/`) }} target="_blank" aria-label='TikTok'>
                    <i class="fab fa-tiktok"></i>
                    </Link>        
                    <Link className='profile-social-icon twitch' to={{ pathname: (`https://www.instagram.com/p/CUbgem0jJ5U/?utm_medium=copy_kink`) }} target="_blank" aria-label='Instagram'>
                    <i class="fab fa-instagram"></i>
                    </Link>        
                </div>
                <img id="footerlogo" src={DesktopLogo}/>  
                <div className="footer-links">
                    <div className="footer-logo-and-links">
                        <Link to='/projects'  className='footer-link'>
                            Privacy Policy
                        </Link>
                        <Link to='/profiles'  className='footer-link'>
                            FAQ
                        </Link>
                        <Link to='/'  className='footer-link'>
                            Terms of Use
                        </Link>
                        <Link to='/'  className='footer-link'>
                            OnRamper
                        </Link>                                 
                    </div>
                    <div id="byMoralis">
                        <ByMoralis   width={250} variant="dark" />
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default Footer
