import React from 'react';
import {useRouteMatch } from 'react-router-dom';
import './NFTCard.css';


function NFTCard(props) {

    
    const { url } = useRouteMatch();

    return (
                  
        <div className="nft-card-wrapper">
            <div className="nft-card-title">
                    <h4>{props.name}</h4>
                </div>
            <div className="nft-card-header">
                <div className="nft-card-img-wrapper">                
                <img className="nft-card-img" src={props.src}></img>   
                </div>             
            </div>
            <div className="nft-card-body">
                
                <div className="nft-card-creator">
                    {props.symbol}{" "}{props.tokenId}
                </div>
                <div className="nft-card-summary">
                    {props.description}
                </div>
            </div>
            <div className="nft-card-footer">
                <div>{props.contractType}</div>                
                <div>Amount: {props.amount}</div>                
            </div>
        </div>   
    )
}

export default NFTCard;