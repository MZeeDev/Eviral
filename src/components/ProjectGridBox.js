import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Bookmark from './Bookmark';
import Rating from './Rating';


function ProjectGridBox(props) {

    
    const { url } = useRouteMatch();
    const verified = (props.isVerified);
    const isLive = (props.isLive);

    return (
                  
        <div className="project-grid-box-wrapper">
                    <div className="project-card-badges">
                        {isLive &&
                            <div className="project-card-badge">
                                <i class="fas fa-chart-line">Live</i>
                            </div>
                        }
                        {!isLive &&
                            <div className="project-card-badge">
                                <i class="fas fa-wrench">InDev</i>
                            </div>
                        }
                        {verified &&
                            <div className="project-card-badge">
                                <i class="fas fa-clipboard-check">Pro</i>
                            </div>
                        }
                    </div>
            <div className="project-card-header">
                <Link
                    className="project-url-link"
                    to={`/projects/${props.path}`}
                    >
                        <img className="project-card-img" src={props.src}></img>
                </Link>
            </div>
            <div className="project-card-body">
                <div className="project-card-title">
                    <h4>{props.title}</h4>
                </div>
                <div className="project-card-creator">
                    <div className="project-card-creator-pic"><img  src={props.creatorProfilePic}  className="project-card-profilepic"/></div>
                    <div className="project-card-creator-name">{props.username}</div>
                </div>
                <div className="project-card-summary">
                    {props.summary}
                </div>
            </div>
            <div className="project-card-footer">
                <Rating
                    title = {props.title}
                />
                <div className="project-card-date">
                    {props.createdOn}
                </div>
                <Bookmark
                projectTitle = {props.title}
                />
            </div>
        </div>   
    )
}

export default ProjectGridBox;
