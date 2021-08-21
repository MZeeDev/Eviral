import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import './User.css';
import './UpdateProfile.css';

function UpdateProfile(props) {

    const { user, setUserData, Moralis } = useMoralis();
    const { error, isUploading, moralisFile, saveFile, } = useMoralisFile();
    
    const [username, setUsername] = useState();
    
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
    
    useEffect(() => {
        if (user) {
            setLandscapePic(user.attributes?.landscapePic?._url);
        }
      }, [user]);


    const handleSave = () => {
        setUserData({            
            username: username === "" ? undefined : username,
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
        });
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
                                <input type="button" value="Upload" className="upload-button btn2" onClick={onSubmitLandscape} />
                            </form>
                            <label className="form-label">Username</label>
                            <input className="form-input" placeholder="Enter a Username" value={username} onChange={(event) =>setUsername(event.currentTarget.value)}/>
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
                                <i className="fab fa-twitter"></i>
                                <input value={twitter} placeholder=" twitter" onChange={(event) =>setTwitter(event.currentTarget.value)}/>
                            </div>
                            <div className="social-link-item">
                                <i className="fab fa-telegram"></i>
                                <input value={telegram} placeholder=" telegram" onChange={(event) =>setTelegram(event.currentTarget.value)}/>
                            </div>
                            <div className="social-link-item">
                                <i className="fab fa-discord"></i>
                                <input value={discord} placeholder=" discord" onChange={(event) =>setDiscord(event.currentTarget.value)}/>
                            </div>
                            <div className="social-link-item">
                                <i className="fab fa-linkedin"></i>
                                <input value={linkedIn} placeholder=" linkedin" onChange={(event) =>setLinkedIn(event.currentTarget.value)}/>
                            </div>
                            <div className="social-link-item">
                                <i className="fab fa-youtube"></i>
                                <input value={youtube} placeholder=" youtube" onChange={(event) =>setYoutube(event.currentTarget.value)}/>
                            </div>
                            <div className="social-link-item">
                                <i className="fab fa-twitch"></i>
                                <input value={twitch} placeholder=" twitch" onChange={(event) =>setTwitch(event.currentTarget.value)}/>
                            </div>
                        </div>
                        <div className="submit">
                            <button className="btn1" onClick={() => {props.closeEditProfileMenu(false)}}>Close Menu</button>
                            
                            <button className="btn2" onClick={handleSave}>Save Changes</button>
                        </div>
                
                    </div>
                </div>
            </div>
        </>
    )
};

export default UpdateProfile;
