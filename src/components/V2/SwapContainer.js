import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './SwapContainer.css';

import AVAX from '../../img/avaxlogo.png';
import BSC from '../../img/bsclogo.png';
import ETH from '../../img/ethlogo.png';
import MATIC from '../../img/maticlogo.png';
import Etherscan from '../../img/etherscan-logo-circle.svg';
import BscScan from '../../img/bscscan-logo-circle.svg';
import EViral from '../../img/vceth.png';
import BeViral from '../../img/vcbsc.png';

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
                    <Link to={{ pathname: (`https://app.uniswap.org/#/swap?use=V2&chain=mainnet&outputCurrency=0x77a2F05cb71e2DA093764DC83D7a59C1Fe09f43A`) }} target="_blank">
                        <button id="tokenSwap-button2">Uniswap</button>
                    </Link>
                    <Link to={{ pathname: (`https://www.dextools.io/app/ether/pair-explorer/0x2b31bf290c7d8138ab10842fc4e85e2d2dc18654`) }} target="_blank">
                        <button id="tokenSwap-button2">Charts</button>
                    </Link>
                    <Link to={{ pathname: (`https://etherscan.io/address/0x77a2f05cb71e2da093764dc83d7a59c1fe09f43a`) }} target="_blank">
                        <button id="tokenSwap-button2">
                            <img id="etherscanlogo" src={Etherscan}/>  
                            Etherscan                      
                        </button>
                    </Link>
                </div>                
            </div>
        </div>
    )
}

export default SwapContainer
