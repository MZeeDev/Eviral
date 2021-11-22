import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Bookmark from '../../components/Bookmark';
import Rating from '../../components/Rating';
import './ProjectCard.css';

import tagLive from '../../img/tagLive.svg';
import tagIndev from '../../img/tagINDEV.svg';
import tagPro from '../../img/tagPro.svg';


function ProjectCard(props) {    
    const { url } = useRouteMatch();
    const verified = (props.isVerified);
    const isLive = (props.isLive);

    return (
        <>        
            <div className="projectcard-background">
                <div className="projectcard-contents">
                    <div className="projectcard-top">
                        <Link className="projectcard-link" to={`/projects/${props.path}`}>
                            <div className="projectcard-photo-container">
                                <img className="projectcard-photo" src={props.src}/>                                        
                                <div id="overlayprojectcard"></div>
                                <div className="projectcard-creator-info">
                                    <img className="projectcard-creator-profilepic" src={props.creatorProfilePic}/>
                                    <div className="projectcard-creator-nameanddate">
                                        <p className="projectcard-creator-username">{props.username}</p>
                                        <p className="projectcard-created-on-date">{props.createdOn}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="projectcard-bottom">
                        <div className="projectcard-text">
                            <h4 className="projectcard-title">{props.title}</h4>
                            <p className="projectcard-summary">{props.summary}</p>
                        </div>
                    </div>
                    <div className="projectcard-footer">
                        <Rating title={props.title}/>
                        <div className="project-card-badges">
                            { verified &&                      
                                <img id="project-card-badge" src={tagPro}/>                      
                            }
                            {isLive &&
                                <img id="project-card-badge" src={tagLive}/>                
                            }
                            {!isLive &&
                                <img id="project-card-badge" src={tagIndev}/>              
                            }
                        </div>
                        <Bookmark projectTitle={props.title}/>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectCard;
