import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';


import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import Cards from './Cards';

function HeroSection() {
    return (
        
        <div className="background-homepage">
            <video src="/videos/eViral.mp4" classname="background-mp4" autoPlay loop muted />
                <div className='hero-container'>
                    <div className="homepage-welcome">
                        <h1> Viral Crypto </h1>
                        <p className="hero-text">Connecting Innovators and Influencers in DeFI</p>
                    </div>
                <div className="tokenIframes">
                    <div className="tokenIframes-wrapper">
                        <div className="eViralIframe">
                            <h3 className="iframe-title">Buy <img className="eViralLogo" src={eViralLogo}/>Viral Ethereum</h3>
                            <iframe
                                src="https://app.uniswap.org/#/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f&use=V2"
                            />
                        </div>
                        <div className="beViralIframe">
                            <h3 className="iframe-title">Buy <img className="eViralLogo" src={beViralLogo}/>Viral Binance</h3>
                            <iframe
                                src="https://pancakeswap.finance/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f"
                            />
                        </div>
                    </div>
                </div>
            <Cards/>
            </div>
        </div>
        
    )
}

export default HeroSection;
