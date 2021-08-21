import React, {useState, useEffect} from 'react';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';

function LoadMyProject() {

  const { user, Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const initLoad = 0; // change later to accomodate refresh/sorting data
  const myUsername = (user.attributes.username);

  const LoadProjects = async() => {
    const projectList = await Moralis.Cloud.run("renderMyProjects");
    setProjects(projectList);
    console.log(projects);
  };

  useEffect(() => {
    LoadProjects();
    },
    [initLoad]
  );  

    return (           
      <>
        <React.Fragment>
          <div className="cards">
            <h3 className="my-projects-title">My Projects</h3>
            <div className="cards-background"> 
            <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <div className='cards__items'>      
                        {projects.map(listItem => (
                          <div key={listItem.title} className="cards__item">
                            <ProjectCard
                            title={listItem.title}
                            summary={listItem.summary}
                            src={listItem.projectPhoto}
                            username={listItem.username}
                            creatorProfilePic={listItem.profilePic}
                            createdOn = {listItem.createdOn}
                            label={listItem.username}
                            />
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </React.Fragment>
      </>
    )
}

export default LoadMyProject;
