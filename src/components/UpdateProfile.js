import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './User.css';
import './UpdateProfile.css';
import Alert from './Alert';



import Exit from '../img/exit.svg';
import ExitWhite from '../img/exitWhite.svg';
import shareTelegram from '../img/shareIcons/telegram.svg';
import shareTwitter from '../img/shareIcons/twitter.svg';
import shareLinkedIn from '../img/shareIcons/linkedin.svg';
import shareDiscord from '../img/shareIcons/discord.svg';
import shareTwitch from '../img/shareIcons/twitch.svg';
import shareYoutube from '../img/shareIcons/youtube.svg';

function UpdateProfile(props) {

    const { user, setUserData, Moralis } = useMoralis();
    const { error, isUploading, moralisFile, saveFile, } = useMoralisFile();

    const [currentTag, setCurrentTag] = useState("skillTag");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();    
    
    const [landscapeFile, setLandscapeFile] = useState();    
    const [landscapeFileName, setLandscapeFileName] = useState();  
    const [landscapePic, setLandscapePic] = useState();

    const [username, setUsername] = useState();
    const [userLocation, setUserLocation] = useState();
    const [story, setStory] = useState();
    // const [skills, setSkills] = useState();
    const [skillTags, setSkillTags] = useState([]);
    const [bio, setBio] = useState();
    const [website, setWebsite] = useState();
    const [twitter, setTwitter] = useState();
    const [telegram, setTelegram] = useState();
    const [discord, setDiscord] = useState();
    const [linkedIn, setLinkedIn] = useState();
    const [youtube, setYoutube] = useState();
    const [twitch, setTwitch] = useState();
    const [startRate, setStartRate]  = useState();
    const [rate, setRate] = useState("Rate");
    const [payCurrency, setPayCurrency] = useState();
    const [contactForPricing, setContactForPricing] = useState(false);
    const init = 0;

    const addSkill = async() => {
        if(skillTags.length >= 3){
            alert("Please choose less than 3 skill tags");
        } else if(skillTags.includes(currentTag)){
            alert("Please choose a different tag.");
        } else {            
            setSkillTags(skillTags => [...skillTags, currentTag]);      
            // setSkills(skillTags => [...skillTags, currentTag]);
            // console.log(skills);
            console.log(skillTags);
        }     
    }


    const removeSkill = async(value) => {        
        const index = skillTags.indexOf(value);
        console.log(value, index);
        skillTags.splice(index, 1);
        setSkillTags(skillTags => [...skillTags]);
        // setSkills(skillTags);        
    }

    const checkProfileCreated = () => {
        const profileCreated = (user.attributes?.profileCreated);
        if(profileCreated){
            setUsername(user.attributes?.username);
            setLandscapePic(user.attributes?.landscapePic?._url);
            setUserLocation(user.attributes?.userLocation);
            setStory(user.attributes?.story);
            // setSkills(user.attributes?.skills);
            setSkillTags(user.attributes?.skillSet);
            setBio(user.attributes?.bio);
            setWebsite(user.attributes?.website);
            setTwitter(user.attributes?.twitter);
            setTelegram(user.attributes?.telegram);
            setLinkedIn(user.attributes?.linkedIn);
            setDiscord(user.attributes?.discord);
            setYoutube(user.attributes?.youtube);
            setTwitch(user.attributes?.twitch);
            setStartRate(user.attributes?.startRate);
            setPayCurrency(user.attributes?.payCurrency);
            setRate(user.attributes?.rate);
            setContactForPricing(user.attributes?.contactForPricing);
        }
    }
    
    useEffect(() => {
        if (user) {
            checkProfileCreated();
        }
      }, [init]);


    const handleSave = async() => {
        if( (username == "") ) { 
            return;
        }
        await setUserData({
            username: username === "" ? undefined : username,            
            userLocation: userLocation === "" ? undefined : userLocation, 
            story: story === "" ? undefined : story ,
            // skills: skills === "" ? undefined : skills ,
            bio: bio === "" ? undefined : bio,     
            website: website === "" ? undefined : website,     
            twitter: twitter === "" ? undefined : twitter,     
            telegram: telegram === "" ? undefined : telegram,     
            discord: discord === "" ? undefined : discord,     
            linkedIn: linkedIn === "" ? undefined : linkedIn,     
            youtube: youtube === "" ? undefined : youtube,     
            twitch: twitch === "" ? undefined : twitch,  
            startRate: startRate === "" ? undefined : startRate,  
            payCurrency: payCurrency === "" ? undefined : payCurrency,  
            contactForPricing: contactForPricing === "" ? undefined : contactForPricing,  
            rate: rate === "" ? undefined : rate,  
            profileCreated: true   
        });
        user.set("skillSet", skillTags);
        await user.save(); 
        setAlertContents("Profile Updated!");
        setAlertVisible(true);        
    };

    const handleStoryOnChange = (e, editor) =>{
        const data = editor.getData();
        setStory(data);
    }

    const onChangeLandscape = e => {        
        setLandscapeFile(e.target.files[0]);
        setLandscapeFileName(e.target.files[0].name);
    };

      const onSubmitLandscape = async () => {
        try{
        const file = landscapeFile;
        const name = landscapeFileName;
        console.log(1);
        let fileIpfs = await saveFile(name, file, { saveIPFS: true });
        console.log(2);
        user.set("landscapePic", fileIpfs);
        await user.save();
        setLandscapePic(user.attributes.landscapePic._url);
        } catch (error) {
            console.log(error)
        }
      };

      const skillReveal = () => {
        //   console.log(skills);
        //   console.log(skillTags);
          console.log(user.attributes.rate);
          console.log(user.attributes.contactForPricing);
          console.log(user.attributes.skillSet);
      }

    return (
        <> 
            <div className="update-profile-background">
                <div className="update-container">
                    <div className="update-container-wrapper">
                        <div className="update-profile-header">
                            <h3 className="update-profile-title"> Update Profile </h3>
                            <img id="exitMenu" src={Exit} onClick={() => {props.closeEditProfileMenu(false)}}/>
                        </div>
                        <div className="change-landscape-pic-container">
                            <img className="change-landscape-pic" src={landscapePic} alt="" />
                        </div>                           
                        <form onSubmit={onSubmitLandscape}>
                            <div className="mb-3">
                                <label htmlFor="landscapePic" className="form-label">Choose a Landscape (recommended 1400px X 500px)</label>
                                <input className="form-control" type="file" accept="image/*" multiple="false" id="landscapePic" onChange={onChangeLandscape} />
                            </div>
                            <input type="button" value="Upload" className="upload-profilePic-button" onClick={onSubmitLandscape} />
                        </form>
                        <h4 id="createProject-aboutProject">About me</h4>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Username</label>
                            <input id="createProject-formInput-text" placeholder="Choose a unique name" value={username} required onChange={(event) =>setUsername(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Bio</label>
                            <textarea rows={3} id="createProject-formInput-text" required placeholder="Brief bio (<150 characters)" maxLength={150} value={bio} onChange={(event) =>setBio(event.currentTarget.value)}/>
                            {/* <input id="createProject-formInput-text" placeholder="List key skills (Artist, Programmer, Model etc.)" maxLength={50} value={skills} onChange={(event) =>setSkills(event.currentTarget.value)}/> */}
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Location</label>
                            <input id="createProject-formInput-text" placeholder="City, Country" value={userLocation} onChange={(event) =>setUserLocation(event.currentTarget.value)}/>
                        </div>
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Website</label>
                            <input id="createProject-formInput-text" placeholder="www.yourwebsite.com" value={website} onChange={(event) =>setWebsite(event.currentTarget.value)}/>
                        </div>
                        {/* <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Skillset</label>
                            <input id="createProject-formInput-text" placeholder="List key skills (Artist, Programmer, Model etc.)" maxLength={50} value={skills} onChange={(event) =>setSkills(event.currentTarget.value)}/>
                        </div> */}

                        {/* <button id="createProject-button-submit" onClick={skillReveal}>Check Skills and Skill Tags</button> */}
                        <div id="createProject-formInput">
                            <label id="createProject-formInput-title">Skillset</label>
                            <div id="createProject-formInput-text"> 
                            {/* <div id="createProject-formInput-text" value={skillTags} onChange={(event) =>setSkills(event.currentTarget.value)} >  */}
                                {!skillTags && 
                                    <p>Skill Tags</p>
                                } 
                                {skillTags && 
                                    <>                            
                                    {skillTags.map(element => (
                                        <button id="createProject-skillTagAdded-button">{element}<img id="exitSkillTagButton" onClick={()=> removeSkill(element)} src={ExitWhite}/></button>
                                    ))} 
                                    </>  
                                }                             
                            </div>
                            <div  id="createProject-skillTags">
                                <select id="createProject-tagList" onChange={(e) => setCurrentTag(e.currentTarget.value)}>                            
                                    <option selected disabled>Choose Up to 3 Skill Tags</option>
                                    <option id="skill-option" value="Admin">Admin</option>
                                    <option id="skill-option" value="Artist">Artist</option>
                                    <option id="skill-option" value="Advisor">Advisor</option>
                                    <option id="skill-option" value="Blogger">Blogger</option>
                                    <option id="skill-option" value="Broker">Broker</option>
                                    <option id="skill-option" value="Developer">Developer</option>
                                    <option id="skill-option" value="Gamer">Gamer</option>
                                    <option id="skill-option" value="Graphic Design">Graphic Design</option>
                                    <option id="skill-option" value="Influencer">Influencer</option>
                                    <option id="skill-option" value="IT">IT</option>
                                    <option id="skill-option" value="Lawyer">Lawyer</option>
                                    <option id="skill-option" value="Marketing">Marketing</option>
                                    <option id="skill-option" value="Miner">Miner</option>
                                    <option id="skill-option" value="Musician">Musician</option>
                                    <option id="skill-option" value="Streamer">Streamer</option>
                                    <option id="skill-option" value="Trader">Trader</option>
                                    <option id="skill-option" value="Translator">Translator</option>
                                    <option id="skill-option" value="Writer">Writer</option>
                                </select>                            
                                <button id="createProject-addSkill-button" type="button" onClick={()=> addSkill()}>Add</button>
                            </div>
                            
                        </div>
                        <div id="createProject-formInput-description">
                            <label id="createProject-formInput-title-description">Story<span style={{color:"red"}}> *</span></label>  
                            {/* <textarea rows={3} className="form-control" placeholder="Please describe your project in more detail, up to 550 characters" maxLength={550} value={description} required onChange={(event) =>setDescription(event.currentTarget.value)}/> */}
                            <CKEditor 
                                editor={ClassicEditor}
                                onChange={handleStoryOnChange}                                    
                            />
                        </div>
                        <span style={{color:"red"}}> * Required</span> 
                        <h4 id="createProject-aboutProject">Average starting costs for your service?</h4> 
                        <div id="paymentInput">
                            <div id="createProject-launchStatus-option">
                                <input type="checkbox" id="indevelopment" name="flexRadioDefault" onClick={() => setContactForPricing(!contactForPricing)}/>
                                <p id="contactForPricing-text">I prefer to be contacted about pricing. 
                                    <br/>
                                    (Leave payment fields below blank if you choose this)
                                </p>
                            </div>
                            <div id="createProfile-paymentInput">
                                <label id="createProject-formInput-title">Amount</label>
                                <input id="createProfile-paymentInput-text" placeholder="Average starting costs" type="number" min="0" placeholder="Enter starting amount" value={startRate} onChange={(event) =>setStartRate(event.currentTarget.value)}/>
                                <button class="payInput-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{rate}</button>
                                <ul class="dropdown-menu dropdown-menu-end">                                    
                                    <button class="rateChoice" value="Hour" onClick={(event) =>setRate(event.currentTarget.value)}>Hourly</button>
                                    <button class="rateChoice" value="Job" onClick={(event) =>setRate(event.currentTarget.value)}>Per Job</button>
                                </ul>
                            </div>
                            <div id="createProfile-paymentInput">
                                <label id="createProject-formInput-title">Currency</label>
                                <input id="createProfile-paymentInput-text" maxLength={5} minLength={3} placeholder="USD, BTC, ETH, DAI etc" value={payCurrency} onChange={(event) =>setPayCurrency(event.currentTarget.value)}/>
                            </div>                        
                        </div>                       
                        <h4 id="createProject-aboutProject">Social media</h4>             
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
                        <div className="form-button-wrapper">
                            <button id="createProject-button-submit" onClick={handleSave}>Submit Changes</button>
                            <button id="createProject-button-close" onClick={() => {props.closeEditProfileMenu(false)}}>Close Menu</button>  
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
};

export default UpdateProfile;
