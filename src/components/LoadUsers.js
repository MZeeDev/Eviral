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
import ArrowUp from '../img/arrowUp.svg';
import ArrowDown from '../img/arrowDown.svg';

function LoadUsers() {
  const { user, Moralis, isInitialized } = useMoralis();
  const [ users, setUsers ] = useState([""]);
  const [ usersSaved, setUsersSaved ] = useState([""]);  
  const [ queryProfile, setQueryProfile] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [ searchResults, setSearchResults] = useState();
  const [ noneFound, setNoneFound] = useState(false);
  const [skillTagDropDown, setSkillTagDropDown] = useState(false);
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [typeSearch, setTypeSearch] = useState();
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
  const searchPagPrev = async() => {
    if(pageNumber == 0) {
      return;
    }
    let prevPageNumber = pageNumber - 1;
    await setSearchPageNumber(prevPageNumber);
  }

  const searchPagNext = async() => {
    let nextPageNumber = pageNumber + 1;    
    await setSearchPageNumber(nextPageNumber);
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
    setTypeSearch("byName");
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

  useEffect(() => {
    if(isInitialized){
      if(typeSearch == "byName"){
        SearchProfiles();
      } else if (typeSearch == "byTag"){
        narrowByTag();
      }      
    }
    },
    [searchPageNumber, isInitialized]
  )

  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }

  const narrowByTag = async(tag) => {
    setPageNumber(0);
    setNoneFound(false);
    setTypeSearch("byTag");
    const Tag = [tag];
    const params = { skillTag: Tag, pageNum: pageNumber};
    const usersFound = await Moralis.Cloud.run("searchUsersByTag", params);
    if(usersFound != ''){
      setSearchResults(usersFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }


    return (           
      <div id="loadProjects-container">
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
          <div id="narrowByTagsConatiner">
            <div id="narrowByTagHeader">
              <h5 id="narrowByTagHeaderLabel">Narrow by Skills</h5>
              <button id="narrowByTagDropDownButton" onClick={()=> setSkillTagDropDown(!skillTagDropDown)}><img src={skillTagDropDown ? ArrowUp : ArrowDown}/></button>
            </div>
            { skillTagDropDown && 
              <div id="narrowBySkillList">
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Admin">Admin</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Artist">Artist</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Advisor">Advisor</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Blogger">Blogger</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Broker">Broker</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Developer">Developer</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Gamer">Gamer</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Graphic Design">Graphic Design</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Influencer">Influencer</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="IT">IT</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Lawyer">Lawyer</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Marketing">Marketing</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Miner">Miner</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Musician">Musician</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Streamer">Streamer</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Trader">Trader</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Translator">Translator</button>
                <button id="narrowBySkill" onClick={(e)=> narrowByTag(e.currentTarget.value)} value="Writer">Writer</button>
              </div>
            }
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
                      skillSet={userProfile.skillSet}                   
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
                  skillSet={userProfile.skillSet}                       
                />
            </div>
            ))}
          </div>
        </>
        } 
        <div className="pagination">
          <button className="pagination-prev" onClick={ showSearchResults ? () => {scrollToTop(); PagPrev()} : () => {scrollToTop(); searchPagPrev()}}><img id="leftarrow" src={Left}/></button>              
          <button className="pagination-next" onClick={showSearchResults ? () => {scrollToTop();PagNext()} : () => {scrollToTop();searchPagNext()}}><img id="rightarrow" src={Right}/></button>
        </div>                 
      </div>      
    )
}

export default LoadUsers;
