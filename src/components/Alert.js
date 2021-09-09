import React, {useState} from 'react';
import Logo from '../img/roundlogo.png';
import './Alert.css';

function Alert(props) {
    return (
        <>
            <div className="alert-background">
                <div className="alert-container">
                    <div className="alert-wrapper">
                        <div className="alert-title">
                            <img className="alertLogo" src={Logo} ></img>
                            <h3>MESSAGE</h3>
                        </div>
                        <div className="alert-options">
                            {props.content}
                        </div>
                        <div className="alert-footer">
                            <button  onClick={() => {props.visible(false)}}>OKAY</button>
                        </div>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default Alert;
