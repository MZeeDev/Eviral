import React, { useState } from 'react';
import './CreateProject.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import construction from  "../img/construction.png";
import Alert from './Alert';

function CreateNewProject(props) {  ///set input variables as required, add other attributes to be stored like tags, etc, allow for editing/updating?

    const { user, Moralis } = useMoralis();
    const { saveFile } = useMoralisFile();

    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [description, setDescription] = useState();

    const [website, setWebsite] = useState();
    const [twitter, setTwitter] = useState();
    const [telegram, setTelegram] = useState();
    const [discord, setDiscord] = useState();
    const [linkedIn, setLinkedIn] = useState();
    const [youtube, setYoutube] = useState();
    const [twitch, setTwitch] = useState();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();


    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();  
    const [ projectPhotoPreview, setProjectPhotoPreview] = useState(construction);

    const createNewProject = async () => {
        try {
            const newProject = Moralis.Object.extend("Projects");
            const project = new newProject();
            const file = photoFile;
            const name = photoFileName;
            const date = new Date();
            const currentUser = await Moralis.User.current();
            const username = currentUser.attributes.username;
            const profilePic = currentUser.attributes.profilePic._url;
            const userObjectId =currentUser.attributes.userObjectId;
            let fileIpfs = await saveFile(name, file, { saveIPFS: true });
            project.set('projectPhoto', fileIpfs);
            project.set('title', title);
            project.set('creator', currentUser);
            project.set("createdBy", username);
            project.set("creatorProfilePic", profilePic);
            project.set('summary', summary);
            project.set('description', description);
            project.set('date', date.toLocaleDateString());
            project.set("creatorId", userObjectId);
            project.set("website", website === "" ? undefined : website);
            project.set("twitter", twitter === "" ? undefined : twitter);
            project.set("telegram", telegram === "" ? undefined : telegram);
            project.set("discord", discord === "" ? undefined : discord);
            project.set("linkedIn", linkedIn === "" ? undefined : linkedIn);
            project.set("youtube", youtube === "" ? undefined : youtube);
            project.set("twitch", twitch === "" ? undefined : twitch);
            await project.save();
            const relation = currentUser.relation("projects");
            relation.add(project);
            user.save();
            setAlertContents("New Project created!");
            setAlertVisible(true);
            (props.closeCreateProjectMenu(false));
        } catch (error) {
            alert(error)
        }
    }

    const onChangePhoto = e => {
        setPhotoFile(e.target.files[0]);
        setPhotoFileName(e.target.files[0].name);
        setProjectPhotoPreview(URL.createObjectURL(e.target.files[0]));
        setAlertContents("Uploaded!");
        setAlertVisible(true);
    };
   

    return (
        <>
            <div className="createProject-background">
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h3 className="menu-title"> Create a Project </h3>
                            <span className="exitMenu" onClick={() => {props.closeCreateProjectMenu(false)}}><i class="far fa-times-circle"></i></span>
                        </div>
                        <div className="project-pic-container">
                            <img className="project-pic" src={projectPhotoPreview} alt="" />
                        </div>
                        <div className="form-photo-wrapper">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="projectPhoto" className="form-label">Upload a Cover Photo<span style={{color:"red"}}> *</span></label>
                                    <input className="form-control" type="file" accept="image/png, image/jpg, image/jpeg" multiple="false" id="projectPhoto" required onChange={onChangePhoto}/>
                                </div>
                                
                
                            </form>
                        </div>
                        <div className="form-text-wrapper">
                            <form className="form-text">
                                <div className="form-text-component">
                                    <label className="form-label">Project Name<span style={{color:"red"}}> *</span></label>
                                    <input className="form-input" placeholder="Create a title" value={title} required onChange={(event) =>setTitle(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Summary<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Enter brief description to display ( <150 characters )" maxLength={150} value={summary} required onChange={(event) =>setSummary(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Description<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 2000 characters" maxLength={2000} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Website</label>
                                    <input className="form-input" placeholder="www.yourpage.com" value={website} onChange={(event) =>setWebsite(event.currentTarget.value)}/>
                                </div>
                                <span style={{color:"red"}}> * Required</span>
                             
                            </form>
                        </div>
                        <div className="update-socials">
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-twitter update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={twitter} placeholder=" @username" onChange={(event) =>setTwitter(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-telegram update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={telegram} placeholder=" t.me/  LINK" onChange={(event) =>setTelegram(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-discord update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input  className="input-social-text-box"value={discord} placeholder=" discord.gg/ LINK" onChange={(event) =>setDiscord(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-linkedin update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={linkedIn} placeholder=" linkedin.com/in/ Profile URL" onChange={(event) =>setLinkedIn(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-youtube update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={youtube} placeholder=" youtube.com/c/ channel URL" onChange={(event) =>setYoutube(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-twitch update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={twitch} placeholder=" twitch.tv/ channel URL" onChange={(event) =>setTwitch(event.currentTarget.value)}/>
                                </div>
                            </div>
                            </div>
                        <div className="form-button-wrapper">
                            <button className="btn1" onClick={()=>{props.closeCreateProjectMenu(false)}}>Close Menu</button>
                            <input type="button" className="submit-form btn2" value="Create Project" onClick={createNewProject} />
                        </div>
                    </div>
                </div>
            </div>
            {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
            }
        </>      
        
    )
}

export default CreateNewProject
