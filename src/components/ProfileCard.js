import React, {useState} from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';

import './ProfileCard.css';
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
                    <Link className="profile-cards-link" to={`${url}/${props.path}`}>
                        <figure className='profile-card-pic-wrap' category={props.label}>
                            <img className="profile-card-img" src={props.src}></img>
                        </figure>
                    </Link>
                    <div className="profile-card-body">
                        <div className="profile-card-title">
                            <h4>{props.title}</h4>
                        </div>                        
                        <div className="profile-summary">
                            <p>{props.bio}</p>
                        </div>
                    </div>
                    <div className="hl"></div>
                    <div className="card-footer">
                        <div className="rating">
                            <i class="fas fa-star"></i>
                            <span className="rating">{props.rating}</span>
                            <span className="review-count">{" "}({props.reviewCount})</span>
                        </div>
                        <div className="saveProfile" onClick={saveProject}>
                            {bookmark ? <i class="far fa-heart"></i> : <i class="fas fa-heart"></i>}
                        </div>
                    </div>
               
            </div>
            
        </>
    )
}

export default ProfileCard;