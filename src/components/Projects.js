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
import ArrowUp from '../img/arrowUp.svg';
import ArrowDown from '../img/arrowDown.svg';
import ETH from '../img/BlockChains/eth.png';
import BSC from '../img/BlockChains/bsc.png';
// import AVAX from '../img/BlockChains/avalanche.png';
import ADA from '../img/BlockChains/cardano.png';
import ATOM from '../img/BlockChains/cosmos.png';
import FTM from '../img/BlockChains/fantom.png';
import ONE from '../img/BlockChains/harmony.png';
import HECO from '../img/BlockChains/heco.png';
import DOT from '../img/BlockChains/polkadot.png';
import MATIC from '../img/BlockChains/polygon.png';
import PULS from '../img/BlockChains/pulsechain.png';
import SOL from '../img/BlockChains/solana.png';
import TRON from '../img/BlockChains/tron.png';


function ProjectsList({match}) {

  const { user, Moralis, isInitialized } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const [ savedProjects, setSavedProjects ] = useState([""]);
  const [ queryName, setQueryName] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [ searchResults, setSearchResults] = useState();
  const [ noneFound, setNoneFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [skillTagDropDown, setSkillTagDropDown] = useState(false);
  const [blockchainDropDown, setBlockChainDropDown] = useState(false);
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

  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }

  
  const filterFeature = () => {

  }

    return (          
      <div id="loadProjects-container">
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
          <div id="narrowByTagsConatiner">
            <div id="narrowByTagHeader">
                <h5 id="narrowByTagHeaderLabel">BlockChains</h5>
                <button id="narrowByTagDropDownButton" onClick={()=> setBlockChainDropDown(!blockchainDropDown)}><img src={blockchainDropDown ? ArrowUp : ArrowDown}/></button>
            </div>
            {blockchainDropDown &&
              <div id="blockchain-logo-container">
                <img id="blockchain-logo" src={ETH}/>
                <img id="blockchain-logo" src={BSC}/>
                <img id="blockchain-logo" src={MATIC}/>
                <img id="blockchain-logo" src={ETH}/>
                <img id="blockchain-logo" src={FTM}/>
                <img id="blockchain-logo" src={ATOM}/>
                <img id="blockchain-logo" src={ONE}/>
                <img id="blockchain-logo" src={PULS}/>
                <img id="blockchain-logo" src={DOT}/>
                <img id="blockchain-logo" src={ADA}/>
                <img id="blockchain-logo" src={TRON}/>
                <img id="blockchain-logo" src={HECO}/>
                <img id="blockchain-logo" src={SOL}/>
              </div>
            }
          </div>
          <div id="narrowByTagsConatiner">
            <div id="narrowByTagHeader">
              <h5 id="narrowByTagHeaderLabel">Project Features</h5>
              <button id="narrowByTagDropDownButton" onClick={()=> setSkillTagDropDown(!skillTagDropDown)}><img src={skillTagDropDown ? ArrowUp : ArrowDown}/></button>
            </div>
            { skillTagDropDown && 
              <div id="narrowBySkillList">
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="AMM">AMM</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Bridge">Bridge</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Coin">Coin</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="DAO">DAO</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="DEFI">DEFI</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Gaming">Gaming</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Fan Project">Fan Project</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Launchpad">Launchpad</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Lending">Lending</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Metaverse">Metaverse</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="NFTs">NFTs</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Payment">Payment</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Privacy">Privacy</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Rebase">Rebase</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Smart Contracts">Smart Contracts</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="StableCoin">StableCoin</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Staking">Staking</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Synthetics">Synthetics</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Token">Token</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Wallet">Wallet</button>
                <button id="narrowBySkill" onClick={(e)=> filterFeature(e.currentTarget.value)} value="Yield Farming">Yield Farming</button>
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
                  <button className="pagination-prev" onClick={() => {scrollToTop(); PagPrev()}}><img id="leftarrow" src={Left}/></button>              
                  <button className="pagination-next" onClick={() => {scrollToTop();PagNext()}}><img id="rightarrow" src={Right}/></button>
            </div>              
      </div>      
    )
};

export default ProjectsList;
