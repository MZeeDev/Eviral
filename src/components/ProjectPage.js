import React, {useState, useEffect} from 'react';

import './ProjectCard.css';
import './Project.css';
import './ProjectPage.css';
import ProfileCard from './ProfileCard';
import Rating from './Rating';
import Bookmark from './Bookmark';



function ProjectDisplay(props) {

    console.log(props.objectId);
    return (           
      <>
        <div className="project-page-container">
          <div className="project-page-header">            
          </div>
          <div className="project-page-body">
            <div className="project-page-project-container">
              <div className="project-page-title">
                <h2>{props.title}</h2>
                
                <Bookmark 
                projectTitle = {props.projectTitle}
                />
              </div>
              <div className="project-page-summary">
                {props.summary}
              </div>
              <div className="project-page-photo">
                <img src={props.src} />
              </div>
            
              <div className="project-page-description">
                <h3>About</h3>
                <Rating 
                  rating={props.rating}
                  reviewCount={props.reviewCount}
                />
                <h5>Created by {""} <img className="profileThumb"src={props.creatorProfilePic} />{props.creator} on {""} {props.createdOn}</h5>
                <p>{props.description}</p>
              </div>
            </div>
            <div className="project-page-creator-container">
              <div className="project-page-creator-wrapper">
                <h4>Project Creator</h4>
                <ProfileCard
                  title={props.creator}
                  src={props.creatorProfilePic}
                  bio={props.bio}
                />
              </div>
            </div>
          </div>
          <div className="project-page-footer-container">
            <div className="project-page-footer">

            </div>
          </div> 
        </div>  
      </>
    )
}

export default ProjectDisplay;
