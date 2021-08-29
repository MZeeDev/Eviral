import React, {useState } from 'react';
import { Link } from 'react-router-dom';

function UserProfile(props) {
    
    
    const [bookmark, setBookmark] = useState(true);

    const saveProject = () => {
        setBookmark(!bookmark);
    }

    return (
        <>
            <div className="profile-wrapper">
                <div className="profile-background">
                    <img className='landscape-pic' src={props.landscapePic} alt=""/>   
                </div>
                <div className="profile-header">                        
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={props.profilePic} alt="" id="profilePic"/>                        
                    </div>                        
                    <div className="profile-summary">
                        <h2 className="profile-username">{props.username} </h2>
                        <p className="profile-bio">{props.bio}</p>
                        
                    </div>
                    <div className="edit-profile-wrapper">
                    <div className="bookmark" onClick={saveProject}>
                            {bookmark ? <i class="far fa-heart"></i> : <i class="fas fa-heart"></i>}
                        </div>
                        <div className="profile-heading-socials">
                            <div className='social-icon-wrapper'>
                                <Link className='social-icon twitter' to={{ pathname: (props.twitter) }} target="_blank" aria-label='Twitter'>
                                <i className="fab fa-twitter"></i>
                                </Link>
                                <Link className='social-icon telegram' to={{ pathname: (props.telegram) }} target="_blank" aria-label='Telegram'>
                                <i className="fab fa-telegram"></i>
                                </Link>
                                <Link className='social-icon discord' to={{ pathname: (props.discord) }} target="_blank" aria-label='Discord'>
                                <i className="fab fa-discord"></i>
                                </Link>
                                <Link className='social-icon linkedIn' to={{ pathname: (props.linkenIn) }} target="_blank" aria-label='LinkedIn'>
                                <i className="fab fa-linkedin"></i>
                                </Link>
                                <Link className='social-icon youtube' to={{ pathname: (props.youtube) }} target="_blank" aria-label='Youtube'>
                                <i className="fab fa-youtube"></i>
                                </Link>
                                <Link className='social-icon twitch' to={{ pathname: (props.twitch) }} target="_blank" aria-label='Twitch'>
                                <i className="fab fa-twitch"></i>
                                </Link>
                            </div>
                            
                        </div>
                        <Link className="profile-website" to={{ pathname: (props.website) }} target="_blank" aria-label='Website'><i class="fas fa-link"></i>{props.website}</Link>
                        <div className="profile-header-btns">                            
                            
                        </div>
                    </div>                     
                </div>                
            </div>            
        </>
    )
}


export default UserProfile
