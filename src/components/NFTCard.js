import React from 'react';
import {useRouteMatch } from 'react-router-dom';


function NFTCard(props) {

    
    const { url } = useRouteMatch();

    return (
                  
        <div className="project-grid-box-wrapper">
            <div className="project-card-header">
                <div className="project-url-link">                
                <img className="project-card-img" src={props.src}></img>   
                </div>             
            </div>
            <div className="project-card-body">
                <div className="project-card-title">
                    <h4>{props.name}</h4>
                </div>
                <div className="project-card-creator">
                    {props.symbol}{" "}{props.tokenId}
                </div>
                <div className="project-card-summary">
                    {props.description}
                </div>
            </div>
            <div className="project-card-footer">
                <div>{props.contractType}</div>
                <div className="project-card-date">
                    Amount: {props.amount}
                </div>
                
            </div>
        </div>   
    )
}

export default NFTCard;