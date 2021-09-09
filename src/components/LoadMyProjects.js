import React, {useState, useEffect} from 'react';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import MyProjectsCard from './MyProjectsCard';
import Carousel from './Carousel';

function LoadMyProject() {

  const { user, Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const initLoad = 0; // change later to accomodate refresh/sorting data

  const LoadProjects = async() => {
    const results = await Moralis.Cloud.run("renderMyProjects");
    setProjects(results);
    console.log(results);
  };

  useEffect(() => {
    LoadProjects();
    },
    [initLoad]
  );  

    return (           
      <>
        <React.Fragment>
          <div className="my-projects-cards">
            <div className="cards-background"> 
              <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <div className='cards__items'>
                    <Carousel
                        show={3}
                        loop={true}
                        >
                        {projects.map(listItem => (
                          <div key={listItem.title} className="cards__item">
                            <MyProjectsCard
                            title={listItem.title}
                            summary={listItem.summary}
                            src={listItem.projectPhoto}
                            username={listItem.username}
                            creatorProfilePic={listItem.profilePic}
                            createdOn = {listItem.createdOn}
                            label={listItem.username}
                            path={listItem.title}
                            />
                        </div>
                        ))}
                        </Carousel>     
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
