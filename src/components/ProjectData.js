import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis } from 'react-moralis';
import ProjectDisplay from "./ProjectPage";

const ProjectPage = ({ data }) => {
    
  const { Moralis } = useMoralis();  
  const { title } = useParams();

  const [ projectLoaded, setProjectLoaded ] = useState([""]);
  let init = 0;

  const loadProject = async() => {
    const params = { projectTitle: title }
    const project = await Moralis.Cloud.run("projectData", params);
    setProjectLoaded(project);
  }

  useEffect(() => {
    loadProject();
    },
    [init],
  );


  return (
      <>
          {projectLoaded.map(project => (            
            <div key={project.title} className="project-page">                            
                <ProjectDisplay
                  title={project.title}
                  summary={project.summary}
                  src={project.projectPhoto}
                  creator={project.username}
                  creatorProfilePic={project.profilePic}
                  bio={project.bio}
                  createdOn = {project.createdOn}
                  label={project.username}
                  description={project.description}
                />
            </div>
          ))}        
      </>
    
  );
};

export default ProjectPage;