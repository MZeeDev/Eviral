import React, {useState, useEffect} from 'react';
import '../../App.css';
import Profile from '../Profile';
import { useMoralis } from 'react-moralis';
import UpdateProfile from '../UpdateProfile.js';
import CreateProject from '../CreateProject.js';
import AboutMe from '../AboutMe';
import '../../components/User.css';
import LoadMyProjects from '../LoadMyProjects';
import Alert from '../Alert';
import ProjectCard from '../ProjectCard';
import ProfileCard from '../ProfileCard';
import ProjectGridBox from '../ProjectGridBox';



function MyProfile() {

    const { Moralis } = useMoralis();
    
    const [createProjectMenu, setOpenCreateProjectMenu] = useState(false);
    const [editProfileMenu, setOpenEditProfileMenu] = useState(false);    
    const [ savedProjects, setSavedProjects ] = useState([""]);    
    const [ usersSaved, setUsersSaved ] = useState([""]);
    let initLoad = 0;

    const LoadSavedProjects = async() => {
        const savedProjectsList = await Moralis.Cloud.run("renderSavedProjects");
            setSavedProjects(savedProjectsList);
    };

    const LoadSavedProfiles = async () => {
        const savedProfiles = await Moralis.Cloud.run("loadSavedProfiles");
        setUsersSaved(savedProfiles);
    };

    useEffect(() => {
    LoadSavedProjects();
    LoadSavedProfiles();
    },
    [initLoad],
    );  

    return (
        <div>
        <div className="page-container">
            <div className="page-wrapper">
                <div className="profile-container">                    
                    <Profile openCreateProjectMenu={setOpenCreateProjectMenu} openEditProfileMenu={setOpenEditProfileMenu}/> 
                </div>                
                <div className="sub-profile-container">
                    <div className="sub-profile-wrapper">
                        <div className="aboutme-container">
                            <div className="aboutme-wrapper">
                                <AboutMe />
                            </div>
                        </div>                    
                        <div className="profile-action-container">
                            <div className="profile-action-wrapper">
                                <div className="project-section-title">
                                    <h3>MY PROJECTS</h3>               
                                </div>
                                <LoadMyProjects />
                                <div className="project-section-title">
                                    <h3>SAVED PROJECTS</h3>               
                                </div>
                                <div className="project-grid-container">
                                    <div className="my-project-grid-wrapper">
                                        {savedProjects.map(listItem => (
                                            <div key={listItem.title} className="project-grid-box">
                                            <ProjectGridBox
                                            title={listItem.title}
                                            summary={listItem.summary}
                                            src={listItem.projectPhoto}
                                            username={listItem.username}
                                            creatorProfilePic={listItem.profilePic}
                                            createdOn = {listItem.createdOn}
                                            label={listItem.username}
                                            path={listItem.title}
                                            isVerified = {listItem.isVerified}
                                            />
                                        </div>
                                        ))}
                                    </div>
                                </div>
                               
                                <div className="project-section-title">
                                    <h3>SAVED PROFILES</h3>               
                                </div>

                                <div className='cards__container'>             
                                    <div className='project-cards__wrapper'>
                                        <div className='cards__items'>      
                                            {usersSaved.map(userProfile => (
                                                <div key={userProfile.username} className="cards__item">
                                                <ProfileCard
                                                bio={userProfile.bio}
                                                src={userProfile.profilePic}
                                                username={userProfile.username}         
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
            <div className="projects">
                {createProjectMenu && <CreateProject closeCreateProjectMenu={setOpenCreateProjectMenu}/>}
                {editProfileMenu && 
                <UpdateProfile 
                closeEditProfileMenu={setOpenEditProfileMenu}
                />}
            </div>
        </div>
        </div>
    )
}

export default MyProfile;
