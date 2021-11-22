import React, {useState, useEffect} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import SaveProfile from '../../components/SaveProfile';
import './ProfileCard.css';

function ProfileGridBox(props) {
    const { url } = useRouteMatch();
    const [ratesLive, setRatesLive] = useState(false);

    useEffect(() => {
        if (props.startRate || props.contactForPricing) {
            setRatesLive(true);
        }
      }, []);
    

    return (    
        <>        
            <div className="profilecard-background">
                <div className="profilecard-contents">
                    <div className="profilecard-top">
                        <Link className="profilecard-link" to={`${url}/${props.username}`}>
                            <div className="profilecard-photo-container">
                                <img className="profilecard-photo" src={props.profilePic}/>   
                            </div>
                        </Link>
                    </div>
                    <div className="profilecard-bottom">
                        <div className="profilecard-text">
                            <h4 className="profilecard-username">{props.username}</h4>
                            <p className="profilecard-bio">{props.bio}</p>
                        </div>
                        <div className="profilecard-footer">
                            <div className="profilecard-footer-tags">
                                
                            </div>
                            <div className="profilecard-footer-rates-and-save">
                                {ratesLive &&
                                    <div id="profileRates">                                        
                                        {props.contactForPricing 
                                        ?
                                        <p>Contact for pricing</p>
                                        :
                                        <>
                                        {props.startRate}&nbsp;
                                        {props.payCurrency}&nbsp;
                                        { props.rate && 
                                            <>
                                            /&nbsp;
                                            {props.rate}
                                            </>
                                        }
                                        </>
                                        }
                                    </div>
                                }
                                <div className="saveProfile">
                                    <SaveProfile profileName = {props.username}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileGridBox;
