import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/eViral.mp4" autoPlay loop muted />
            <h1> Welcome to EVIRAL </h1>
            <p className="hero-text">Connecting Innovators and Influencers in DeFI</p>
        </div>
    )
}

export default HeroSection;
