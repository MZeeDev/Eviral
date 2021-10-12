import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SocialIconBar from './SocialIconBar';
import './User.css';

function AboutUser(props) {

    return (
        <div className="profile-aboutme-container">
            <div className="profile-aboutme-wrapper">
            <p className="profile-location"><i class="fas fa-map-marker-alt"></i>{props.userLocation} </p>
            <Link className="profile-website" to={{ pathname: (props.website) }} target="_blank" aria-label='Website'><i class="fas fa-link"></i>{props.website}</Link>

                <div className="profile-story">
                    <h5 className="profile-story-title">My Story</h5>
                    <p className="profile-story-description">{props.story}</p>
                </div>
                <div className="profile-story">
                    <h5 className="profile-story-title">Skills</h5>
                    <p className="profile-story-description">{props.skills}</p>
                </div>                
            </div>            
            <SocialIconBar 
            twitter={props.twitter}
            telegram={props.telegram}
            discord={props.discord}
            linkedIn={props.linkedIn}
            twitch={props.twitch}
            youtube={props.youtube}/>
        </div>
    )
}

export default AboutUser;
