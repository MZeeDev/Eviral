import React, {useState, useEffect} from 'react';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';
import './SearchBar.css';
import './ProjectGrid.css';
import ProfileGridBox from './ProfileGridBox';
import SearchGlass from '../img/searchglass.svg';
import Left from '../img/leftpagination.png';
import Right from '../img/rightpagination.png';
import ProfileCard from '../components/V2/ProfileCard';

function LoadUsers() {
  const { user, Moralis, isInitialized } = useMoralis();
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
    console.log(userList);
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
    if(isInitialized){
    LoadUsers();
    }
    },
    [pageNumber, isInitialized]
  );  

  useEffect(() => {
    if(user){
    SavedProfiles();
    }
    },
    [initLoad]
  );  

    return (           
      <>
          <div className="project-section-title">
            Profiles               
          </div>   
          <div className="searchbar-container">
            <div className="searchbar-wrapper">
                <input 
                  type="text" 
                  className="searchbar-text" 
                  placeholder="Search profiles by name..." 
                  value={queryProfile} 
                  onChange={(event) =>setQueryProfile(event.currentTarget.value)} 
                  onKeyPress={(event) => { if(event.key === "Enter") {SearchProfiles()}}}
                  />
                <button className="searchbar-button" onClick={SearchProfiles}>Search<img id="searchbarglass" src={SearchGlass}/></button>
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
              <div className="profile-grid-wrapper">
                {searchResults.map(userProfile => (
                  <div key={userProfile.username}>
                    <ProfileCard
                      bio={userProfile.bio}
                      profilePic={userProfile.profilePic}
                      username={userProfile.username}
                      startRate={userProfile.startRate}    
                      payCurrency={userProfile.payCurrency}                      
                      rate={userProfile.rate}                      
                      contactForPricing={userProfile.contactForPricing}                      
                    />
                </div>
                ))}
              </div>
            </>          
        }
        {!showSearchResults &&     
        <>  
          <div className="profile-grid-wrapper">
            {users.map(userProfile => (
              <div key={userProfile.username}>
                <ProfileCard
                  bio={userProfile.bio}
                  profilePic={userProfile.profilePic}
                  username={userProfile.username}
                  startRate={userProfile.startRate}    
                  payCurrency={userProfile.payCurrency}  
                  rate={userProfile.rate}                      
                  contactForPricing={userProfile.contactForPricing}                        
                />
            </div>
            ))}
          </div>
        </>
        } 
        <div className="pagination">
            <button className="pagination-prev" onClick={() => PagPrev()}><img id="leftarrow" src={Left}/></button>                    
            <button className="pagination-next" onClick={() => PagNext()}><img id="rightarrow" src={Right}/></button>
        </div>                 
      </>      
    )
}

export default LoadUsers;
