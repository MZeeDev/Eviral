import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis } from 'react-moralis';
import ProjectDisplay from "./ProjectPage";
import ProjectPage from "./V2/ProjectPage";

const ProjectData = ({ data }) => {
    
  const { Moralis, isInitialized } = useMoralis();  
  const { title } = useParams();

  const [ projectLoaded, setProjectLoaded ] = useState([""]);
  let init = 0;

  const loadProject = async() => {
    const params = { projectTitle: title };
    const project = await Moralis.Cloud.run("projectData", params);
    setProjectLoaded(project);
  }

  useEffect(() => {
    if(isInitialized){
    loadProject();
    }
    },
    [isInitialized],
  );

    
  return (
      <>
          {projectLoaded.map(project => (            
            <div key={project.title} className="background">
                <ProjectDisplay
                  title={project.title}
                  summary={project.summary}
                  photo1={project.projectPhoto}
                  photo2={project.projectPhoto1}
                  photo3={project.projectPhoto2}
                  creator={project.username}
                  creatorProfilePic={project.profilePic}
                  bio={project.bio}
                  createdOn = {project.createdOn}
                  label={project.username}
                  description={project.description}  
                  projectTitle = {project.title}
                  website={project.website}                
                  twitter={project.twitter}
                  telegram={project.telegram}
                  discord={project.discord}
                  linkedIn={project.linkedIn}
                  youtube={project.youtube}
                  twitch={project.twitch}
                  objectId = {project.objectId}  
                  isVerified = {project.isVerified}
                  isLive = {project.isLive}    
                  blockchains = {project.blockchains}
                  featureTags = {project.featureTags}          
                />                
            </div>
          ))}        
      </>
    
  );
};

export default ProjectData;