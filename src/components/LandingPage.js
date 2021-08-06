import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingPage.css';
import { useMoralis } from "react-moralis";

function LandingPage() {
    
    const { authenticate, isAuthenticated, user } = useMoralis();
    return (
        <div className='landingpage-container'>
            <video src="/videos/eViral.mp4" autoPlay loop muted />
            <h1> Welcome to EVIRAL </h1>
            <p> Connecting Innovators and Influencers in DeFI </p>
            <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'  onClick={() => authenticate()}>
                    Begin
                </Button>
            </div>
        </div>
    )
}

export default LandingPage;
