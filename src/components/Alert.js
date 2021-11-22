import React, {useState} from 'react';
import Logo from '../img/roundlogo.png';
import './Alert.css';

function Alert(props) {
    const notVisible = (visble) => props.visible(false);
    return (
        <>
            <div className="alert-background">
                <div className="alert-container">
                    <div className="alert-wrapper">
                        <div className="alert-title">                            
                            <h3>Message</h3>
                        </div>
                        <div className="alert-options">
                            {props.content}
                        </div>
                        <div className="alert-footer">
                            <button  onClick={() => {props.visible(false)}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default Alert;
