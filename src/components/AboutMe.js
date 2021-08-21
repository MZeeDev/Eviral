import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import { useMoralis } from "react-moralis";

function AboutMe() {

    const { user } = useMoralis(); 

    return (
        <div className="profile-aboutme-container">
            <div className="profile-aboutme-wrapper">
                <div className="profile-story">
                    <h4 className="profile-story-title">My Story</h4>
                    <p className="profile-story-description">{user.attributes?.story}</p>
                </div>
                <p className="profile-location"><i class="fas fa-map-marker-alt"></i>{user.attributes?.userLocation} </p>
                <a className="profile-website" href={user.attributes?.website} ><i class="fas fa-link"></i>{user.attributes?.website}</a>
                
                <div className="profile-heading-socials">
                    <div className='social-icon-wrapper'>
                        <Link className='social-icon twitter' to={{ pathname: (user.attributes.twitter) }} target="_blank" aria-label='Twitter'>
                        <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className='social-icon telegram' to={{ pathname: (user.attributes.telegram) }} target="_blank" aria-label='Telegram'>
                        <i className="fab fa-telegram"></i>
                        </Link>
                        <Link className='social-icon discord' to={{ pathname: (user.attributes.discord) }} target="_blank" aria-label='Discord'>
                        <i className="fab fa-discord"></i>
                        </Link>
                        <Link className='social-icon linkedIn' to={{ pathname: (user.attributes.linkenIn) }} target="_blank" aria-label='LinkedIn'>
                        <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link className='social-icon youtube' to={{ pathname: (user.attributes.youtube) }} target="_blank" aria-label='Youtube'>
                        <i className="fab fa-youtube"></i>
                        </Link>
                        <Link className='social-icon twitch' to={{ pathname: (user.attributes.twitch) }} target="_blank" aria-label='Twitch'>
                        <i className="fab fa-twitch"></i>
                        </Link>
                    </div>
                </div>
                <p className="profile-description">{user.attributes?.description}</p>
            </div>            
        </div>
    )
}

export default AboutMe;
