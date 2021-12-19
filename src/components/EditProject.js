import React, { useState, useEffect } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditProject.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import Alert from './Alert';

import Exit from '../img/exit.svg';
import shareTelegram from '../img/shareIcons/telegram.svg';
import shareTwitter from '../img/shareIcons/twitter.svg';
import shareLinkedIn from '../img/shareIcons/linkedin.svg';
import shareDiscord from '../img/shareIcons/discord.svg';
import shareTwitch from '../img/shareIcons/twitch.svg';
import shareYoutube from '../img/shareIcons/youtube.svg';
import shareMedium from '../img/shareIcons/medium.svg';
import addImage from '../img/addImage.svg';


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
import ETH from '../img/BlockChains/eth.png';
import BSC from '../img/BlockChains/bsc.png';
import ExitWhite from '../img/exitWhite.svg';


function EditProject(props) {  ///set input variables as required, add other attributes to be stored like tags, etc, allow for editing/updating?

    const { user, Moralis, isInitialized } = useMoralis();
    const { saveFile } = useMoralisFile();

    const [title, setTitle] = useState((props.title));
    const [summary, setSummary] = useState(props.summary);
    const [description, setDescription] = useState(props.description);

    const [website, setWebsite] = useState(props.website);
    const [twitter, setTwitter] = useState(props.twitter);
    const [telegram, setTelegram] = useState(props.telegram);
    const [discord, setDiscord] = useState(props.discord);
    const [linkedIn, setLinkedIn] = useState(props.linkedIn);
    const [youtube, setYoutube] = useState(props.youtube);
    const [twitch, setTwitch] = useState(props.twitch);
    const [medium, setMedium] = useState(props.medium);
    const [isOwner, setIsOwner] = useState(props.isOwner);
    const [isLive, setIsLive] = useState(props.isLive);
    const [isHiring, setIsHiring] = useState(props.isHiring);


    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();


    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();  
    const [photoFile1, setPhotoFile1] = useState();    
    const [photoFileName1, setPhotoFileName1] = useState();  
    const [photoFile2, setPhotoFile2] = useState();    
    const [photoFileName2, setPhotoFileName2] = useState();  
    const [ projectPhotoPreview, setProjectPhotoPreview] = useState(props.projectPhoto);
    const [photo1, setPhoto1] = useState(props.projectPhoto ? props.projectPhoto : "");
    const [photo2, setPhoto2] = useState(props.projectPhoto1 ? props.projectPhoto1 : "");
    const [photo3, setPhoto3] = useState(props.projectPhoto2 ? props.projectPhoto2 : "");
    const [activePhoto, setActivePhoto] = useState();
    const [activeBlockChains, setActiveBlockChains] = useState([]);
    const [featureTags, setFeatureTags] = useState([]);
    const [activeFeature, setActiveFeature] = useState();


    const handleDescriptionOnChange = (e, editor) =>{
        const data = editor.getData();
        setDescription(data);
    }

    const deletePopUp = async () => {
        setAlertContents(
            <div className="verify-delete-popup">
                Are you sure you want to delete this project?
                <button className="submit-form btn3" onClick={deleteProject}>Delete Project</button>
            </div>
        );
        setAlertVisible(true);
    }

    const deleteProject = async() => {
        const params = { projectTitle: (props.title) }; 
        console.log(params);
        const project = await Moralis.Cloud.run("getProjectByName", params);
        console.log(project);
        
        const currentProject = project;
        currentProject.destroy().then((object) => {
            alert("You can always create something new!");
        }, (error) => {
            alert(error)
        });
    }


    const editProject = async () => {
        try {            
            const params = { projectTitle: (props.title) }; 
            const project = await Moralis.Cloud.run("getProjectByName", params);
            const file = photoFile;
            const name = photoFileName;
            const file1 = photoFile1;
            const name1 = photoFileName1;
            const file2 = photoFile2;
            const name2 = photoFileName2;
            let fileIpfs = await saveFile(name, file, { saveIPFS: true });
            let fileIpfs1 = await saveFile(name1, file1, { saveIPFS: true });
            let fileIpfs2 = await saveFile(name2, file2, { saveIPFS: true });
            project.set('blockchains', activeBlockChains); 
            project.set('featureTags', featureTags);                  
            project.set('projectPhoto', fileIpfs);
            project.set('projectPhoto1', fileIpfs1);
            project.set('projectPhoto2', fileIpfs2);
            project.set("isLive", isLive === "" ? undefined : isLive);
            project.set('isHiring', isHiring === "" ? undefined : isHiring);
            project.set('title', title);
            project.set('summary', summary);
            project.set('description', description === "" ? undefined : description);
            project.set("website", website === "" ? undefined : website);
            project.set("twitter", twitter === "" ? undefined : twitter);
            project.set("telegram", telegram === "" ? undefined : telegram);
            project.set("discord", discord === "" ? undefined : discord);
            project.set("linkedIn", linkedIn === "" ? undefined : linkedIn);
            project.set("youtube", youtube === "" ? undefined : youtube);
            project.set("twitch", twitch === "" ? undefined : twitch);
            project.set("medium", medium === "" ? undefined : medium);
            await project.save();
            setAlertContents("Updates Submitted!");
            setAlertVisible(true);
        } catch (error) {
            alert(error)
        }
    }


    const onChangePhoto = e => {
        if(activePhoto == 1){
            setPhotoFile(e.target.files[0]);
            setPhotoFileName(e.target.files[0].name);
            setPhoto1(URL.createObjectURL(e.target.files[0]));
        }
        else if(activePhoto == 2){
            setPhotoFile1(e.target.files[0]);
            setPhotoFileName1(e.target.files[0].name);
            setPhoto2(URL.createObjectURL(e.target.files[0]));
        }
        else if (activePhoto == 3){
            setPhoto3(URL.createObjectURL(e.target.files[0]));
            setPhotoFile2(e.target.files[0]);
            setPhotoFileName2(e.target.files[0].name);
        }
        setProjectPhotoPreview(URL.createObjectURL(e.target.files[0]));
        setAlertContents("Uploaded!");
        setAlertVisible(true);
    };

    const setActive = (src, num) =>{
        setProjectPhotoPreview(src);
        setActivePhoto(num);
    }

    const handleBlockChain = async(blockChainSybmol) => {
        if(activeBlockChains.includes(blockChainSybmol)){
            const index = activeBlockChains.indexOf(blockChainSybmol);
            activeBlockChains.splice(index, 1);
            setActiveBlockChains(activeBlockChains => [...activeBlockChains]);            
        } else {
            setActiveBlockChains(activeBlockChains => [...activeBlockChains, blockChainSybmol]);
        }
    }

    const handleFeatureTags = async(tag) => {
        
        if(featureTags.includes(tag)){
            const index = featureTags.indexOf(tag);
            featureTags.splice(index, 1);
            setFeatureTags(featureTags => [...featureTags]);            
        } 
         else {
            if(featureTags.length >= 3){
                alert("Please choose less than 3 features");
            } else {
                setFeatureTags(featureTags => [...featureTags, tag]);
            }
        }
    }

    useEffect(() => {
        if(isInitialized)
        if (typeof props.featureTags !== 'undefined') {
            setFeatureTags(props.featureTags);
        }
        if (typeof props.blockchains !== 'undefined') {
            setActiveBlockChains(props.blockchains);
        }
      }, [isInitialized]);
   

    return (
        <>
            <div className="createProject-background">
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h3 className="menu-title"> Edit Project </h3>
                            <img id="exitMenu" src={Exit} onClick={() => {props.closeCreateProjectMenu(false)}}/>
                        </div>
                        <div id="project-pic-container">
                            <img className="project-pic" src={projectPhotoPreview} alt="" />
                        </div>                        
                        <div id="project-pic-thumnail-container">
                            <img id="project-pic-thumnail" src={photo1} alt="" onClick={(e)=>setActive(e.currentTarget.src, 1)}/>
                            {photo2
                                ?
                                <img id="project-pic-thumnail" src={photo2} alt="" onClick={(e)=>setActive(e.currentTarget.src, 2)}/>
                                :
                                <img id="project-pic-thumnail" src={addImage} alt="" onClick={(e)=>setActive(e.currentTarget.src, 2)}/>
                            }
                            {photo3
                                ?
                                <img id="project-pic-thumnail" src={photo3} alt="" onClick={(e)=>setActive(e.currentTarget.src, 3)}/>
                                :
                                <img id="project-pic-thumnail" src={addImage} alt="" onClick={(e)=>setActive(e.currentTarget.src, 3)} />
                            }
                        </div>    
                        <p id="editproject-thumbnailprompt">Select a thumbnail to change it</p>                    
                        <div className="form-photo-wrapper">  
                            <label htmlFor="projectPhoto" className="form-label">Upload a image (jpg, jpeg, png, gif)</label>
                            <input className="form-control" type="file" accept="image/*" multiple="false" id="projectPhoto" required onChange={onChangePhoto}/>
                        </div>
                        <div id="createProject-launchStatus">
                            <p>Has your project already launched or is it still in development?</p>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault" onClick={() => setIsLive(false)}/>
                                <p>In Development</p>
                            </div>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault" onClick={() => setIsLive(true)}/>
                                <p>Launched</p>
                            </div>              
                        </div>
                        <div id="createProject-launchStatus">
                            <p>Are you looking to hire freelancers or collaborate with other projects?</p>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault1" onClick={() => setIsHiring(true)}/>
                                <p>Yes</p>
                            </div>
                            <div id="createProject-launchStatus-option">
                                <input type="radio" id="indevelopment" name="flexRadioDefault1" onClick={() => setIsHiring(false)}/>
                                <p>No</p>
                            </div>              
                        </div>
                        <h4 id="createProject-aboutProject">BlockChains Available On:</h4>
                        <div id="editProject-blockchainlist">
                            <label>
                                <input type="checkbox" name="rating-radio" value={"ETH"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("ETH") && "editProject-blockchain-logo"} src={ETH}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"BSC"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("BSC") && "editProject-blockchain-logo"} src={BSC}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"MATIC"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("MATIC") && "editProject-blockchain-logo"} src={MATIC}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"AVAX"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("AVAX") && "editProject-blockchain-logo"} src={AVAX}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"FTM"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("FTM") && "editProject-blockchain-logo"} src={FTM}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"ATOM"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("ATOM") && "editProject-blockchain-logo"} src={ATOM}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"ONE"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("ONE") && "editProject-blockchain-logo"} src={ONE}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"PULS"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("PULS") && "editProject-blockchain-logo"} src={PULS}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"DOT"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("DOT") && "editProject-blockchain-logo"} src={DOT}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"ADA"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("ADA") && "editProject-blockchain-logo"} src={ADA}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"TRON"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("TRON") && "editProject-blockchain-logo"} src={TRON}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"HECO"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("HECO") && "editProject-blockchain-logo"} src={HECO}/>
                            </label>
                            <label>
                                <input type="checkbox" name="rating-radio" value={"SOL"} onClick={(e) => handleBlockChain(e.currentTarget.value)}/>
                                <img id={activeBlockChains.includes("SOL") && "editProject-blockchain-logo"} src={SOL}/>
                            </label>                            
                        </div>
                        <h4 id="createProject-aboutProject">Project Features</h4>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Current Selected</label>
                            <div id="createProject-formInput-text" value={featureTags} onChange={(event) =>setFeatureTags(event.currentTarget.value)} > 
                                {(!featureTags || featureTags.length==0) && 
                                    <p>Feature Tags</p>
                                } 
                                {featureTags && 
                                    <>                            
                                    {featureTags.map(element => (
                                        <button id="createProject-skillTagAdded-button">{element}<img id="exitSkillTagButton" onClick={()=> handleFeatureTags(element)} src={ExitWhite}/></button>
                                    ))} 
                                    </>  
                                }                             
                            </div>
                            <div  id="createProject-skillTags">
                                <select id="createProject-tagList" onChange={(e) => setActiveFeature(e.currentTarget.value)}>                            
                                    <option selected disabled>Select up to 3 Features</option>
                                    <option id="skill-option" value="AMM">AMM</option>
                                    <option id="skill-option" value="Bridge">Bridge</option>
                                    <option id="skill-option" value="Coin">Coin</option>
                                    <option id="skill-option" value="DEFI">DEFI</option>
                                    <option id="skill-option" value="Gaming">Gaming</option>
                                    <option id="skill-option" value="Fan Project">Fan Project</option>
                                    <option id="skill-option" value="Launchpad">Launchpad</option>
                                    <option id="skill-option" value="Lending">Lending</option>
                                    <option id="skill-option" value="Metaverse">Metaverse</option>
                                    <option id="skill-option" value="NFTs">NFTs</option>
                                    <option id="skill-option" value="Payment">Payment</option>
                                    <option id="skill-option" value="Privacy">Privacy</option>
                                    <option id="skill-option" value="Rebase">Rebase</option>
                                    <option id="skill-option" value="Smart Contracts">Smart Contracts</option>
                                    <option id="skill-option" value="StableCoin">StableCoin</option>
                                    <option id="skill-option" value="Staking">Staking</option>
                                    <option id="skill-option" value="Synthetics">Synthetics</option>
                                    <option id="skill-option" value="Token">Token</option>
                                    <option id="skill-option" value="Wallet">Wallet</option>
                                    <option id="skill-option" value="Yield Farming">Yield Farming</option>
                                </select>                            
                                <button id="createProject-addSkill-button" type="button" onClick={()=> handleFeatureTags(activeFeature)}>Add</button>
                            </div>                            
                        </div>
                        <h4 id="createProject-aboutProject">Project Details</h4>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Enter Project Name<span style={{color:"red"}}> *</span></label>
                            <input id="createProject-formInput-text" placeholder={title} value={title} required onChange={(event) =>setTitle(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Summary<span style={{color:"red"}}> *</span></label>
                            <textarea rows={3} id="createProject-formInput-text" placeholder="Enter brief description to display ( <150 characters )" maxLength={150} value={summary} required onChange={(event) =>setSummary(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput-description">
                            <label id="createProject-formInput-title-description">Description<span style={{color:"red"}}> *</span></label>  
                            {/* <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 550 characters" maxLength={550} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/> */}
                            <CKEditor 
                                editor={ClassicEditor}
                                onChange={handleDescriptionOnChange}                                    
                            />
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Website</label>
                            <input id="createProject-formInput-text" placeholder="www.yourwebsite.com" value={website} onChange={(event) =>setWebsite(event.currentTarget.value)}/>
                        </div>
                        <span style={{color:"red"}}> * Required</span>                        
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTwitter}/></span>
                                <input id="createProject-social-text" value={twitter} placeholder=" @username" onChange={(event) =>setTwitter(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTelegram}/></span>
                                <input id="createProject-social-text" value={telegram} placeholder=" t.me/  LINK" onChange={(event) =>setTelegram(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareDiscord}/></span>
                                <input id="createProject-social-text" value={discord} placeholder=" @username" onChange={(event) =>setDiscord(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareLinkedIn}/></span>
                                <input id="createProject-social-text" value={linkedIn} placeholder=" linkedin.com/in/ Profile URL" onChange={(event) =>setLinkedIn(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareYoutube}/></span>
                                <input id="createProject-social-text" value={youtube} placeholder=" youtube.com/c/ channel URL" onChange={(event) =>setYoutube(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareTwitch}/></span>
                                <input id="createProject-social-text" value={twitch} placeholder=" twitch.tv/ channel URL" onChange={(event) =>setTwitch(event.currentTarget.value)}/>
                        </div>                            
                        <div id="createProject-social">                            
                                <span id="createProject-social-icon"><img src={shareMedium}/></span>
                                <input id="createProject-social-text" value={medium} placeholder=" yourproject.medium.com" onChange={(event) =>setMedium(event.currentTarget.value)}/>
                        </div>                            
                            
                        <div className="form-button-wrapper">
                            <button id="createProject-button-submit" onClick={editProject}>Sumbit Changes</button>
                            {isOwner && <button id="createProject-button-delete" onClick={deletePopUp}>Delete Project</button>}
                            <button id="createProject-button-close" onClick={()=>{props.closeCreateProjectMenu(false)}}>Close Menu</button>
                        </div>
                    </div>
                </div>
            </div>
            {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
            }
        </>      
        
    )
}

export default EditProject;
