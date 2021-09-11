
import React, {useState, useEffect} from 'react';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import MyProjectsCard from './MyProjectsCard';
import Carousel from './Carousel';
import ProjectGridBox from './ProjectGridBox';
import './ProjectGrid.css';

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
        <React.Fragment>
          
          <div className="project-grid-container">
            <div className="my-project-grid-wrapper">
                {projects.map(listItem => (
                    <div key={listItem.title} className="project-grid-box">
                      <ProjectGridBox
                      title={listItem.title}
                      summary={listItem.summary}
                      src={listItem.projectPhoto}
                      username={listItem.username}
                      creatorProfilePic={listItem.profilePic}
                      createdOn = {listItem.createdOn}
                      label={listItem.username}
                      path={listItem.title}
                      isVerified = {listItem.isVerified}
                      />
                  </div>
                  ))}
                </div>
              <div className="pagination">
                <button className="pagination-prev" onClick={() => PagPrev()}><i class="fas fa-caret-square-left"></i>PREV</button>              
                <button className="pagination-next" onClick={() => PagNext()}>NEXT<i class="fas fa-caret-square-right"></i></button>
              </div>
            </div>

        </React.Fragment>
      </>
    )
}

export default LoadMyProject;
