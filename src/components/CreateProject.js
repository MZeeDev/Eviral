import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CreateProject.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import construction from  "../img/construction.png";
import Alert from './Alert';

import Exit from '../img/exit.svg';
import shareTelegram from '../img/shareIcons/telegram.svg';
import shareTwitter from '../img/shareIcons/twitter.svg';
import shareLinkedIn from '../img/shareIcons/linkedin.svg';
import shareDiscord from '../img/shareIcons/discord.svg';
import shareTwitch from '../img/shareIcons/twitch.svg';
import shareYoutube from '../img/shareIcons/youtube.svg';
import AddImage from '../img/addImage.svg';


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
    const [isLive, setIsLive] = useState(false);


    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();


    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();  
    const [ projectPhotoPreview, setProjectPhotoPreview] = useState(AddImage);

    const handleDescriptionOnChange = (e, editor) =>{
        const data = editor.getData();
        setDescription(data);
    }

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
            project.set("isLive", isLive);
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
                            <img id="exitMenu" src={Exit} onClick={() => {props.closeCreateProjectMenu(false)}}/>
                        </div>
                        <div id="project-pic-container">
                            <img className="project-pic2" src={projectPhotoPreview} alt="" />
                        </div>
                        <div className="form-photo-wrapper">  
                            <label htmlFor="projectPhoto" className="form-label">Upload a cover photo*</label>
                            <input className="form-control" type="file" accept="image/png, image/jpg, image/jpeg" multiple="false" id="projectPhoto" required onChange={onChangePhoto}/>
                        </div>
                        <div id="createProject-launchStatus">
                            <p>Has your project already launched or is it still in development?</p>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault" onClick={() => setIsLive(false)}/>
                                <p>In Development</p>
                            </div>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault" onClick={() => setIsLive(true)}/>
                                <p>Launched</p>
                            </div>              
                        </div>
                        <h4 id="createProject-aboutProject">About Project</h4>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Enter Project Name<span style={{color:"red"}}> *</span></label>
                            <input id="createProject-formInput-text" placeholder="Choose a unique name for your project" value={title} required onChange={(event) =>setTitle(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Summary<span style={{color:"red"}}> *</span></label>
                            <textarea rows={3} id="createProject-formInput-text" placeholder="Enter brief description to display ( <150 characters )" maxLength={150} value={summary} required onChange={(event) =>setSummary(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput-description">
                            <label id="createProject-formInput-title-description">Description<span style={{color:"red"}}> *</span></label>  
                            {/* <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 550 characters" maxLength={550} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/> */}
                            <CKEditor 
                                editor={ClassicEditor}
                                onChange={handleDescriptionOnChange}                                    
                            />
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Website</label>
                            <input id="createProject-formInput-text" placeholder="www.yourwebsite.com" value={website} onChange={(event) =>setWebsite(event.currentTarget.value)}/>
                        </div>
                        <span style={{color:"red"}}> * Required</span>                        
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTwitter}/></span>
                                <input id="createProject-social-text" value={twitter} placeholder=" @username" onChange={(event) =>setTwitter(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTelegram}/></span>
                                <input id="createProject-social-text" value={telegram} placeholder=" t.me/  LINK" onChange={(event) =>setTelegram(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareDiscord}/></span>
                                <input id="createProject-social-text" value={discord} placeholder=" @username" onChange={(event) =>setDiscord(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareLinkedIn}/></span>
                                <input id="createProject-social-text" value={linkedIn} placeholder=" linkedin.com/in/ Profile URL" onChange={(event) =>setLinkedIn(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareYoutube}/></span>
                                <input id="createProject-social-text" value={youtube} placeholder=" youtube.com/c/ channel URL" onChange={(event) =>setYoutube(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTwitch}/></span>
                                <input id="createProject-social-text" value={twitch} placeholder=" twitch.tv/ channel URL" onChange={(event) =>setTwitch(event.currentTarget.value)}/>
                        </div>
                            
                        <div className="form-button-wrapper">
                            <button id="createProject-button-submit" onClick={createNewProject}>Create New Project</button>                            
                            <button id="createProject-button-close" onClick={()=>{props.closeCreateProjectMenu(false)}}>Close Menu</button>
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
