import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";

import './ProjectCard.css';
import './Project.css';
import './ProjectPage.css';
import ProfileCard from './ProfileCard';
import Rating from './Rating';
import Bookmark from './Bookmark';
import RatingProject from './RatingProject';
import Reviews from './Reviews';
import SocialIconBar from './SocialIconBar';
import SendMessagePopUp from './SendMessagePopUp';
import Alert from './Alert';
import EditProject from './EditProject';


function ProjectDisplay(props) {
  const { user, Moralis } = useMoralis();  

  const [ owner, setOwnerProject] = useState(false);
  const [sendMessagePopUpVisible, setSendMessagePopUpVisible] = useState(false);
  const [editProjectMenu, setOpenEditProjectMenu] = useState(false);
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContents, setAlertContents] = useState();
  
  const init = 0;

  const verified = (props.isVerified);

  const checkOwnership = async() => {
    const username = user.attributes?.username;
    if( username == props.creator) {
      setOwnerProject(true);
    }
  }

  const consoleLog = () => {
    console.log(props.title);
  }

  const userCheck = async() => {
    console.log(user);
    const eViral = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
    const beViral = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
    const balanceETH = eViral.balance;
    const balanceBSC = beViral.balance;
    if( (balanceETH < 100) && (balanceBSC < 100) ) {
      setAlertContents(
          <>
          <div className="alert-popup-contents">
          You'll need to own either eViral or beViral to access this feature.
          <Link to='/'><button className="btn2">Buy from Home Page</button></Link>
          </div>
          </>
          );
      setAlertVisible(true);
    }  else if (!user.attributes?.profileCreated) {
      setAlertContents(
          <>
      <div className="alert-popup-contents">
      You'll need to set up a Profile to access this feature.                
      </div>
      </>
      ) 
      setAlertVisible(true);
    } else {
      setSendMessagePopUpVisible(true);
    }
  }

  useEffect(() => {
    checkOwnership();    
  }, [init])

    return (           
      <>
        <div className="project-page">
          <div className="project-page-container">              
            <div className="project-page-body">
              <div className="project-page-project-container">
                <div className="project-page-title">
                { verified &&
                  <div>
                    <i class="fas fa-clipboard-check">Pro</i>
                  </div>
                  }
                  <h2>{props.title}</h2>
                  <Rating
                    title = {props.title}
                  />
                  <Bookmark
                  projectTitle = {props.projectTitle}
                  />
                </div>
                <div className="project-page-summary">
                  {props.summary}
                </div>
                <div className="project-page-photo">
                  <img  className="project-page-photo-img" src={props.src} />
                </div>
          
                <div className="project-page-description">
                  <h3>About</h3>
          
                  <div className="project-page-links">
                  <Link className="website-link" to={{ pathname: (props.website) }} target="_blank" aria-label='Website'><i class="fas fa-link"></i>{props.website}</Link>
                    <SocialIconBar
                      twitter={props.twitter}
                      telegram={props.telegram}
                      discord={props.discord}
                      linkedIn={props.linkedIn}
                      youtube={props.youtube}
                      twitch={props.twitch}
                    />
                  </div>
          
                  <h5><img className="profileThumb"src={props.creatorProfilePic} />{" "} {props.creator}{" "} {props.createdOn}</h5>
                  <p>{props.description}</p>
                </div>
                <div className="ratingReviews">
                  <Reviews 
                  title = {props.title}
                  />
                </div>
              </div>
              <div className="project-page-creator-container">
                <div className="project-page-creator-wrapper">
                  <div className="project-page-creator-profile-wrapper">
                    <h4>Project Creator</h4>
                    { !owner &&
                    <button className="send-msg-button btn2" onClick={() => userCheck()}> Send Message</button>
                    }
                    <ProfileCard
                      username={props.creator}
                      src={props.creatorProfilePic}
                      bio={props.bio}
                    />
                    {owner &&                
                        <div className="edit-project-btn-wrapper">
                          <button className= "edit-project-btn btn1" onClick={()=> setOpenEditProjectMenu(true)}>
                            <i class="fas fa-puzzle-piece"></i>
                            <span>Edit&nbsp;Project</span>
                          </button>                      
                        </div>                
                    }
              
                    { (owner && !verified) &&
                      <button className="verify-request-button btn2"> Get Verified</button>
                    }
                  </div>
                
                {!owner &&
                  <RatingProject 
                  projectName={props.title}
                  />
                }
                </div>
              </div>
            </div>
            <div className="project-page-footer-container">
              <div className="project-page-footer">
              </div>
            </div>
          </div>
        </div>
          { (!owner && sendMessagePopUpVisible) &&
            <SendMessagePopUp
            visible={setSendMessagePopUpVisible}
            creatorProfilePic={props.creatorProfilePic}
            creatorName={props.creator}
            projectPic={props.src}
            projectName={props.title}
            />
          }
          {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
        } 
        {editProjectMenu && 
        <EditProject 
        closeCreateProjectMenu={setOpenEditProjectMenu}
        title={props.title}
        summary={props.summary}
        description={props.description}
        website={props.website}
        projectPhoto={props.src}
        twitter={props.twitter}
        telegram={props.telegram}
        discord={props.discord}
        linkedIn={props.linkedIn}
        youtube={props.youtube}
        twitch={props.twitch}
        isOwner={owner}
        
        />}
          
      </>
    )
}

export default ProjectDisplay;
