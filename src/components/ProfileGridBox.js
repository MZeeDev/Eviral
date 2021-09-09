import React, {useState} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import SaveProfile from './SaveProfile';

function ProfileGridBox(props) {
    const { url } = useRouteMatch();

    return (    
        <div className="project-grid-box-wrapper">
            <div className="profile-box-header">
                <Link
                    className="project-url-link"
                    to={`${url}/${props.username}`}
                    >
                        <img className="project-card-img" src={props.landscapePic}></img>
                </Link>
            </div>
            <div className="profile-box-body">
                <div className="profile-box-profilepic">
                    <img  src={props.profilePic}  className="profile-box-profile-img"/>
                    <div className="profile-box-creator">
                        {props.username}
                    </div>
                </div>
                <div className="profile-box-summary">
                    {props.bio}
                </div>
            </div>
            <div className="profile-box-footer">
                <div className="saveProfile">
                    <SaveProfile 
                    profileName = {props.username}
                    />
                </div>
            </div>
        </div>   
    )
}

export default ProfileGridBox;
