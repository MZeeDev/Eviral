import React, {useEffect, useState} from 'react';
//import { Moralis } from 'moralis';
import ETH from '../img/ethlogo.png';
import BSC from '../img/bsclogo.png';
import MATIC from '../img/maticlogo.png';
import AVAX from '../img/avaxlogo.png';
import './Wallet.css';
import { useMoralis } from 'react-moralis';
import './TokenSwap.css';
import LogoETH from '../img/newlogo2.png';
import LogoBSC from '../img/newlogoBSC2.png';
import LogoAVAX from '../img/newlogoAVAX.png';
import LogoMATIC from '../img/newlogoMATIC.png';


function TokenSwap() {

    const { user, isInitialized, Moralis } = useMoralis();

    const [ theme, setTheme] = useState("ETH");
    const [ currentChain, setCurrentChain] = useState("eth");    
    const [ chainLogo, setChainLogo] = useState(ETH);
    const [ nativeAmount, setNativeAmount] = useState(0);
    const [ viralTokenAmount, setViralTokenAmount] = useState(0);
    const [ nativeBalance, setNativeBalance ] = useState(0);
    const [ viralBalance, setViralBalance] = useState(0);
    const [tokens, setTokens] = useState([]);

    const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const VIRAL_ADDRESS = "0x33a6b5AC6dF354b98189B5BeF7D57653fB7e265B";

    const changeChain = (chain, logo, theme) => {
        setNativeAmount(0);
        setViralTokenAmount(0);
        setViralBalance(0);
        if(chain == "bsc") {
            switchNetworkBSC();
        } else if(chain == "eth") {
            try{
            switchNetworkETH();
            } catch {
                alert("You have to switch networks to swap.")
            }
        }else if(chain == "matic") {
            switchNetworkMATIC();
        }else if(chain == "avalanche") {
            switchNetworkAVAX();
        }        
        setCurrentChain(chain);
        setChainLogo(logo);
        setTheme(theme);
        renderBalance(chain);
    }

    // const chainId = async() => {
    //     const web3 = await Moralis.Web3.enable();
    //     const chainIdHex = web3.currentProvider.chainId;
    //     const chainIdDec = await web3.eth.getChainId();
    //     console.log(chainIdHex);
    //     console.log(chainIdDec);
    // }

    const renderBalance = async (chain) => {
        try{
        const options = { chain: chain}
        const chainBalance = await Moralis.Web3API.account.getNativeBalance(options);
        let viralBalance;
        try{
            viralBalance = await Moralis.Web3.getERC20({chain:currentChain, tokenAddress: '0x33a6b5AC6dF354b98189B5BeF7D57653fB7e265B'});
            console.log(viralBalance);
        } catch (error) {
            viralBalance = 0;
        }
        const nativeBalance = (chainBalance.balance/(10**18)).toFixed(3);
        const viralTokenBalance = (viralBalance.balance/(10**9)).toFixed(0);
        setNativeBalance(nativeBalance);
        setViralBalance(viralTokenBalance);
        } catch {
            setViralBalance(0);
        }
    }

     const getQuote = async() => {
        const number = Number(Moralis.Units.ETH(nativeAmount));
        const quote = await Moralis.Plugins.oneInch.quote({
          chain: currentChain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: NATIVE_ADDRESS, // The token you want to swap
          toTokenAddress: VIRAL_ADDRESS, // The token you want to receive
          amount: number,
        });
        setViralTokenAmount(((quote.toTokenAmount)/(10**9)).toFixed(0));
    }

     const swap = async() => {
        await Moralis.Web3.enable();
        await Moralis.initPlugins();
        const userAddress = user.get('ethAddress');
        await checkAllowance(userAddress);
        // await approve(userAddress);
        const number = Number(Moralis.Units.ETH(nativeAmount));
        const receipt = await Moralis.Plugins.oneInch.swap({
          chain: currentChain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // The token you want to swap
          toTokenAddress: "0x33a6b5AC6dF354b98189B5BeF7D57653fB7e265B", // The token you want to receive
          amount: number,
          fromAddress: userAddress, // Your wallet address
          protocols: "uniswapv2",
          slippage: 33
        });
        console.log("below id receipt");
        console.log(receipt);
      }

      const getSupportedTokens = async() => {
        const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
          chain: currentChain, // The blockchain you want to use (eth/bsc/polygon)
        });
        console.log(tokens.tokens);
        setTokens(tokens.tokens);
      }

       const approve = async(userAddress) => {
        await Moralis.Plugins.oneInch.approve({
          chain: currentChain, // The blockchain you want to use (eth/bsc/polygon)
          tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // The token you want to swap
          fromAddress: userAddress, // Your wallet address
          infinity: true,
          protocols: "uniswapv2"
        });
      }

    const hasAllowance = async(userAddress) => {
        const number = Number(Moralis.Units.ETH(nativeAmount));
        const allowance = await Moralis.Plugins.oneInch.hasAllowance({
            chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // The token you want to swap
            fromAddress: userAddress, // Your wallet address            
            amount: number,
        });
        console.log(allowance);
        console.log(`The user has enough allowance: ${allowance}`);
    }
    const checkAllowance = async(userAddress) => {
        const options = {
            owner_address: userAddress,
            spender_address: "0x11111112542D85B3EF69AE05771c2dCCff4fAa26",
            address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            // chain: currentChain
          };
          let allowance;
          try{
             allowance = await Moralis.Web3API.token.getTokenAllowance(options);
          } catch(error){
              console.log(error)
          }
        console.log(allowance);
        console.log(`The user has enough allowance: ${allowance}`);
    }

    const init = async() => {        
        const web3 = await Moralis.Web3.enable();
        await Moralis.initPlugins();
        const plugins = Moralis.Plugins;
        console.log(plugins);
    }

    const switchNetworkETH = async () => {
        const web3 = await Moralis.Web3.enable();
        try {
            await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
            });
        } catch (error) {
            if (error.code === 4902) {
            try {
                await web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                    chainId: "0x1",
                    chainName: "Ethereum Mainnet",
                    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://etherscan.io"],
                    },
                ],
                });
            } catch (error) {
                alert(error.message);
                
            } 
            }
            alert("You have to switch networks to swap.")
        }
    }

    const switchNetworkBSC = async () => {
        const web3 = await Moralis.Web3.enable();
        try {
            await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
            });
        } catch (error) {
            if (error.code === 4902) {
            try {
                await web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://bscscan.com/"],
                    },
                ],
                });
            } catch (error) {
                alert(error.message);
            }
            }
            alert("You have to switch networks to swap.")
        }
    }

    const switchNetworkMATIC = async () => {
        const web3 = await Moralis.Web3.enable();
        try {
            await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }],
            });
        } catch (error) {
            if (error.code === 4902) {
            try {
                await web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                    chainId: "0x89",
                    chainName: "Polygon (MATIC) Mainnet",
                    rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
                    nativeCurrency: {
                        name: "Matic",
                        symbol: "Matic",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://explorer.matic.network/"],
                    },
                ],
                });
            } catch (error) {
                alert(error.message);
            }
            }
            alert("You have to switch networks to swap.")
        }
    }

    const switchNetworkAVAX = async () => {
        const web3 = await Moralis.Web3.enable();
        try {
            await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xa86a" }],
            });
        } catch (error) {
            if (error.code === 4902) {
            try {
                await web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                    chainId: "0xa86a",
                    chainName: "Avalance Mainnet",
                    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                    nativeCurrency: {
                        name: "AVAX",
                        symbol: "AVAX",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
                    },
                ],
                });
            } catch (error) {
                alert(error.message);
            }
            }
            alert("You have to switch networks to swap.")
        }
    }
    
    useEffect(() => {
        if(isInitialized) {
            init();
            renderBalance(currentChain);
            getSupportedTokens(currentChain);
        }
    }, [isInitialized] )
    


    useEffect(() => {
        if(isInitialized) {
            if(nativeAmount > 0){
            getQuote();
            }
        }
    }, [nativeAmount] )

    return (
        <div id="swap-container">
            <div id="swap-wrapper">
                <div className="choose-chain-wallet-wrapper">
                    <div className={`choose-chain-wallet-${theme}`}>                  
                        <div className="choose-chain-wallet-choose">                    
                            <div className="choose-chain-wallet-chain" onClick={() => changeChain("eth", ETH, "ETH")}>
                                <img src={ETH} />
                            </div>
                            <div className="choose-chain-wallet-chain" onClick={() => changeChain("bsc", BSC, "BSC")}>
                                <img src={BSC} />
                            </div>
                            <div className="choose-chain-wallet-chain" onClick={() => changeChain("matic", MATIC, "MATIC")}>
                                <img src={MATIC} />
                            </div>
                            <div className="choose-chain-wallet-chain" onClick={() => changeChain("avalanche", AVAX, "AVAX")}>
                                <img src={AVAX} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swap-display-holding-wrapper">
                    <div className={`swap-display-holding-${theme}`}>
                        <div id="swap-inputs">
                            <label id={`swap-holding-option-${theme}`} >
                            {nativeBalance}&nbsp;
                                <img id="swaplogoimg" src={ETH} style={ chainLogo != ETH ? {display: "none"} : {} } />                                     
                                <img id="swaplogoimg" src={BSC} style={ chainLogo != BSC ? {display: "none"} : {} } />    
                                <img id="swaplogoimg" src={AVAX} style={ chainLogo != AVAX ? {display: "none"} : {} } />    
                                <img id="swaplogoimg" src={MATIC} style={ chainLogo != MATIC ? {display: "none"} : {} } />    
                            </label>
                            <input id="input-swap-amount" type="number" value={nativeAmount} placeholder="0" onChange={(event) =>setNativeAmount(event.currentTarget.value)}/>
                        </div>
                        <div id="swap-inputs">
                            <label id={`swap-holding-option-${theme}`} >
                            <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                <option selected>Open this select menu</option>
                                {/* 
                                 */}
                            </select>
                                {viralBalance}&nbsp;
                                <img id="swaptokenimg" src={LogoETH} style={ chainLogo != ETH ? {display: "none"} : {} } />                                     
                                <img id="swaptokenimg"src={LogoBSC} style={ chainLogo != BSC ? {display: "none"} : {} } />    
                                <img id="swaptokenimg"src={LogoAVAX} style={ chainLogo != AVAX ? {display: "none"} : {} } />    
                                <img id="swaptokenimg"src={LogoMATIC} style={ chainLogo != MATIC ? {display: "none"} : {} } />    
                            </label>
                            <input id="input-swap-amount" type="number" value={viralTokenAmount} placeholder="0" onChange={ (e) => setViralTokenAmount(e.currentTarget.value)}/>
                        </div>
                        <div id="swap-inputs">
                            <button id={`swap-button-${theme}`} onClick={() => swap()}>Approve</button>                        
                            <button id={`swap-button-${theme}`} onClick={() => swap()}>Swap</button>                        
                        </div>
                    </div>
                </div>  
            </div>
            
        </div>
    )
}

export default TokenSwap
