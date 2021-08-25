import React, {useState, useEffect} from 'react';

import './ProjectCard.css';
import './Project.css';
import './ProjectPage.css';
import ProfileCard from './ProfileCard';



function ProjectDisplay(props) {

  
  const [bookmark, setBookmark] = useState(true);

  const saveProject = () => {
      setBookmark(!bookmark);
  }

    return (           
      <>
          <div className="project-page-container">
            <div className="project-page-header">
              <div className="bookmark" onClick={saveProject}>
                  {bookmark ? <i class="far fa-bookmark bkmrk"></i> : <i class="fas fa-bookmark bkmrk"></i>}
              </div>
            </div>
            <div className="project-page-body">
              <div className="project-page-project-container">
                <div className="project-page-title">
                  <h2>{props.title}</h2>
                </div>
                <div className="project-page-summary">
                  {props.summary}
                </div>
                <div className="project-page-photo">
                  <img src={props.src} />
                </div>
              
                <div className="project-page-description">
                  <h3>About</h3>
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
