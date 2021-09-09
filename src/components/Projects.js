import React, {useState, useEffect} from 'react';
import { useRouteMatch  } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import Carousel from './Carousel';
import './SearchBar.css';
import ProjectGridBox from './ProjectGridBox';
import './ProjectGrid.css';
import './Pagination.css';

function ProjectsList({match}) {

  const { Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const [ savedProjects, setSavedProjects ] = useState([""]);
  const [ queryName, setQueryName] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [ searchResults, setSearchResults] = useState();
  const [ noneFound, setNoneFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  let initLoad = 0; // change later to accomodate refresh/sorting data

  const LoadProjects = async() => {
    const params = { skipAmount: pageNumber};
    const projectsList = await Moralis.Cloud.run("renderProjects", params);
    setProjects(projectsList);  
    console.log(projectsList);
  };

  const PagPrev = async() => {
    if(pageNumber == 0) {
      return;
    }
    let prevPageNumber = pageNumber - 1;
    await setPageNumber(prevPageNumber);
  }
  const PagNext = async() => {
    let nextPageNumber = pageNumber + 1;    
    await setPageNumber(nextPageNumber);
  }


  const LoadSavedProjects = async() => {
    const savedProjectsList = await Moralis.Cloud.run("renderSavedProjects");
    setSavedProjects(savedProjectsList);
  };

  const SearchProjects = async() => {
    setNoneFound(false);
    const params = { title: queryName};
    const projectsFound = await Moralis.Cloud.run("searchProjectsByName", params);
    if(projectsFound != ''){
      setSearchResults(projectsFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }

  useEffect(() => {
    LoadProjects();
    },
    [pageNumber],
  );  
  useEffect(() => {
    LoadSavedProjects();
    },
    [initLoad],
  );  

    return (           
      <>
        <div className="background">
        <div className="searchbar-container">
          <div className="searchbar-wrapper">          
              <input 
                type="text" 
                className="searchbar-text" 
                placeholder="Search projects by name" 
                value={queryName} 
                onChange={(event) =>setQueryName(event.currentTarget.value)} 
                onKeyPress={(event) => { if(event.key === "Enter") {SearchProjects()}}}
                />
              <button className="btn2 searchbtn" onClick={SearchProjects} ><i class="fas fa-search searchicon"></i>Search</button>
          </div>
        </div>
        <div className="foreground">
        {noneFound &&
          <div className="cards-background">
          <h3>Search Results</h3> 
            <div className='cards__container'>
                <div className='cards__wrapper'>
                <div>No results found. Searches are currently case sensitive. Try something else?</div>                  
              </div> 
              <button className="btn1" onClick={()=>setNoneFound(false)}>Close</button>
            </div> 
          </div> 
          }
          {showSearchResults &&
          <div className="cards-background">
            <div className="project-section-title">
              <h3>Search Results</h3> 
            </div>
            <button className="btn1" onClick={()=>setShowSearchResults(false)}>Close</button>
              <div className='cards__container'>
                  <div className='cards__wrapper'>                 
                    <div className='cards__items'>
                    <Carousel
                        show={3}
                        loop={true}
                        >
                        {searchResults.map(project => (                          
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
                              projectTitle = {project.title}
                              isVerified = {project.isVerified}   
                              />                            
                          </div>
                        ))}
                        </Carousel>
                    </div>
                  </div>
                </div>
            </div>
          }



              <div className="cards-background">
              <div className="project-section-title">
                <h3>NEWEST PROJECTS</h3>               
              </div>
              <div className="pagination">
                    <button className="pagination-prev" onClick={() => PagPrev()}><i class="fas fa-caret-square-left"></i>PREV</button>
                    
                    <button className="pagination-next" onClick={() => PagNext()}>NEXT<i class="fas fa-caret-square-right"></i></button>
                  </div>
                <div className="project-grid-container">
                  <div className="project-grid-wrapper">
                    { (projects).map(project => (
                      <div key={project.title} className="project-grid-box">
                          <ProjectGridBox
                          title={project.title}
                          summary={project.summary}
                          src={project.projectPhoto}
                          username={project.username}
                          creatorProfilePic={project.profilePic}
                          createdOn = {project.createdOn}
                          path={project.title}
                          isVerified = {project.isVerified}
                          />
                      </div>
                    ))}
                  </div>
                  <div className="pagination">
                    <button className="pagination-prev" onClick={() => PagPrev()}><i class="fas fa-caret-square-left"></i>PREV</button>
                    
                    <button className="pagination-next" onClick={() => PagNext()}>NEXT<i class="fas fa-caret-square-right"></i></button>
                  </div>
                </div>              
              </div>                   
              
      </div>
      </div>
      </>
    )
};

export default ProjectsList;
