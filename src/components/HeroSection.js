import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/eViral.mp4" autoPlay loop muted />
            <h1> Evolve. Decentralize. Progress. </h1>
            <p className="hero-text">Begin Your Evolution</p>
            <div className="hero-btns">
                <Button to="/profile" className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    Get EvolveD
                </Button>
            </div>
        </div>
    )
}

export default HeroSection;
