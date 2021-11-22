import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './SwapContainer.css';

import AVAX from '../../img/avaxlogo.png';
import BSC from '../../img/bsclogo.png';
import ETH from '../../img/ethlogo.png';
import MATIC from '../../img/maticlogo.png';
import Etherscan from '../../img/etherscan-logo-circle.svg';
import BscScan from '../../img/bscscan-logo-circle.svg';
import EViral from '../../img/newlogo2.png';
import BeViral from '../../img/newlogoBSC2.png';

function SwapContainer() {

    const balance = 0;
    return (
        <div id="tokenSwap-container">
            <div id="tokenSwap-chain-container">
                <img id="tokenSwap-chain" src={ETH}/>
                <img id="tokenSwap-chain" src={BSC}/>
                <img id="tokenSwap-chain" src={MATIC}/>
                <img id="tokenSwap-chain" src={AVAX}/>
            </div>
            <div id="tokenSwap-input-container">
                <p>I want to spend</p>
                <div id="tokenSwap-input">
                    <input id="tokenSwap-inputAmount" type="number" min="0" placeholder="0" />
                    <button id="tokenSwap-input-top">
                        <img id="tokenSwap-tokenlogo" src={ETH}/>
                        {balance}
                    </button>
                </div>
            </div>
            <div id="tokenSwap-input-container">
                <p>I want to buy</p>
                <div id="tokenSwap-input">
                <input id="tokenSwap-inputAmount" type="number" min="0" placeholder="0" />
                    <div id="tokenSwap-input-top">
                        <img id="tokenSwap-tokenlogo" src={EViral}/>
                        {balance}
                    </div>
                </div>
            </div>
            <div id="tokenSwap-swapandapprove">
                <button id="tokenSwap-button1">Swap</button>
                <button id="tokenSwap-button1">Approve</button>
            </div>
            <div id="tokenSwap-information">
                <p>More Information</p>
                <div id="tokenSwap-tokenlinks">
                    <img id="tokenSwap-tokenlogo-info" src={EViral}/> 
                    <Link to={{ pathname: (`https://www.dextools.io/app/bsc/pair-explorer/0xb76b40213d618a9099ba14bd859596904828aff5`) }} target="_blank">
                        <button id="tokenSwap-button2">Charts</button>
                    </Link>
                    <Link to={{ pathname: (`https://www.team.finance/view-coin/0x7CeC018CEEF82339ee583Fd95446334f2685d24f?name=Viral%20Ethereum&symbol=eViral%20%F0%9F%A7%AC`) }} target="_blank">
                        <button id="tokenSwap-button2">Liquidity</button>
                    </Link>
                    <Link to={{ pathname: (`https://etherscan.io/token/0x7cec018ceef82339ee583fd95446334f2685d24f`) }} target="_blank">
                        <button id="tokenSwap-button2">
                            <img id="etherscanlogo" src={Etherscan}/>  
                            Etherscan                      
                        </button>
                    </Link>
                </div>
                <div id="tokenSwap-tokenlinks">
                    <img id="tokenSwap-tokenlogo-info" src={BeViral}/> 
                    <Link to={{ pathname: (`https://www.dextools.io/app/ether/pair-explorer/0xf38424fb7da8603e331aca2acb6cef8aed469fe2`) }} target="_blank">
                        <button id="tokenSwap-button3">Charts</button>
                    </Link>
                    <Link to={{ pathname: (`https://www.team.finance/view-coin/0x7CeC018CEEF82339ee583Fd95446334f2685d24f?name=Viral%20Ethereum&symbol=eViral%20%F0%9F%A7%AC`) }} target="_blank">
                        <button id="tokenSwap-button3">Liquidity</button>
                    </Link>
                    <Link to={{ pathname: (`https://bscscan.com/token/0x7cec018ceef82339ee583fd95446334f2685d24f`) }} target="_blank">
                        <button id="tokenSwap-button3">
                            <img id="etherscanlogo" src={BscScan}/>  
                            BscScan                      
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SwapContainer
