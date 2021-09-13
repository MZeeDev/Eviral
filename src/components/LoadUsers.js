import React, {useState, useEffect} from 'react';
import ProfileCard from './ProfileCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import './SearchBar.css';
import './ProjectGrid.css';
import ProfileGridBox from './ProfileGridBox';

function LoadUsers() {

  const { Moralis } = useMoralis();
  const [ users, setUsers ] = useState([""]);
  const [ usersSaved, setUsersSaved ] = useState([""]);  
  const [ queryProfile, setQueryProfile] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [ searchResults, setSearchResults] = useState();
  const [ noneFound, setNoneFound] = useState(false);
  
  const [pageNumber, setPageNumber] = useState(0);
  const initLoad = 0; // change later to accomodate refresh/sorting data

  
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

  const LoadUsers = async() => {
    console.log(pageNumber);
    const params = { pageNum: pageNumber};
    const userList = await Moralis.Cloud.run("loadUsers", params);
    setUsers(userList);
  };

  const SavedProfiles = async () => {
    const savedProfiles = await Moralis.Cloud.run("loadSavedProfiles");
    setUsersSaved(savedProfiles);
  }

  const SearchProfiles = async() => {
    setNoneFound(false);
    const params = { username: queryProfile};
    const usersFound = await Moralis.Cloud.run("searchUsersByName", params);
    if(usersFound != ''){
      setSearchResults(usersFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }

  useEffect(() => {
    LoadUsers();
    },
    [pageNumber]
  );  

  useEffect(() => {
    SavedProfiles();
    },
    [initLoad]
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
                value={queryProfile} 
                onChange={(event) =>setQueryProfile(event.currentTarget.value)} 
                onKeyPress={(event) => { if(event.key === "Enter") {SearchProfiles()}}}
                />
              <button className="btn2 searchbtn" onClick={SearchProfiles} ><i class="fas fa-search searchicon"></i>Search</button>
          </div>
                </div>
        </div>
      {noneFound &&
        <div className="cards-background">
        <h3>Search Results...<button className="btn1" onClick={()=>setNoneFound(false)}>Close</button></h3> 
          <div className='cards__container'>
              <div className='cards__wrapper'>
                <div>No results found. Searches are currently case sensitive. Try something else?</div>                  
            </div> 
          </div> 
        </div> 
        }
        {showSearchResults &&
          <div className="cards-background"> 
            <div className='cards__container'>
            <h3 className="my-projects-title">Search Results...<button className="btn1" onClick={()=>setShowSearchResults(false)}>Close</button></h3>
              <div className='project-cards__wrapper'>
                <div className='cards__items'>      
                  {searchResults.map(userProfile => (                          
                    <div key={userProfile.username} className="cards__item">                                                   
                      <ProfileCard
                      bio={userProfile.bio}
                      src={userProfile.profilePic}
                      username={userProfile.username}          
                      />                         
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }

        <React.Fragment>
          <div className="cards">
            <div className="cards-background"> 

              <div className="project-section-title">
                <h3>NEWEST PROFILES</h3>               
              </div>
              <div className="pagination">
                <button className="pagination-prev" onClick={() => PagPrev()}><i class="fas fa-caret-square-left"></i>PREV</button>
                
                <button className="pagination-next" onClick={() => PagNext()}>NEXT<i class="fas fa-caret-square-right"></i></button>
              </div>
              <div className="project-grid-container">
                <div className="project-grid-wrapper">
                  {users.map(userProfile => (
                    <div key={userProfile.username} className="project-grid-box">
                      <ProfileGridBox
                        landscapePic={userProfile.landscapePic}
                        bio={userProfile.bio}
                        profilePic={userProfile.profilePic}
                        username={userProfile.username}           
                      />
                  </div>
                  ))}
                </div>
              </div>              
              <div className="pagination">
                <button className="pagination-prev" onClick={() => PagPrev()}><i class="fas fa-caret-square-left"></i>PREV</button>
                
                <button className="pagination-next" onClick={() => PagNext()}>NEXT<i class="fas fa-caret-square-right"></i></button>
              </div>
                
            </div>
          </div>
        </React.Fragment>
      </>
    )
}

export default LoadUsers;
