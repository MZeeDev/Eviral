import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";
import HeartOutlined from '../img/heartoutlined.svg';
import HeartFull from '../img/heartfull.png';

function SaveProfile(props) {
    const { user, Moralis, isInitialized } = useMoralis();
    const [saved, setSaved] = useState();
    let isSaved = (props.isSaved);

    const saveProfile = async() => {
        setSaved(true);
        const params = { profileName: props.profileName};
        const userProfile = await Moralis.Cloud.run("findUser", params);
        console.log(userProfile);        
        console.log(params);
        const currentUser = await Moralis.User.current();
        const relation = currentUser.relation("savedProfiles");
        relation.add(userProfile);
        await user.save();
        alert(`${props.profileName}'s profile saved.`);
    }

    const removeProfile = async() => {
        setSaved(false);
        const params = { profileName: props.profileName};
        const userProfile = await Moralis.Cloud.run("findUser", params);
        console.log(userProfile);        
        console.log(params);
        const currentUser = await Moralis.User.current();
        const relation = currentUser.relation("savedProfiles");
        relation.remove(userProfile);
        await user.save();
        alert(`${props.profileName}'s profile removed.`);
    }  

    const checkSavedProfile = async() => {
        const params = {profileName: props.profileName}
        const results = await Moralis.Cloud.run("checkIfSavedProfile", params);
        
        if(results[0]) {
            setSaved(true);
        } 
    }

    useEffect(() => {
        if(isInitialized){
        checkSavedProfile();
        }
        },
        [isInitialized],
      );

    return (        
        <div className="bookmark" >
            {(saved || isSaved) 
                ? 
                <img className="saveProfile-heart" src={HeartFull} onClick={() => removeProfile()}/>  
                : 
                <img className="saveProfile-heart" src={HeartOutlined} onClick={() => saveProfile()}/>
            }
        </div>        
    )
}

export default SaveProfile;
