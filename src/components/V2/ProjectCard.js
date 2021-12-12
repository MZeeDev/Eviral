import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Bookmark from '../../components/Bookmark';
import Rating from '../../components/Rating';
import './ProjectCard.css';

import tagLive from '../../img/tagLive.svg';
import tagIndev from '../../img/tagINDEV.svg';
import tagPro from '../../img/tagPro.svg';

import AVAX from '../../img/BlockChains/avalanche.png';
import ADA from '../../img/BlockChains/cardano.png';
import ATOM from '../../img/BlockChains/cosmos.png';
import FTM from '../../img/BlockChains/fantom.png';
import ONE from '../../img/BlockChains/harmony.png';
import HECO from '../../img/BlockChains/heco.png';
import DOT from '../../img/BlockChains/polkadot.png';
import MATIC from '../../img/BlockChains/polygon.png';
import PULS from '../../img/BlockChains/pulsechain.png';
import SOL from '../../img/BlockChains/solana.png';
import TRON from '../../img/BlockChains/tron.png';
import ETH from '../../img/BlockChains/eth.png';
import BSC from '../../img/BlockChains/bsc.png';


function ProjectCard(props) {    
    const { url } = useRouteMatch();
    const verified = (props.isVerified);
    const isLive = (props.isLive);




    return (
        <>        
            <div className={ verified ? "projectcard-background-pro": "projectcard-background"}>
                <div className="projectcard-contents">
                    <div className="projectcard-top">
                        <Link className="projectcard-link" to={`/projects/${props.path}`}>
                            <div className="projectcard-photo-container">
                                <img className="projectcard-photo" src={props.src}/>                                        
                                <div id="overlayprojectcard">
                                    <div id="projectcard-blockchains-container">
                                        { props.blockchains &&
                                            <>
                                                { props.blockchains &&
                                                <div id="projectcard-blockchains">
                                                    {props.blockchains.map(element => {
                                                    return   <img src={
                                                                element == "ETH" ? ETH : 
                                                                element == "BSC" ? BSC : 
                                                                element == "MATIC" ? MATIC : 
                                                                element == "AVAX" ? AVAX : 
                                                                element == "FTM" ? FTM : 
                                                                element == "ATOM" ? ATOM : 
                                                                element == "ONE" ? ONE : 
                                                                element == "PULS" ? PULS : 
                                                                element == "DOT" ? DOT : 
                                                                element == "ADA" ? ADA : 
                                                                element == "TRON" ? TRON : 
                                                                element == "HECO" ? HECO : 
                                                                element == "SOL" ? SOL : ""}
                                                                />
                                                            
                                                    })}
                                                </div>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="projectcard-creator-info">
                                    <img className="projectcard-creator-profilepic" src={props.creatorProfilePic}/>
                                    <div className="projectcard-creator-nameanddate">
                                        <p className="projectcard-creator-username">{props.username}</p>
                                        <p className="projectcard-created-on-date">{props.createdOn}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="projectcard-bottom">
                        <div className="projectcard-text">
                            <h4 className="projectcard-title">{props.title}</h4>
                            <p className="projectcard-summary">{props.summary}</p>
                        </div>
                        <div id="projectcard-featureTags">
                            {props.featureTags &&
                            <>
                                { props.featureTags &&
                                    <>
                                        {props.featureTags.map(element => (
                                            <div id="projectcard-featureTag">{element}</div>
                                        ))}
                                    </>
                                }
                            </>
                            }
                        </div>
                    </div>
                    <div className="projectcard-footer">
                        <Rating title={props.title}/>
                        <div className="project-card-badges">
                            { verified &&                      
                                <img id="project-card-badge" src={tagPro}/>                      
                            }
                            {isLive &&
                                <img id="project-card-badge" src={tagLive}/>                
                            }
                            {!isLive &&
                                <img id="project-card-badge" src={tagIndev}/>              
                            }
                        </div>
                        <Bookmark projectTitle={props.title}/>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectCard;
