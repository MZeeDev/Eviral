import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import { useMoralis } from "react-moralis";

function AboutMe() {

    const { user } = useMoralis(); 

    return (
        <div className="profile-aboutme-container">
            <div className="profile-aboutme-wrapper">
            <p className="profile-location"><i class="fas fa-map-marker-alt"></i>{user.attributes?.userLocation} </p>
            <Link className="profile-website" to={{ pathname: (user.attributes?.website) }} target="_blank" aria-label='Website'><i class="fas fa-link"></i>{user.attributes?.website}</Link>

                <div className="profile-story">
                    <h5 className="profile-story-title">My Story</h5>
                    <p className="profile-story-description">{user.attributes?.story}</p>
                </div>
                <div className="profile-story">
                    <h5 className="profile-story-title">Skills</h5>
                    <p className="profile-story-description">{user.attributes?.skills}</p>
                </div>
                <div className="profile-story">
                    <h5 className="profile-story-title">Social Media</h5>
                    <div className='profile-social-icon-wrapper'>
                        <Link className='profile-social-icon twitter' to={{ pathname: (`https://twitter.com/${(user.attributes?.twitter)}`) }} target="_blank" aria-label='Twitter'>
                        <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className='profile-social-icon telegram' to={{ pathname: (`https://t.me/${(user.attributes?.telegram)}`) }} target="_blank" aria-label='Telegram'>
                        <i className="fab fa-telegram"></i>
                        </Link>
                        <Link className='profile-social-icon discord' to={{ pathname: (`https://discord.gg/${(user.attributes?.discord)}`) }} target="_blank" aria-label='Discord'>
                        <i className="fab fa-discord"></i>
                        </Link>
                        <Link className='profile-social-icon linkedIn' to={{ pathname: (`https://linkedin.com/in/${(user.attributes?.linkenIn)}`) }} target="_blank" aria-label='LinkedIn'>
                        <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link className='profile-social-icon youtube' to={{ pathname: (`https://youtube.com/c/${(user.attributes?.youtube)}`) }} target="_blank" aria-label='Youtube'>
                        <i className="fab fa-youtube"></i>
                        </Link>
                        <Link className='profile-social-icon twitch' to={{ pathname: (`https://twitch.tv/${(user.attributes?.twitch)}`) }} target="_blank" aria-label='Twitch'>
                        <i className="fab fa-twitch"></i>
                        </Link>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default AboutMe;
