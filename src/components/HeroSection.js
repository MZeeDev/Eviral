import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import './HeroSection.css';
import { ByMoralis } from 'react-moralis';
import Cards from './Cards';

import OnRamper from './OnRamper';
import TokenPrices from './TokenPrices';
import FortmaticWallet from './FortmaticWallet';
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';

import Logo from '../img/newlogo2.png';
import LogoBSC from '../img/newlogoBSC2.png';
import HowItWorks from "../img/howitworks.jpg";
import VCLabsM from "../img/vclabsmobile.jpg";
import VCLabsD from "../img/vclabsdesktop.png";
import Etherscan from "../img/etherscan-logo.png";
import BSCScan from "../img/bscscan-logo.png";

function HeroSection() {
    
    const { isInitialized, user } = useMoralis();
    const [ chain, setChain] = useState();
    const [ nativeToken, setNativeToken] = useState();
    const [ amount, setAmount] = useState(0);
    
    const eth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const bnb = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;


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
                        <a href="#vclabs" className="homepage-button btn2">VC&nbsp;Labs</a>
                    </div>
                    <div id="how-it-works1">                    
                        <img src={HowItWorks} />
                    </div>
                    <div id="how-it-works2">
                        <img src={Logo} id="how-it-works-logo"/>
                        <div id="how-it-works-title">
                            <h4>How it Works</h4>
                        </div>
                        <div id="how-it-works-content">
                            <section id="how-it-works-section">
                                <h6>1. Get Viral Tokens</h6>
                                <article>Currently available on both the Ethereum and BSC blockchains, by owning any viral tokens you gain access to the platform.</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>2. Create Your Space</h6>
                                <article>By owning viral tokens you can connect to the platform, create a profile, and host project pages for new and existing projects.</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>3. Collaborate</h6>
                                <article>Connect and message other DeFi enthusiasts to work together, learn new skills, share interests, and evaluate new projects.</article>
                            </section>
                        </div>
                    </div>
                    <div id="how-it-works3">
                        <img src={LogoBSC} id="how-it-works-logo"/>
                        <div id="why-viral-crypto">
                            <h3>Why ViralCrypto?</h3>
                        </div>                            
                        <div id="how-it-works-content">
                            <section id="how-it-works-section">
                                <h6>Fundamentals</h6>
                                <article>The VC platform allows users to safely collaborate, share interests, and evaluate new projects.</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>First Steps</h6>
                                <article>Users connect to the platform via our secure web3 walle-connect and create a profile that is uniquely associated with their wallet address.</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>Freelancer Network Functionality</h6>
                                <article>Users can create pages for new projects that are still in development in order to collaborate with freelancers.</article>
                            </section>
                            
                        </div>
                    </div>
                    <div id="how-it-works3">
                        <img src={Logo} id="how-it-works-logo"/>                        
                        <div id="how-it-works-content">
                            <section id="how-it-works-section">
                                <h6>Reputation Building</h6>
                                <article>Users can create verified project pages for establish projects that are administered by the appropriate representative of that project</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>Growing Together</h6>
                                <article>Users can rate and review projects in addition to connecting with verified project creators</article>
                            </section>
                            <section id="how-it-works-section">
                                <h6>Privacy Meets Publicity</h6>
                                <article>Whether a user is publicly doxxed or not, their projects along with their reviews and ratings follow them forever on the VC platform.</article>
                            </section>
                        </div>
                    </div>
                    
                    <div className="buy-button">
                        <a href="#tokenIframes" className="homepage-button btn2">Buy&nbsp;Viral&nbsp;Tokens</a>
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
                {/* <div className="token-swap">
                    <button onClick={0}>Swap</button>
                </div> */}
                <div className="tokenIframes" id="tokenIframes">
                    <div className="tokenIframes-wrapper">
                        <div className="eViralIframe">
                            <h3 className="iframe-title">Buy <img className="eViralLogo" src={Logo}/>Viral Ethereum</h3>
                            <Link to={{ pathname: (`https://www.dextools.io/app/ether/pair-explorer/0xf38424fb7da8603e331aca2acb6cef8aed469fe2`) }} target="_blank" className="homepage-token-button ">Chart</Link>
                            <Link to={{ pathname: (`https://team.finance/view-coin/0x7CeC018CEEF82339ee583Fd95446334f2685d24f?name=Viral%20Ethereum&symbol=eViral%20%F0%9F%A7%AC`) }} target="_blank" className="homepage-token-button btn2"><i class="fas fa-lock"></i> Liquidity</Link>
                            <Link to={{ pathname: (`https://etherscan.io/token/0x7cec018ceef82339ee583fd95446334f2685d24f`) }} target="_blank" className="homepage-token-button btn2"><img id="etherscan" src={Etherscan}/></Link>
                            <iframe
                                src="https://app.uniswap.org/#/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f&use=V2"
                            />
                        </div>
                        <div className="beViralIframe">
                            <h3 className="iframe-title">Buy <img className="eViralLogo" src={LogoBSC}/>Viral Binance</h3>
                            <Link to={{ pathname: (`https://www.dextools.io/app/bsc/pair-explorer/0xb76b40213d618a9099ba14bd859596904828aff5`) }} target="_blank" className="homepage-token-button btn2">Chart</Link>
                            <Link to={{ pathname: (`https://team.finance/view-coin/0x7CeC018CEEF82339ee583Fd95446334f2685d24f?name=Viral%20Ethereum&symbol=eViral%20%F0%9F%A7%AC`) }} target="_blank" className="homepage-token-button btn2"><i class="fas fa-lock"></i> Liquidity</Link>
                            <Link to={{ pathname: (`https://bscscan.com/token/0x7cec018ceef82339ee583fd95446334f2685d24f`) }} target="_blank" className="homepage-token-button btn2"><img id="bscscan" src={BSCScan}/></Link>
                            <iframe
                                src="https://pancakeswap.finance/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f"
                            />
                        </div>
                    </div>
                </div>
                
            <Cards/>
            <div id="vclabs">
                <img src={VCLabsM} id="vclabsm"/>
                <img src={VCLabsD} id="vclabsd"/>
            </div>
            <div id="why-viral-crypto">
                <h3>Front-end Dev <br/> HACKATHON</h3>
                <p>Winning developers will also be featured in search, here on the homepage and given credit on the team page. 
                    <br/>
                </p>
                <p> October 1st through December 1st 2021, VC Labs is running its first HACKATHON and will select:
                    <br/>
                    <br/>
                    4 innovative, community-driven features to add
                    <br/>
                    <br/>
                    and
                    <br/>
                    <br/>
                    1 innovative improvement on search capability
                </p>
            </div>
                    <div className='social-icon-wrapper'>
                        <Link className='profile-social-icon twitter' to={{ pathname: (`https://twitter.com/viralcryptoapp`) }} target="_blank" aria-label='Twitter'>
                            <i className="fab fa-twitter"></i>
                        </Link>        
                        <Link className='profile-social-icon telegram' to={{ pathname: (`https://t.me/ViralCryptoApp`) }} target="_blank" aria-label='Telegram'>
                            <i className="fab fa-telegram"></i>
                        </Link>
                    
                        <Link className='profile-social-icon discord' to={{ pathname: (`https://discord.gg/qVbhwxWsEZ`) }} target="_blank" aria-label='Discord'>
                            <i className="fab fa-discord"></i>
                        </Link>
                    
                        <Link className='profile-social-icon linkedIn' to={{ pathname: (`https://www.linkedin.com/company/viralcrypto`) }} target="_blank" aria-label='LinkedIn'>
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link className='profile-social-icon youtube' to={{ pathname: (`https://medium.com/@ViralCrypto`) }} target="_blank" aria-label='Medium'>
                        <i class="fab fa-medium"></i>
                        </Link>
                        <Link className='profile-social-icon twitch' to={{ pathname: (`https://twitch.tv/@ViralCryptoApp`) }} target="_blank" aria-label='Twitch'>
                            <i className="fab fa-twitch"></i>
                        </Link>        
                        <Link className='profile-social-icon twitch' to={{ pathname: (`https://vm.tiktok.com/ZMRv5NxqA/`) }} target="_blank" aria-label='TikTok'>
                        <i class="fab fa-tiktok"></i>
                        </Link>        
                        <Link className='profile-social-icon twitch' to={{ pathname: (`https://www.instagram.com/p/CUbgem0jJ5U/?utm_medium=copy_kink`) }} target="_blank" aria-label='Instagram'>
                        <i class="fab fa-instagram"></i>
                        </Link>        
                    </div>
                <div className="byMoralis">
                    <br/>
                    <ByMoralis  width={300} variant="dark" />
                </div>
            
            </div>
        </div>
        
    )
}

export default HeroSection;
