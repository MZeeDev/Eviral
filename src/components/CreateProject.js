import React, { useState } from 'react';
import './CreateProject.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import construction from  "../img/construction.png";

function CreateNewProject(props) {  ///set input variables as required, add other attributes to be stored like tags, etc, allow for editing/updating?

    const { user, Moralis } = useMoralis();
    const { saveFile } = useMoralisFile();

    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [description, setDescription] = useState();
    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();  
    const [ projectPhotoPreview, setProjectPhotoPreview] = useState(construction);

    const createNewProject = async () => {
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
        await project.save();
        const relation = currentUser.relation("projects");
        relation.add(project);
        user.save();
        alert("New Project created!");
    }

    const onChangePhoto = e => {
        setPhotoFile(e.target.files[0]);
        setPhotoFileName(e.target.files[0].name);
        setProjectPhotoPreview(URL.createObjectURL(e.target.files[0]));
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
                                <input type="sumbit" value="Upload" className="btn btn-primary btn-block mt-1" />
                
                            </form>
                        </div>
                        <div className="form-text-wrapper">
                            <form className="form-text">
                                <div className="form-text-component">
                                    <label className="form-label">Project Title<span style={{color:"red"}}> *</span></label>
                                    <input className="form-input" placeholder="Create a title" value={title} required onChange={(event) =>setTitle(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Summary<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Enter brief description to display ( <150 characters )" maxLength={100} value={summary} required onChange={(event) =>setSummary(event.currentTarget.value)}/>
                                </div>
                                <div className="form-text-component">
                                    <label className="form-label">Description<span style={{color:"red"}}> *</span></label>
                                    <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 550 characters" maxLength={550} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/>
                                </div>
                                <span style={{color:"red"}}> * Required</span>
                            </form>
                        </div>
                        <button className="btn1" onClick={()=>{props.closeCreateProjectMenu(false)}}>Cancel</button>
                        <input type="button" className="submit-form btn2" value="Create Project" onClick={createNewProject} />
                    </div>
                </div>
            </div>
        </>      
        
    )
}

export default CreateNewProject
