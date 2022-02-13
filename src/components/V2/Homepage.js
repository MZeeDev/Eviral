import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../../components/HeroSection.css';
import { ByMoralis } from 'react-moralis';
import Cards from '../Cards';
import Footer from './Footer';

import OnRamper from '../OnRamper';
// import FortmaticWallet from './FortmaticWallet';
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';

import Logo from '../../img/newlogo2.png';
import LogoBSC from '../../img/newlogoBSC2.png';
import Etherscan from "../../img/etherscan-logo.png";
import BSCScan from "../../img/bscscan-logo.png";
import Left from '../../img/leftpagination.png';
import Right from '../../img/rightpagination.png';

import HomepageCoinStack from "../../img/homepage/homepagecoinstack.png";
import Section2Background from "../../img/homepage/section2rectangle.png";
import GetViralTokens from '../../img/homepage/getviraltokens.svg';
import CreateYourSpace from '../../img/homepage/createyourspace.svg';
import Collaborate from '../../img/homepage/collaborate.svg';
import Section4Background from "../../img/homepage/section4background.svg";
import Section4GreenBlob from "../../img/homepage/section4greenblob.svg";
import Section5Background from "../../img/homepage/section5background.svg";
import Section5Block from "../../img/homepage/section5block.svg";
import Section5Swap from "../../img/homepage/section5swapplaceholder.png";
import Section6Block from "../../img/homepage/section6block.svg";
import Kyubi from "../../img/homepage/kyubi.png";
import Kyubi2 from "../../img/homepage/kyubi2.png";
import Section9Background from "../../img/homepage/section9background.svg";
import Section9Graphic from "../../img/homepage/section9graphic.png";
import Section10Background from "../../img/homepage/section10background.svg";
import VCLabs1 from "../../img/homepage/section10vclabs1.svg";
import VCLabs2 from "../../img/homepage/section10vclabs2.svg";
import VCLabs3 from "../../img/homepage/section10vclabs3.svg";
import Sentinel from "../../img/thesentinel.gif";

import './Homepage.css';
import ProjectCard from './ProjectCard';
import ProfileCard from './ProfileCard';
import SwapContainer from './SwapContainer';

function Homepage() {
    
    const { isInitialized, user } = useMoralis();
    const [ chain, setChain] = useState();
    const [ nativeToken, setNativeToken] = useState();
    const [ amount, setAmount] = useState(0);
    const [project1, setProject1] = useState([]);
    const [project2, setProject2] = useState([]);
    const [project3, setProject3] = useState([]);
    const [profile1, setProfile1] = useState([]);
    const [profile2, setProfile2] = useState([]);
    const [profile3, setProfile3] = useState([]);
    
    const eth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const bnb = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    const LoadProjects = async() => {
        project1Loaded();
        project2Loaded();
        project3Loaded();
    };
    const LoadProfiles = async() => {
        profile1Loaded();
        profile2Loaded();
        profile3Loaded();
    };
    
    const project1Loaded = async() => {
        const params = { title: "Kyūbi World ETH"};
        const projectLoaded = await Moralis.Cloud.run("loadProjectByName", params);
        setProject1(projectLoaded[0]);
        console.log(project1);
    }  
    const project2Loaded = async() => {
        const params = { title: "Shiba Samurai"};
        const projectLoaded = await Moralis.Cloud.run("loadProjectByName", params);
        setProject2(projectLoaded[0]);
    }  
    const project3Loaded = async() => {
        const params = { title: "SHIBNOBI"};
        const projectLoaded = await Moralis.Cloud.run("loadProjectByName", params);
        setProject3(projectLoaded[0]);
    }  
    const profile1Loaded = async() => {
        const params = { username: "Tal"};
        const profileLoaded = await Moralis.Cloud.run("loadUserByName", params);
        setProfile1(profileLoaded[0]);
    }  
    const profile2Loaded = async() => {
        const params = { username: "VC Labs"};
        const profileLoaded = await Moralis.Cloud.run("loadUserByName", params);
        setProfile2(profileLoaded[0]);
    }  
    const profile3Loaded = async() => {
        const params = { username: "NikoDiko"};
        const profileLoaded = await Moralis.Cloud.run("loadUserByName", params);
        setProfile3(profileLoaded[0]);
    }  
      
  useEffect(() => {
    if(isInitialized){
    LoadProjects();
    LoadProfiles();
    }
    },
    [isInitialized],
  );  


    return (        
        <div className="homepage-container">   
            <div id="section1">
                <div id="section1-homepage-mint">
                    <img id="sentinel" src={Sentinel}/>
                    <div id="section1-homepage-mint-text">
                        <h2>The&nbsp;Sentinel</h2>
                        <Link id="button-1" to={{ pathname: (`https://vcmint.netlify.app`) }} target="_blank">
                            Mint                            
                        </Link>
                    </div>
                </div>
                <div id="section1-homepage-motto">
                    <div id="section1-homepage-motto-text">
                        <h1>Connecting Innovators and Freelancers in DeFI</h1>
                        <p>Own eViral or beViral and join the network of independent blockchain creators</p>
                    </div>
                    <div id="section1-homepage-motto-buttons">
                        <Link to='/profiles' id="button-1">Find&nbsp;Pros</Link>
                        <Link to='/projects' id="button-2">Discover&nbsp;Projects</Link>
                    </div>
                </div>
                <img id="homepagecoinstack" src={HomepageCoinStack}/>
            </div>

            <div id="section2">
                <img id="section2background" src={Section2Background}/>
                <h2>How it Works</h2>
                <div id="section2-boxes">
                    <div id="section2-box1">
                        <div id="getviraltokens-text">
                        <img id="getviraltokens" src={GetViralTokens}/>
                            <h4>Get Viral Tokens</h4>
                            <p>Viral Tokens exists across many blockchains, including Ethereum and BSC. Just by owning any of the tokens, you gain access to the platform.</p>
                        </div>
                    </div>
                    <div id="section2-box2">
                    <div id="createyourspace-text">
                        <img id="createyourspace" src={CreateYourSpace}/>
                            <h4>Create your Space</h4>
                            <p>By owning viral tokens you can connect to the platform, create a profile, and host project pages for new or existing projects.</p>
                        </div>
                    </div>
                    <div id="section2-box3">
                    <div id="collaborate-text">
                        <img id="collaborate" src={Collaborate}/>
                            <h4>Collaborate</h4>
                            <p>Connect and message other DeFi enthusiasts to work together, learn new skills, share interests, and evalute projects.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section3">
                <h2>Why Viral Crypto?</h2>
                <div id="whyviralcrypto-section1">
                    <div id="whyviralcrypto-section1-box1">
                        <div id="whyviralcrypto-box-title1">Fundamentals</div>
                        <p>The VC platform allows users to safely collaborate, share interests, and evaluate new projects.</p>
                    </div>
                    <div id="whyviralcrypto-section1-box2">
                        <div id="whyviralcrypto-box-title2">First Steps</div>
                        <p>Users connect to the platform via our secure web3 safe-connect and create a profile that is uniquely associated with their wallet's address.</p>
                    </div>
                    <div id="whyviralcrypto-section1-box3">
                        <div id="whyviralcrypto-box-title1">Freelance Network</div>
                        <p>Users can create pages for projects in development in order to collaborate with freelancers.</p>
                    </div>                    
                </div>
                <div id="whyviralcrypto-section2">
                    <div id="whyviralcrypto-section2-box1">
                        <div id="whyviralcrypto-box-title2">Reputation Building</div>
                        <p>Users can create verified project pages for established projects that are administered by their appropriate resprentatives.</p>
                    </div>
                    <div id="whyviralcrypto-section2-box2">
                        <div id="whyviralcrypto-box-title1">Growing Together</div>
                        <p>Users can create and review projects in addition to connecting with verified project creators.</p>
                    </div>
                    <div id="whyviralcrypto-section2-box3">
                        <div id="whyviralcrypto-box-title2">Privacy Meets Publicity</div>
                        <p>Whether users are publicly doxed or anonymous, their projects reviews and ratings will follow them forever on the VC platform.</p>
                    </div> 
                </div>
            </div>
            <div id="section4">
                <div id="section4images">
                    <img id="section5background" src={Section5Background}/>
                    <img id="section4background" src={Section4Background}/>
                    <img id="section4greenblob" src={Section4GreenBlob}/>
                </div>
                <div id="section4onramp">
                    <div id="section4onramptext">
                        <h2>Buy Crypto</h2>
                        <br/>
                        <h3>
                            New to Crypto? No problem.<br/>You'll need ETH to buy eViral, or BNB to buy beViral.</h3>
                    </div>
                    <div id="onramper">
                        <OnRamper />
                    </div>
                </div>
            </div>
            <div id="section5">
                <h2>Buy Viral Tokens
                     <span>&nbsp;<h3>(coming soon)</h3></span>
                </h2>
                
                <img id="section5block" src={Section5Block}/>
                {/* <img id="section5swap" src={Section5Swap}/> */}
                <SwapContainer />
            </div>
            <div id="section6">
                <h2>Evolving VC Partners</h2>
                <img id="section6block" src={Section6Block}/>
                <div id="vcpartners">
                    <h3>Kyubi World - NFTs: A place for aspiring artists and gamers to flourish</h3>
                    <Link id="kyubi" to={{ pathname: (`https://kyubiverse.org`) }} target="_blank"><img src={Kyubi}/></Link>

                    
                  <button className="pagination-prev" id="prevPartner" ><img id="leftarrow" src={Left}/></button>                    
                  <button className="pagination-next" id="nextPartner" ><img id="rightarrow" src={Right}/></button>
                </div>
            </div>
            <div id="section7">
                <h2>Popular&nbsp;Projects</h2>
                <div id="featuredProjects">
                    <ProjectCard id="project1"
                    title={project1.title}
                    summary={project1.summary}
                    src={project1.projectPhoto}
                    username={project1.username}
                    creatorProfilePic={project1.profilePic}
                    createdOn = {project1.createdOn}
                    path={project1.title}
                    isVerified = {project1.isVerified}
                    isLive={project1.isLive}   
                    />
                    <ProjectCard id="project2"
                    title={project2.title}
                    summary={project2.summary}
                    src={project2.projectPhoto}
                    username={project2.username}
                    creatorProfilePic={project2.profilePic}
                    createdOn = {project2.createdOn}
                    path={project2.title}
                    isVerified = {project2.isVerified}
                    isLive={project2.isLive}   
                    />
                    <ProjectCard id="project3"
                    title={project3.title}
                    summary={project3.summary}
                    src={project3.projectPhoto}
                    username={project3.username}
                    creatorProfilePic={project3.profilePic}
                    createdOn = {project3.createdOn}
                    path={project3.title}
                    isVerified = {project3.isVerified}
                    isLive={project3.isLive}    
                    />
                </div>
                <Link to='/projects' id="showall-button1">Show&nbsp;all&nbsp;Projects</Link>
            </div>
            <div id="section8">
                <h2>Featured&nbsp;Profiles</h2>
                <div id="featuredProfiles">
                    <ProfileCard id="profile1"
                        profilePic={profile1.profilePic}
                        username={profile1.username}
                        startRate={profile1.startRate}    
                        payCurrency={profile1.payCurrency} 
                        bio={profile1.bio}
                    />
                    <ProfileCard id="profile2"
                        profilePic={profile2.profilePic}
                        username={profile2.username}
                        startRate={profile2.startRate}    
                        payCurrency={profile2.payCurrency} 
                        bio={profile2.bio}
                    />
                    <ProfileCard id="profile3"
                        profilePic={profile3.profilePic}
                        username={profile3.username}
                        startRate={profile3.startRate}    
                        payCurrency={profile3.payCurrency} 
                        bio={profile3.bio}
                    />
                </div>
                <Link to='/profiles' id="showall-button2">Show&nbsp;all&nbsp;Profiles</Link>
            </div>
            <div id="section9">
                <img id="section9background" src={Section9Background}/>
                <h2>Front&minus;end&nbsp;Dev&nbsp;Hackathon</h2>
                <div id="section9contents">
                    <img id="section9graphic" src={Section9Graphic}/>
                    <h3>
                        Winning developers will also be featured in search, here on the homepage, and given credit on the team page.
                        <br/>
                        <br/>
                        Oct 1st through Jan 1 2022, VC Labs is running its first HACKATHON and will select: 4 innovative, community driven features to add, and 1 innovative improvement on search capability.
                    </h3>
                </div>                
            </div>
            <div id="section10">
                <img id="section10background" src={Section10Background}/>
                <h2>VC&nbsp;Lab</h2>
                <h3>Do you deserve to stand out? Should you be featured on the VC Homepage?</h3>
                <div id="section10-boxes">
                    <div id="section10-box1">
                        <div id="section10-box1-contents">
                            <img id="vclabs1" src={VCLabs1}/>
                            <p>Empowering the most driven and talented innovators in blockchain, VC Labs rewards collaborators that improve the platform for all users.</p>
                        </div>
                    </div>
                    <div id="section10-box2">
                        <div id="section10-box2-contents">
                            <img id="vclabs2" src={VCLabs2}/>
                            <p>Oct 1st through Jan 1st 2022, VC Labs is running its first multi-discipline platform update challenge for artists, marketers, and developers.</p>
                        </div>
                    </div>
                    <div id="section10-box3">
                        <div id="section10-box3-contents">
                            <img id="vclabs3" src={VCLabs3}/>
                            <p>Winners will be featured on the homepage in addition to search results and be given credit on the team page for the platform.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    )
}

export default Homepage;
