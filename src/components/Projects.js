import React, {useState, useEffect} from 'react';
import { Link, Route, useRouteMatch  } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import ProjectPage from './ProjectData';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';

function ProjectsList({match}) {
  const { url } = useRouteMatch();

  const { Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const initLoad = 0; // change later to accomodate refresh/sorting data

  const LoadProjects = async() => {
    const projectsList = await Moralis.Cloud.run("renderProjects");
    setProjects(projectsList);
    console.log(projects);
  };

  useEffect(() => {
    LoadProjects();
    },
    [initLoad],
  );  

    return (           
      <>
      <button onClick={LoadProjects}>LOAD</button>
      {url}
        <React.Fragment>
          <div className="cards">
            <h3>NEWEST PROJECTS</h3> 
            <div className="cards-background">
              <div className='cards__container'>
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
        </React.Fragment>
        
        

        
        <Route path={`${url}/:title`} >
              <ProjectPage data={projects} />
        </Route>
        
      </>
    )
};

export default ProjectsList;
