import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMoralis } from 'react-moralis';
import UserProfile from "./UserProfile";
import AboutUser from "./AboutUser";
import ProjectCard from "./ProjectCard";
import Carousel from "./Carousel";
import SendMessagePopUp from "./SendMessagePopUp";
import Alert from "./Alert";


const UserProfilePage = ({ data }) => {
    
  const { user, Moralis } = useMoralis();  
  const { username } = useParams();
  
  const [ profileLoaded, setProfileLoaded ] = useState([""]);
  const [ projects, setProjects ] = useState([""]);
  const [sendMessagePopUpVisible, setSendMessagePopUpVisible] = useState(false);  
  const [ userPage, setUserPage] = useState(false);
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContents, setAlertContents] = useState();
  
  let init = 0;
  
  const loadProfile = async() => {
    const params = { userUsername: username };
    const profile = await Moralis.Cloud.run("userProfileData", params);    
    setProfileLoaded(profile);
    const projectsList = await Moralis.Cloud.run("renderUserProjects", params);
    setProjects(projectsList);
    console.log(projectsList);
    checkUserPage();
  };
    
  const checkUserPage = () => {
    const userLoaded =profileLoaded[0].username; 
    const userVisiter = user.attributes?.username;
    console.log(profileLoaded[0].username);
    console.log(user.attributes?.username);
    if(userLoaded == userVisiter) {
      setUserPage(true);
    } else {
      setUserPage(false);
    }
    console.log(userPage);
  }

  const userCheck = async() => {
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
    loadProfile();
    
    },
    [init],
  );


  return (
      <>  
        <div className="page-container">
            <div className="page-wrapper">
                <div className="profile-container">                
                    {profileLoaded.map(userProfile => (  
                        <UserProfile
                            username={userProfile.username}
                            profilePic={userProfile.profilePic}
                            userLocation={userProfile.userLocation}
                            skills={userProfile.skills}
                            website={userProfile.website}
                            bio={userProfile.bio}
                            createdOn = {userProfile.createdAt}
                            landscapePic={userProfile.landscapePic}
                            story={userProfile.story}
                            twitter={userProfile.twitter}
                            telegram={userProfile.telegram}
                            discord={userProfile.discord}
                            linkedIn={userProfile.linkedIn}
                            twitch={userProfile.twitch}
                            youtube={userProfile.youtube}
                        />                    
                    ))}   
                </div>
                <div className="sub-profile-container">
                    <div className="sub-profile-wrapper">
                        <div className="aboutme-container">
                    {!userPage &&                  
                      <button 
                        className="send-msg-button btn2" 
                        onClick={() => userCheck()}
                      > 
                        Send Message
                      </button>
                    }
                          
                            <div className="aboutme-wrapper">
                                {profileLoaded.map(userProfile => (  
                                  <AboutUser 
                                  website={userProfile.website}
                                  story={userProfile.story}
                                  userLocation={userProfile.userLocation}
                                  skills={userProfile.skills}
                                  website={userProfile.website}                             
                                  />
                                ))}  
                            </div>
                        </div>                    
                        <div className="profile-action-container">
                            <div className="profile-action-wrapper">
                            <div className="cards-background">
                              <div className='cards__container'>
                              <h5>Projects by {username}</h5>
                                  <div className='cards__wrapper'>
                                    <div className='cards__items'>
                                    <Carousel
                                      show={3}
                                      loop={true}
                                      >  
                                        {projects.map(project => (                                          
                                          <div key={project.title} className="cards__item">                            
                                              <ProjectCard
                                              title={project.title}
                                              summary={project.summary}
                                              src={project.projectPhoto}
                                              username={project.username}
                                              creatorProfilePic={project.profilePic}
                                              createdOn = {project.createdOn}
                                              label={project.username}
                                              path={project.title}
                                              />
                                          </div>
                                        ))}
                                        </Carousel>
                                    </div>
                                  </div>
                              </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        { sendMessagePopUpVisible &&
          <SendMessagePopUp
          visible={setSendMessagePopUpVisible}
          creatorProfilePic={profileLoaded[0].profilePic}
          creatorName={profileLoaded[0].username}
          />  
        }
        {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
        }
        </div>     
      </>
  );
};
export default UserProfilePage;