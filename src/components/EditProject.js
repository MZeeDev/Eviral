import React, { useState } from 'react';
import './EditProject.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import Alert from './Alert';

function EditProject(props) {  ///set input variables as required, add other attributes to be stored like tags, etc, allow for editing/updating?

    const { user, Moralis } = useMoralis();
    const { saveFile } = useMoralisFile();

    const [title, setTitle] = useState((props.title));
    const [summary, setSummary] = useState(props.summary);
    const [description, setDescription] = useState(props.description);

    const [website, setWebsite] = useState(props.website);
    const [twitter, setTwitter] = useState(props.twitter);
    const [telegram, setTelegram] = useState(props.telegram);
    const [discord, setDiscord] = useState(props.discord);
    const [linkedIn, setLinkedIn] = useState(props.linkedIn);
    const [youtube, setYoutube] = useState(props.youtube);
    const [twitch, setTwitch] = useState(props.twitch);
    const [isOwner, setIsOwner] = useState(props.isOwner);


    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();


    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();  
    const [ projectPhotoPreview, setProjectPhotoPreview] = useState(props.projectPhoto);

    const deletePopUp = async () => {
        setAlertContents(
            <div className="verify-delete-popup">
                Are you sure you want to delete this project?
                <button className="submit-form btn3" onClick={deleteProject}>Delete Project</button>
            </div>
        );
        setAlertVisible(true);
    }

    const deleteProject = async() => {
        const params = { projectTitle: (props.title) }; 
        console.log(params);
        const project = await Moralis.Cloud.run("getProjectByName", params);
        console.log(project);
        
        const currentProject = project;
        currentProject.destroy().then((object) => {
            alert("You can always create something new!");
        }, (error) => {
            alert(error)
        });
    }


    const editProject = async () => {
        try {            
            const params = { projectTitle: (props.title) }; 
            const project = await Moralis.Cloud.run("getProjectByName", params);
            const currentProject = project[0];
            const file = photoFile;
            const name = photoFileName;
            let fileIpfs = await saveFile(name, file, { saveIPFS: true });
            currentProject.set('projectPhoto', fileIpfs);
            currentProject.set('title', title);
            currentProject.set('summary', summary);
            currentProject.set('description', description);
            currentProject.set("website", website === "" ? undefined : website);
            currentProject.set("twitter", twitter === "" ? undefined : twitter);
            currentProject.set("telegram", telegram === "" ? undefined : telegram);
            currentProject.set("discord", discord === "" ? undefined : discord);
            currentProject.set("linkedIn", linkedIn === "" ? undefined : linkedIn);
            currentProject.set("youtube", youtube === "" ? undefined : youtube);
            currentProject.set("twitch", twitch === "" ? undefined : twitch);
            await currentProject.save();
            setAlertContents("Updates Sumbitted!");
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
                            <h3 className="menu-title"> Edit Project </h3>
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
                                    <label className="form-label">Project Title<span style={{color:"red"}}> *</span></label>
                                    <input className="form-input" placeholder={title} value={title} required onChange={(event) =>setTitle(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Summary<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Enter brief description to display ( <150 characters )" maxLength={150} value={summary} required onChange={(event) =>setSummary(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Description<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 550 characters" maxLength={550} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/>
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
                            <button className="submit-form btn1" onClick={()=>{props.closeCreateProjectMenu(false)}}>Close Menu</button>
                            <button className="submit-form btn2" onClick={editProject}>Sumbit Changes</button>
                            {isOwner && <button className="submit-form btn3" onClick={deletePopUp}>Delete Project</button>}
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

export default EditProject;
