import React, {useState, useEffect} from 'react';
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
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';

function HeroSection() {
    
    const { isInitialized, user } = useMoralis();
    const [ chain, setChain] = useState();
    const [ nativeToken, setNativeToken] = useState();
    const [ amount, setAmount] = useState(0);
    
    const viralToken = "0x7CeC018CEEF82339ee583Fd95446334f2685d24f";
    const eth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const bnb = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    const nativeToken1Inch = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

    // const options = {
    //     chain: chain,
    //     fromTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    //     toTokenAddress: viralToken,
    //     amount: Number(Moralis.Units.ETH("0.00000001")),
    //     fromAddress: Moralis.User.current().get("ethAddress"),
    //     slippage: 19        
    // }
    
    // var transact = async() => { 
    //     var receipt = await dex.swap(options);
    //     console.log(receipt);
    // };

    // let dex;
    // const init = async() => { 
    //     await Moralis.enable;
    //     await Moralis.initPlugins();
    //     dex = Moralis.Plugins.oneInch;
    //  };

    // useEffect(() => {
    //     if(isInitialized){
    //         init();
    //         setChain("eth");
    //     }        
    // }, [isInitialized])


    return (
        
        <div className="background-homepage">
            <video src="/videos/eViral.mp4" classname="background-mp4" autoPlay loop muted />
                <div className='hero-container'>
                    <TokenPrices />
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
                                New to Crypto?  No problem.
                            </h3>
                            <h4>
                                You'll need ETH to buy eViral, or BUSD to buy beViral.
                            </h4>
                            {/* <FortmaticWallet/> */}
                        </div>
                        <OnRamper/>
                    </div>
                <div className="token-swap">
                    <button onClick={0}>Swap</button>
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
