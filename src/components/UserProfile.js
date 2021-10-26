import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SocialIconBar from './SocialIconBar';
import SaveProfile from './SaveProfile';
import { useMoralis } from "react-moralis";
import { Helmet } from 'react-helmet';

function UserProfile(props) {
    const { user, Moralis } = useMoralis();
    const [isSaved, setIsSaved] = useState(props.isSaved);
    const mainPhoto = props.profilePic;

    const checkSavedProfile = async() => {
        const params = {profileName: props.profileName}
        const results = await Moralis.Cloud.run("checkIfSavedProfile", params);
        
        if(results[0]) {
            setIsSaved(true);
        } 
    }

    

    // useEffect(() => {
    //     if(user){
    //     checkSavedProfile();
    //     }
    //     },
    //     [init],
    //   );



    return (
        <>
        <Helmet>
          <meta property="og:url" content={`https://viralcrypto.app/profiles/${props.username}`} />
          <meta property="og:title" content={props.username} />
          <meta property="og:description" content={props.summary} />
          <meta property="og:image" content={mainPhoto} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={props.twitter} />
          <meta name="twitter:title" content={props.username} />
          <meta name="twitter:description" content={props.bio}/>
          <meta name="twitter:image" content={mainPhoto} />
      </Helmet>
            <div className="profile-wrapper">
                <div className="profile-background">
                    <img className='landscape-pic' src={props.landscapePic} alt=""/>   
                </div>
                <div className="profile-header">                        
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={props.profilePic} alt=""/>                        
                    </div>                        
                    <div className="profile-summary">
                        <h2 className="profile-page-username">{props.username} </h2>
                        <p className="profile-page-bio">{props.bio}</p>
                                          
                    </div>
                    <div className="save-profile-wrapper">
                    <SaveProfile
                        profileName = {props.username}
                        isSaved = {props.isSaved}
                    />
                    </div>                     
                </div>                
            </div>            
        </>
    )
}


export default UserProfile
