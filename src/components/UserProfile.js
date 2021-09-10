import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import SocialIconBar from './SocialIconBar';
import SaveProfile from './SaveProfile';

function UserProfile(props) {

    return (
        <>
            <div className="profile-wrapper">
                <div className="profile-background">
                    <img className='landscape-pic' src={props.landscapePic} alt=""/>   
                </div>
                <div className="profile-header">                        
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={props.profilePic} alt=""/>                        
                    </div>                        
                    <div className="profile-summary">
                        <h2 className="profile-page-username">{props.username} </h2>
                        <p className="profile-page-bio">{props.bio}</p>
                                          
                    </div>
                    <div className="edit-profile-wrapper">
                    <SaveProfile
                        profileName = {props.username}
                    />
                    </div>                     
                </div>                
            </div>            
        </>
    )
}


export default UserProfile
