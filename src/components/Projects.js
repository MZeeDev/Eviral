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
import AVAX from '../img/BlockChains/avalanche.png';
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
  const [ searchFor, setSearchFor] = useState("All");
  const [pageNumber, setPageNumber] = useState(0);
  const [skillTagDropDown, setSkillTagDropDown] = useState(false);
  const [blockchainDropDown, setBlockChainDropDown] = useState(false);
  const [typeSearch, setTypeSearch] = useState();
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const [currentChain, setCurrentChain] = useState();
  const [currentFeature, setCurrentFeature] = useState();
  let initLoad = 0; // change later to accomodate refresh/sorting data

  const LoadProjects = async() => {
    if(searchFor != "All"){
      setSearchFor("Init");
      setPageNumber(0);
      console.log(pageNumber);
    }
    setSearchFor("All");    
    const params = { skipAmount: pageNumber};
    const projectsList = await Moralis.Cloud.run("renderProjects", params);
    setProjects(projectsList);  
    console.log(projectsList);
  };
  const LoadProjectsPro = async() => {
    setSearchFor("Pro");
    const params = { skipAmount: pageNumber, pro: true};
    const projectsList = await Moralis.Cloud.run("renderProjects", params);
    setProjects(projectsList);  
    console.log(projectsList);
  };
  const LoadProjectsHiring = async() => {
    setSearchFor("Hiring");
    const params = { skipAmount: pageNumber, hiring: true};
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

  const searchPagPrev = async() => {
    if(searchPageNumber == 0) {
      return;
    }
    let prevPageNumber = searchPageNumber - 1;
    await setSearchPageNumber(prevPageNumber);
  }

  const searchPagNext = async() => {
    let nextPageNumber = searchPageNumber + 1;    
    await setSearchPageNumber(nextPageNumber);
  }

  const LoadSavedProjects = async() => {
    const savedProjectsList = await Moralis.Cloud.run("renderSavedProjects");
    setSavedProjects(savedProjectsList);
  };

  const SearchProjects = async() => {
    setNoneFound(false);
    setTypeSearch("byName");
    const params = { title: queryName};
    const projectsFound = await Moralis.Cloud.run("searchProjectsByName", params);
    if(projectsFound != ''){
      setSearchResults(projectsFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }

  const filterProjectsByChain = async(chain) => {
    setNoneFound(false);
    setTypeSearch("byChain");
    setCurrentChain(chain);
    console.log(chain);
    console.log("chain to search for");
    const params = { blockchain: chain, skipAmount: searchPageNumber};
    const projectsFound = await Moralis.Cloud.run("filterProjectsByChain", params);
    if(projectsFound != ''){
      setSearchResults(projectsFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }

  const filterProjectsByFeature = async(feature) => {    
    setNoneFound(false);
    setTypeSearch("byFeature");
    setCurrentFeature(feature)
    console.log(feature);
    console.log("chain to feature for");
    console.log(searchPageNumber);
    const Feature = feature;
    const params = { feature: Feature, skipAmount: searchPageNumber};
    const projectsFound = await Moralis.Cloud.run("filterProjectsByFeature", params);
    if(projectsFound != ''){
      setSearchResults(projectsFound);
      setShowSearchResults(true);     
    } else {
      setNoneFound(true);
    }
  }

  useEffect(() => {
    if(isInitialized){
      if(searchFor == "All"){
      LoadProjects();
      }
      else if (searchFor == "Pro"){
        LoadProjectsPro();
      }
      else if (searchFor == "Hiring"){
        LoadProjectsHiring();
      }
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

  useEffect(() => {
    if(isInitialized){
      if(typeSearch == "byChain"){
        filterProjectsByChain(currentChain);
      } else if (typeSearch == "byFeature"){
        filterProjectsByFeature(currentFeature);
      } 
    }
    },
    [searchPageNumber]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }


    return (          
      <div id="loadProjects-container">
          <div className="project-section-title">
            Projects               
          </div>      
          <div id="projects-class-container">
            <div id="projects-class" onClick={()=>LoadProjectsPro()}>
              <h3>Pro-Verified</h3>
            </div>
            <div id="projects-class" onClick={()=>LoadProjectsHiring()}>
              <h3>Hiring FreeLancers /<br/>Looking to Collaborate</h3>
            </div>
            <div id="projects-class" onClick={()=>LoadProjects()}>
            <h3>All Projects</h3>
            </div>
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
          <div id="narrowByTagsContainer">
            <div id="narrowByTagHeader">
                <h5 id="narrowByTagHeaderLabel">BlockChains</h5>
                <button id="narrowByTagDropDownButton" onClick={()=> setBlockChainDropDown(!blockchainDropDown)}><img src={blockchainDropDown ? ArrowUp : ArrowDown}/></button>
            </div>
            {blockchainDropDown &&
              <div id="blockchain-logo-container">
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="ETH"><img id="blockchain-logo" src={ETH}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="BSC" ><img id="blockchain-logo"src={BSC}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="MATIC" ><img id="blockchain-logo"src={MATIC}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="AVAX" ><img id="blockchain-logo"src={AVAX}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="FTM" ><img id="blockchain-logo"src={FTM}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="ATOM" ><img id="blockchain-logo"src={ATOM}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="ONE" ><img id="blockchain-logo"src={ONE}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="PULS" ><img id="blockchain-logo"src={PULS}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="DOT" ><img id="blockchain-logo"src={DOT}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="ADA" ><img id="blockchain-logo"src={ADA}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="TRON" ><img id="blockchain-logo"src={TRON}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="HECO" ><img id="blockchain-logo"src={HECO}/></button>
                <button id="imagebutton" onClick={(e)=> filterProjectsByChain(e.currentTarget.value)} value="SOL" ><img id="blockchain-logo"src={SOL}/></button>
              </div>
            }
          </div>
          <div id="narrowByTagsContainer">
            <div id="narrowByTagHeader">
              <h5 id="narrowByTagHeaderLabel">Project Features</h5>
              <button id="narrowByTagDropDownButton" onClick={()=> setSkillTagDropDown(!skillTagDropDown)}><img src={skillTagDropDown ? ArrowUp : ArrowDown}/></button>
            </div>
            { skillTagDropDown && 
              <div id="narrowBySkillList">
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="AMM">AMM</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Bridge">Bridge</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Coin">Coin</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="DAO">DAO</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="DEFI">DEFI</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Gaming">Gaming</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Fan Project">Fan Project</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Launchpad">Launchpad</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Lending">Lending</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Metaverse">Metaverse</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="NFTs">NFTs</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Payment">Payment</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Privacy">Privacy</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Rebase">Rebase</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Smart Contracts">Smart Contracts</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="StableCoin">StableCoin</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Staking">Staking</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Synthetics">Synthetics</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Token">Token</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Wallet">Wallet</button>
                <button id="narrowBySkill" onClick={(e)=> filterProjectsByFeature(e.currentTarget.value)} value="Yield Farming">Yield Farming</button>
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
                        isHiring={project.isHiring}
                        blockchains={project.blockchains}
                        featureTags={project.featureTags}                         
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
                      isHiring={project.isHiring}
                      blockchains={project.blockchains}
                      featureTags={project.featureTags}                           
                      />
                  </div>
                ))}
              </div>
            }
           <div className="pagination">
            <button className="pagination-prev" onClick={ showSearchResults ? () => {scrollToTop(); searchPagPrev()} : () => {scrollToTop(); PagPrev()}}><img id="leftarrow" src={Left}/></button>              
            <button className="pagination-next" onClick={ showSearchResults ? () => {scrollToTop(); searchPagNext()} : () => {scrollToTop(); PagNext()}}><img id="rightarrow" src={Right}/></button>
          </div>          
      </div>      
    )
};

export default ProjectsList;
