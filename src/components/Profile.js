import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import { useMoralis, useMoralisFile } from "react-moralis";
import Logo from '../img/newlogo2.png';
import LogoBSC from '../img/newlogoBSC2.png';
import defaultProfile from "../img/defaultProfile.png";
import defaultLandscape from "../img/defaultLandscape.jpg";
import Alert from './Alert';
import CreateNewProject from './CreateProject';



function Profile(props) {

    const { user, Moralis, isInitialized } = useMoralis();   
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    const [profilePic, setProfilePic] = useState("");
    const [landscape, setLandscape] = useState("");
    
    const [balanceETH, setBalanceETH] = useState(0);
    const [balanceBSC, setBalanceBSC] = useState(0);
    
    const [changeProfilePicMenu, setOpenChangeProfilePicMenu] = useState(false);
    const [photoFile, setPhotoFile] = useState();    
    const [photoFileName, setPhotoFileName] = useState();
    const [previewPic, setPreviewPic] = useState();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();
    
    const onChangePhoto = e => {
        setPhotoFile(e.target.files[0]);
        setPhotoFileName(e.target.files[0].name);
        setPreviewPic(URL.createObjectURL(e.target.files[0]));
    };

    
    const onSubmitPhoto = async (e) => {
        const file = photoFile;
        const name = photoFileName;
        let fileIpfs = await saveFile(name, file, { saveIPFS: true });
        user.set("profilePic", fileIpfs);
        await user.save();
        setProfilePic(user.attributes.profilePic._url);
        setAlertContents("Uploaded!");
        setAlertVisible(true);
    };

    const renderBalance = async () => {
        const eViralBalance = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const beViralBalance = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const eBalance = eViralBalance.balance/(10**18);
        const bBalance = beViralBalance.balance/(10**18);
        const balance = (eBalance.toFixed(3));
        const bvBalance = (bBalance.toFixed(3));
        setBalanceETH(balance);
        setBalanceBSC(bvBalance);
    }

    const editProfileCheck = async() => {
        if( (balanceETH == 0) && (balanceBSC == 0) ) {
            setAlertContents( 
                <>
                <div className="alert-popup-contents">
                You'll need to own either eViral or beViral to access this feature.
                <Link to='/'><button className="btn2">Buy from Home Page</button></Link>
                </div>
                </>);
            setAlertVisible(true);
        } else {
            props.openEditProfileMenu(true);
        }
    }

    const createProjectCheck = () => {
        if( (balanceETH == 0) && (balanceBSC == 0) ) {
            setAlertContents(
                <>
                <div className="alert-popup-contents">
                You'll need to own either eViral or beViral to access this feature.
                <Link to='/'><button className="btn2">Buy from Home Page</button></Link>
                </div>
                </>
                );
            setAlertVisible(true);
        }  else 
        if (!user.attributes?.profileCreated) {
                setAlertContents(
                    <>
                <div className="alert-popup-contents">
                You'll need to set up a Profile to access this feature.                
                </div>
                </>
                ) 
                setAlertVisible(true);
        } else {
            props.openCreateProjectMenu(true);
        }
    }

    const userCheck = async() => {
        console.log(user);
        const eViral = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const beViral = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const balanceETH = eViral.balance;
        const balanceBSC = beViral.balance;
        if( (balanceETH == 0) && (balanceBSC == 0) ) {
          setAlertContents(
              <>
              <div className="alert-popup-contents">
              You'll need to own either eViral or beViral to access this feature.
              <Link to='/'><button className="btn2">Buy from Home Page</button></Link>
              </div>
              </>
              );
          setAlertVisible(true);
        }  else if (!user.attributes?.profileCreated) {
          setAlertContents(
              <>
          <div className="alert-popup-contents">
          You'll need to set up a Profile to access this feature.                
          </div>
          </>
          ) 
          setAlertVisible(true);
        } else {
            setOpenChangeProfilePicMenu(true);
        }
      }

    useEffect(() => {
        if(isInitialized){
        if (user) {
            if(typeof user.attributes?.profilePic?._url === 'undefined') {
                setProfilePic(defaultProfile);
            } else {
                setProfilePic(user.attributes?.profilePic?._url);
            }
            if(typeof user.attributes?.landscapePic?._url === 'undefined') {
                setLandscape(defaultLandscape);
            } else {
                setLandscape(user.attributes?.landscapePic?._url);
            }                    
            setPreviewPic(profilePic);
          renderBalance();
        }
    }
      }, [isInitialized]);


    return (
        <>
        
            <div className="profile-container-wrapper">
                <div className="profile-wrapper">
                    <div className="profile-background">
                        <img className='landscape-pic' src={landscape} alt=""/>
                    </div>
                    <div className="profile-header">
                        <div className="profile-pic-container"onClick={() => userCheck()}>
                            <img className="profile-pic" src={profilePic} alt="" id="profilePic" />
                            <div className="middle-of-profilePic">                                
                                    <i class="fas fa-camera-retro"></i>                                
                            </div>
                        </div>
                        <div className="profile-page-summary">
                            <h2 className="profile-page-username"> {user?.attributes?.username} </h2>
                            <p className="profile-page-bio">{user?.attributes?.bio}</p>
                
                        </div>
                
                    </div>
                 <div className="edit-profile-wrapper">
                    <div className="profile-page-balances">
                        <div className="profile-balances-wrapper">
                            <div className="showProfileBalance">
                                <p>{balanceETH}&nbsp;Bil</p>
                                <img className="logo-balance-display" src={Logo} alt="" ></img>
                            </div>
                            <div className="showProfileBalanceBSC">
                                <p>{balanceBSC}&nbsp;Bil</p>
                                <img className="logo-balance-display" src={LogoBSC} alt="" ></img>
                            </div>
                        </div>
                    </div>
                    <div className="profile-header-btns">
                        <button className="create-project-button btn1" onClick={createProjectCheck}>
                        <i class="fas fa-puzzle-piece"></i>
                            <span>Create&nbsp;Project</span>
                        </button>
                        <button className="edit-profile-button btn2" onClick={editProfileCheck}>
                        <i class="fas fa-pen"></i>
                            <span>Edit&nbsp;Profile</span>
                        </button>
                    </div>                    
                </div>
                </div>
            </div>
            {changeProfilePicMenu &&
            <div className="update-profile-background">
                <div className="update-container">
                    <div className="update-profilepic-container-wrapper">
                    <div className="update-profile-header">
                        <h3 className="update-profile-title">Choose a Profile Picture</h3>
                        <span className="exitMenu" onClick={() => {setOpenChangeProfilePicMenu(false)}}><i class="far fa-times-circle"></i></span>
                    </div>
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={previewPic} alt="" />
                    </div>
                        <form className="form-input-container">
                            <form onSubmit={onSubmitPhoto}>
                                <div className="mb-3">
                                    <label htmlFor="profilePhoto" className="form-label">Select Image File</label>
                                    <input className="form-control" type="file" accept="image/*" multiple="false" id="profilePhoto" onChange={onChangePhoto} />
                                </div>
                                <div className="change-profile-pic-footer">
                                    <input type="button" value="Upload" className="upload-profilePic-button btn2" onClick={onSubmitPhoto} />
                                    <button className="btn1" onClick={()=>{setOpenChangeProfilePicMenu(false)}}>Close</button>
                                </div>
                            </form>
                        </form>
                    </div>
                </div>
            </div>
            
            }
            {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
            }
        </>
    )
}

export default Profile