import React, {useState, useEffect} from 'react';
import { useRouteMatch  } from 'react-router-dom';
import ProjectCard from '../components/V2/ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import Carousel from './Carousel';
import './SearchBar.css';
import './ProjectGrid.css';
import './Pagination.css';
import SearchGlass from '../img/searchglass.svg';
import Left from '../img/leftpagination.png';
import Right from '../img/rightpagination.png';


function ProjectsList({match}) {

  const { user, Moralis, isInitialized } = useMoralis();

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
    if(isInitialized){
    LoadProjects();
    }
    },
    [pageNumber, isInitialized],
  );  
  useEffect(() => {
    if(user){
      LoadSavedProjects();
    }
    },
    [initLoad],
  );  

    return (          
      <>
          <div className="project-section-title">
            Projects               
          </div>          
          <div className="searchbar-container">
            <div className="searchbar-wrapper">          
                <input 
                  type="text" 
                  className="searchbar-text" 
                  placeholder="Search projects by name..." 
                  value={queryName} 
                  onChange={(event) =>setQueryName(event.currentTarget.value)} 
                  onKeyPress={(event) => { if(event.key === "Enter") {SearchProjects()}}}
                  />
                <button className="searchbar-button" onClick={SearchProjects} >Search<img id="searchbarglass" src={SearchGlass}/></button>
            </div>
          </div>
            {noneFound &&
              <>
                <div className="project-section-title">
                  Search Results               
                </div>  
                <h5 id="notfoundmessage">No results found. Searches are currently case sensitive. Try something else?</h5>                  
                <button className="searchbar-close" onClick={()=>setNoneFound(false)}>Close</button>
              </>   
            }    
            {showSearchResults &&
              <>
                <div className="project-section-title">
                  Search Results
                </div>
                <button className="searchbar-close" onClick={()=>setShowSearchResults(false)}>Return</button>
                <div className="project-grid-wrapper">
                  {searchResults.map(project => (
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
              </>
            }       
            {!showSearchResults &&       
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
            }
            <div className="pagination">
                  <button className="pagination-prev" onClick={() => PagPrev()}><img id="leftarrow" src={Left}/></button>                    
                  <button className="pagination-next" onClick={() => PagNext()}><img id="rightarrow" src={Right}/></button>
            </div>              
      </>      
    )
};

export default ProjectsList;
