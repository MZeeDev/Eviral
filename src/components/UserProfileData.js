import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis } from 'react-moralis';
import UserProfile from "./UserProfile";
import AboutUser from "./AboutUser";
import ProjectCard from "./ProjectCard";


const UserProfilePage = ({ data }) => {
    
  const { Moralis } = useMoralis();  
  const { username } = useParams();
  
  const [ profileLoaded, setProfileLoaded ] = useState([""]);
  const [ projects, setProjects ] = useState([""]);
  let init = 0;

  const loadProfile = async() => {
    const params = { userUsername: username };
    const profile = await Moralis.Cloud.run("userProfileData", params);    
    setProfileLoaded(profile);
    const projectsList = await Moralis.Cloud.run("renderUserProjects", params);
    setProjects(projectsList);
    console.log(projects);
    console.log(projectsList);
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
                        />                    
                    ))}   
                </div>
                <div className="sub-profile-container">
                    <div className="sub-profile-wrapper">
                        <div className="aboutme-container">
                          
                            <div className="aboutme-wrapper">
                                {profileLoaded.map(userProfile => (  
                                  <AboutUser 
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
                                    </div>
                                  </div>
                              </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        </div>     
      </>
  );
};
export default UserProfilePage;