import React, {useState} from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import Bookmark from './Bookmark';
import Rating from './Rating';

/*
For project pages add description, for address to rank/review and then average that rating, links to project socials/github/website,
request collaboration
*/


function ProjectCard(props) {
    const { url } = useRouteMatch();
    const verified = (props.isVerified);

    return (
        <>
            <div className="card-container">                
                    <Link className="cards-link" to={`${url}/${props.path}`}>
                        <figure className='card-pic-wrap' category={props.label}>
                            <img className="project-img" src={props.src}></img>
                        </figure>
                    </Link>
                    <div className="card-body">
                        <div className="project-card-title">                            
                            <h4>{props.title}</h4>
                            { verified && 
                                <div>
                                    <i class="fas fa-clipboard-check">Pro</i>
                                </div>
                            }
                        </div>
                        <div className="project-creator">
                           <img  src={props.creatorProfilePic}  className="creator-profile-pic"/>{" "}{props.username}{"   -   "}{props.createdOn}
                        </div>
                        <div className="project-summary">
                            {props.summary}
                        </div>
                    </div>
                    <div className="hl"></div>
                    <div className="card-footer">
                        <Rating
                         title = {props.title}          
                        />
                        <Bookmark 
                        projectTitle = {props.projectTitle}  
                        />
                    </div>               
            </div>
            
        </>
    )
}

export default ProjectCard;