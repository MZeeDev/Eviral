import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import './User.css';
import './UpdateProfile.css';
import Alert from './Alert';

function UpdateProfile(props) {

    const { user, setUserData, Moralis } = useMoralis();
    const { error, isUploading, moralisFile, saveFile, } = useMoralisFile();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();    
    
    const [landscapeFile, setLandscapeFile] = useState();    
    const [landscapeFileName, setLandscapeFileName] = useState();  
    const [landscapePic, setLandscapePic] = useState();

    const [userLocation, setUserLocation] = useState();
    const [story, setStory] = useState();
    const [skills, setSkills] = useState();
    const [bio, setBio] = useState();
    const [website, setWebsite] = useState();
    const [twitter, setTwitter] = useState();
    const [telegram, setTelegram] = useState();
    const [discord, setDiscord] = useState();
    const [linkedIn, setLinkedIn] = useState();
    const [youtube, setYoutube] = useState();
    const [twitch, setTwitch] = useState();

    const checkProfileCreated = () => {
        const profileCreated = (user.attributes?.profileCreated);
        if(profileCreated){
            setLandscapePic(user.attributes?.landscapePic?._url);
            setUserLocation(user.attributes?.userLocation);
            setStory(user.attributes?.story);
            setSkills(user.attributes?.skills);
            setBio(user.attributes?.bio);
            setWebsite(user.attributes?.website);
            setTwitter(user.attributes?.twitter);
            setTelegram(user.attributes?.telegram);
            setLinkedIn(user.attributes?.linkedIn);
            setDiscord(user.attributes?.discord);
            setYoutube(user.attributes?.youtube);
            setTwitch(user.attributes?.twitch);

        }
    }
    
    useEffect(() => {
        if (user) {
            checkProfileCreated();
        }
      }, [user]);


    const handleSave = async() => {
        await setUserData({            
            userLocation: userLocation === "" ? undefined : userLocation, 
            story: story === "" ? undefined : story ,
            skills: skills === "" ? undefined : skills ,
            bio: bio === "" ? undefined : bio,     
            website: website === "" ? undefined : website,     
            twitter: twitter === "" ? undefined : twitter,     
            telegram: telegram === "" ? undefined : telegram,     
            discord: discord === "" ? undefined : discord,     
            linkedIn: linkedIn === "" ? undefined : linkedIn,     
            youtube: youtube === "" ? undefined : youtube,     
            twitch: twitch === "" ? undefined : twitch,  
            profileCreated: true   
        });
        setAlertContents("Profile Updated!");
        setAlertVisible(true);
        (props.closeEditProfileMenu(false));
    };

    const onChangeLandscape = e => {
        setLandscapeFile(e.target.files[0]);
        setLandscapeFileName(e.target.files[0].name);
    };

      const onSubmitLandscape = async (e) => {
        const file = landscapeFile;
        const name = landscapeFileName;
        let fileIpfs = await saveFile(name, file, { saveIPFS: true });
        user.set("landscapePic", fileIpfs);
        await user.save();
        setLandscapePic(user.attributes.landscapePic._url);
      };

    return (
        <> 
            <div className="update-profile-background">
                <div className="update-container">
                    <div className="update-container-wrapper">
                    <div className="update-profile-header">
                        <h3 className="update-profile-title"> Update Profile </h3>
                        <span className="exitMenu" onClick={() => {props.closeEditProfileMenu(false)}}><i class="far fa-times-circle"></i></span>
                    </div>
                    <div className="change-landscape-pic-container">
                        <img className="change-landscape-pic" src={landscapePic} alt="" />
                    </div>
                        <form className="form-input-container">                            
                            <form onSubmit={onSubmitLandscape}>
                                <div className="mb-3">
                                    <label htmlFor="landscapePic" className="form-label">Choose a Landscape (recommended 1500px X 500px)</label>
                                    <input className="form-control" type="file" accept="image/*" multiple="false" id="landscapePic" onChange={onChangeLandscape} />
                                </div>
                                <button className="updateProfile-btn2-upload" onClick={onSubmitLandscape}>Upload</button>
                            </form>
                            <label className="form-label">Location</label>
                            <input className="form-input" placeholder="City, Country" value={userLocation} onChange={(event) =>setUserLocation(event.currentTarget.value)}/>
                            <label className="form-label">Website</label>
                            <input className="form-input" placeholder="www.yourpage.com" value={website} onChange={(event) =>setWebsite(event.currentTarget.value)}/>
                            <label className="form-label">Skills</label>
                            <input className="form-input" placeholder="List skills as keywords (ie Artist, Programmer, Model)" maxLength={50} value={skills} onChange={(event) =>setSkills(event.currentTarget.value)}/>
                            <label className="form-label">Bio</label>
                            <textarea rows={3} className="form-control" placeholder="Brief bio (<150 characters)" maxLength={150} value={bio} onChange={(event) =>setBio(event.currentTarget.value)}/>
                            <label className="form-label">Story</label>
                            <textarea rows={5} className="form-control" placeholder="What should other know about you? (<450)" maxLength={450} value={story} onChange={(event) =>setStory(event.currentTarget.value)}/>
                        </form>
                        <div className="update-socials">
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-twitter update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={twitter} placeholder=" @username" onChange={(event) =>setTwitter(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-telegram update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={telegram} placeholder=" t.me/  LINK" onChange={(event) =>setTelegram(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-discord update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input  className="input-social-text-box"value={discord} placeholder=" discord.gg/ LINK" onChange={(event) =>setDiscord(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-linkedin update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={linkedIn} placeholder=" linkedin.com/in/ Profile URL" onChange={(event) =>setLinkedIn(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-youtube update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={youtube} placeholder=" youtube.com/c/ channel URL" onChange={(event) =>setYoutube(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="social-link-item">
                                <div className="social-input-box-group">
                                    <i className="fab fa-twitch update"></i>
                                    <span className="social-link-at-box">@</span>
                                    <input className="input-social-text-box" value={twitch} placeholder=" twitch.tv/ channel URL" onChange={(event) =>setTwitch(event.currentTarget.value)}/>
                                </div>
                            </div>
                            </div>
                        <div className="submit">
                            <button className="btn1" onClick={() => {props.closeEditProfileMenu(false)}}>Close Menu</button>
                            
                            <button className="updateProfile-btn2 btn2" onClick={handleSave}>Save Changes</button>
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
