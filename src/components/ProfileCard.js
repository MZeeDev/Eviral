import React, {useState} from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';

import './ProfileCard.css';
import SaveProfile from './SaveProfile';
/*
For project pages add description, for address to rank/review and then average that rating, links to project socials/github/website,
request collaboration
*/


function ProfileCard(props) {
    const { url } = useRouteMatch();

    const [bookmark, setBookmark] = useState(true);

    const saveProject = () => {
        setBookmark(!bookmark);
    }

    return (
        <>
            <div className="profile-card-container">                
                    <div className="profile-card-wrapper">
                        <Link className="profile-cards-link" to={`${url}/${props.username}`}>
                            <figure className='profile-card-pic-wrap' category={props.label}>
                                <img className="profile-card-img" src={props.src}></img>
                            </figure>
                        </Link>
                        <div className="profile-card-body">
                            <div className="profile-card-title">
                                <h4>{props.username}</h4>
                            </div>
                            <div className="profile-summary">
                                <p>{props.bio}</p>
                            </div>
                        </div>
                        <div className="hl"></div>
                        <div className="profile-card-footer">
                            <div className="saveProfile" onClick={saveProject}>
                                <SaveProfile
                                profileName = {props.username}
                                />
                            </div>
                        </div>
                    </div>
               
            </div>
            
        </>
    )
}

export default ProfileCard;