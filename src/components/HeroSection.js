import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import './HeroSection.css';
import { ByMoralis } from 'react-moralis';
import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import Cards from './Cards';

import OnRamper from './OnRamper';
import TokenPrices from './TokenPrices';
import FortmaticWallet from './FortmaticWallet';

function HeroSection() {
    return (
        
        <div className="background-homepage">
            <video src="/videos/eViral.mp4" classname="background-mp4" autoPlay loop muted />
                <div className='hero-container'>
                    {/* <TokenPrices /> */}
                    <div className="homepage-welcome">
                        {/* <h1> Viral Crypto </h1> */}
                        <h2 className="hero-text">Connecting Innovators and Influencers in DeFI</h2>
                        <p className="hero-text">Own eViral or BeViral and join the network of independent blockchain creators.</p>
                    </div>
                    <div className="homepage-buttons">
                        <Link to='/projects' className="homepage-button btn2">Discover&nbsp;Projects</Link>
                        <Link to='/profiles' className="homepage-button btn2">Find&nbsp;Profiles</Link>
                    </div>
                    <div className="homepage-onRamp">
                        <div className="homepage-onRamp-text">
                            <h3>
                                New to Crypto?                                
                                <br/>
                                No problem!
                            </h3>
                            <h4>
                                You'll need ETH to buy eViral, or BUSD to buy beViral.
                            </h4>
                            {/* <FortmaticWallet/> */}
                        </div>
                        <OnRamper/>
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
                <div className="byMoralis">
                    <ByMoralis  width={300} variant="dark" />
                </div>
            
            </div>
        </div>
        
    )
}

export default HeroSection;
