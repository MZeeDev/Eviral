
import React, {useState, useEffect} from 'react';
import ProjectCard from '../components/V2/ProjectCard';
import '../components/V2/ProjectCard';
import './Project.css';
import { useMoralis } from 'react-moralis';
import MyProjectsCard from './MyProjectsCard';
import Carousel from './Carousel';
import ProjectGridBox from './ProjectGridBox';
import './ProjectGrid.css';


import Left from '../img/leftpagination.png';
import Right from '../img/rightpagination.png';

function LoadMyProject() {

  const { user, Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const [pageNumber, setPageNumber] = useState(0);

  const LoadProjects = async() => {
    const params = { page : pageNumber};
    const results = await Moralis.Cloud.run("renderMyProjects", params);
    setProjects(results);
    console.log(pageNumber);
    console.log(results);
  };

  const PagPrev = () => {
    if(pageNumber == 0) {
      return;
    }
    let prevPageNumber = pageNumber - 1;
    setPageNumber(prevPageNumber);
  }

  const PagNext = () => {
    let nextPageNumber = pageNumber + 1;    
    setPageNumber(nextPageNumber);
  }

  useEffect(() => {
    LoadProjects();
    },
    [pageNumber]
  );  

    return (           
      <>
        <div className="project-grid-wrapper">
          { (projects).map(project => (
          <div key={project.title} >
              <ProjectCard
              title={project.title}
              summary={project.summary}
              src={project.projectPhoto}
              username={project.username}
              creatorProfilePic={project.profilePic}
              createdOn = {project.createdOn}
              path={project.title}
              isVerified = {project.isVerified}
              isLive={project.isLive}                          
              />
          </div>
          ))}
        </div>
        <div className="pagination">
            <button className="pagination-prev" onClick={() => PagPrev()}><img id="leftarrow" src={Left}/></button>                    
            <button className="pagination-next" onClick={() => PagNext()}><img id="rightarrow" src={Right}/></button>
        </div>     
      </>
    )
}

export default LoadMyProject;
