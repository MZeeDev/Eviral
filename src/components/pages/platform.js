import React from 'react';
import Cards from '../Cards';
import '../../components/Platform.css';

import eViralLogo from "../../img/eViralLogo2.png";
import beViralLogo from "../../img/beviral.png";

function Platform() {

    
    return (
        <div className="platform-background">
            <Cards/>
            <div className="tokenIframes">
                <div className="tokenIframes-wrapper">
                <div className="eViralIframe">
                    <h3 className="iframe-title">Buy <img className="eViralLogo" src={eViralLogo}/>Viral Ethereum on UniswapV2</h3>
                    <iframe
                        src="https://app.uniswap.org/#/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f&use=V2"
                        height="660px"
                        id="myId"
                    />
                </div>
                <div className="beViralIframe">
                    <h3 className="iframe-title">Buy <img className="eViralLogo" src={beViralLogo}/>Viral Binance on PancakeSwapV2</h3>
                    <iframe
                        src="https://pancakeswap.finance/swap?outputCurrency=0x7cec018ceef82339ee583fd95446334f2685d24f"
                        height="660px"
                        id="myId"
                    />
                </div>
                </div>
            </div>   
        </div>
    )
}

export default Platform;
