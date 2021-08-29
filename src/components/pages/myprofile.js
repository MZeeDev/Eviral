import React, {useState} from 'react';
import '../../App.css';
import Profile from '../Profile'
import UpdateProfile from '../UpdateProfile.js';
import CreateProject from '../CreateProject.js';
import AboutMe from '../AboutMe';
import '../../components/User.css';
import LoadMyProjects from '../LoadMyProjects';



function MyProfile() {

    
    const [createProjectMenu, setOpenCreateProjectMenu] = useState(false);
    const [editProfileMenu, setOpenEditProfileMenu] = useState(false);

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
                                <LoadMyProjects />
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>            
            <div className="projects">
                {createProjectMenu && <CreateProject closeCreateProjectMenu={setOpenCreateProjectMenu}/>}
                {editProfileMenu && <UpdateProfile closeEditProfileMenu={setOpenEditProfileMenu}/>}
            </div>
        </div>
        </div>
    )
}

export default MyProfile;
