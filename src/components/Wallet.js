import React, {useEffect, useState} from 'react';
import { Moralis } from 'moralis';
import ETH from '../img/ethlogo.png'
import BSC from '../img/bsclogo.png'
import MATIC from '../img/maticlogo.png'
import './Wallet.css';
import { useMoralis } from 'react-moralis';
import NFTCard from './NFTCard';

function Wallet() {

    const { isInitialized } = useMoralis();


    const [ currentChain, setCurrentChain] = useState("eth");
    const [ tokens, setTokens] = useState([]);
    const [ nfts, setNFTS] = useState([]);
    const [ transactions, setTransactions] = useState();
    const [ viewTokens, setViewTokens] = useState(true);
    const [ viewNFTs, setViewNFTs] = useState(false);
    const [viewTransactions, setViewTransactions] = useState(false);
    const [ chainLogo, setChainLogo] = useState(ETH);
    const [ theme, setTheme] = useState("choose-chain-wallet-eth");
    let init = 0;

    const getTokens = async() => {
        setViewNFTs(false);
        setViewTransactions(false);
        // setTokens([]);
        const options = { chain: currentChain, order: "asc"}
        const balances = await Moralis.Web3API.account.getTokenBalances(options);
        const list = await
        Promise.all(
            balances.map( async (token) => {
            const options = {
                address: token.token_address,
                chain: currentChain
            }
            let price;
            let priceInfo = {};
            let balance = token.balance;
            let decimals = token.decimals;
            try{
                price = await Moralis.Web3API.token.getTokenPrice(options);
                priceInfo.price = price.usdPrice.toFixed(5);    
                 let usdAmount = ((price.usdPrice)*(balance/(10**decimals)))
                 priceInfo.usdAmount = usdAmount.toFixed(2);                
            } catch (error){
                console.log(error);
            }
            token = {...token, ...priceInfo}
            return token;
            })
        );
            
        console.log(list);
        setTokens(list);
        setViewTokens(true);
    }

    const getNFTs = async() =>{
        setViewTokens(false);
        setViewTransactions(false);
        console.log('pressed nft button');
        setNFTS([]);
        const options = { chain: currentChain}
        const nftList = await Moralis.Web3API.account.getNFTs(options);
        let list = await 
        Promise.all(
            nftList.result.map( async(nft) => {
                console.log(nft);
                let nfts = {};
                let url = fixURL(nft.token_uri);
                fetch(url)
                .then(response => response.json())
                .then(data => {                    
                    nfts.image = data.image;
                    console.log(12321);
                    console.log(data.image);
                });
                nft = {...nft, ...nfts};
                try{
                console.log(nft.token_uri?.get("image"));
                } catch (error){
                    
                }
                return nft;
            })
        );
        
        // for(let i = 0; i < nftList.result.length; ++i) {
        //     let url = fixURL(nftList.result[i].token_uri);
        //     fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
                
        //         nftList.result[i].image = data.image;
        //         console.log(12321);
        //         console.log(data.image);
        //     });
        // }

        // nftList.result.forEach(function(nft) {   
        //     let url = fixURL(nft.token_uri);
        //     fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         nft.image = data.image;
        //         console.log(12321);
        //         console.log(data.image);
        //     });
        //     console.log(nft);
        // })

        function fixURL(url) {
            if(url.startsWith("ipfs")) {
                return "https://ipfs.moralis.io:2053/ipfs/"+url.split("ipfs://ipfs/").slice(-1)
            }else{
                return url
            } 
        }

        console.log(list);
        setNFTS(list);        
        setViewNFTs(true);
    } 
    
    // const getTransactions = async() => {
    //     setViewNFTs(false);
    //     setViewTokens(false);
    //     console.log('pressed transaction button');
    //     setTransactions([]);
    //     const options = { chain: currentChain, order: "desc" };
    //     const transactions = await Moralis.Web3API.account.getTransactions(options);
    //     transactions.results.forEach(function(tx) {

    //     })
    //     setTransactions(transactions.result);
    //     console.log(transactions.result);
    //     setViewTransactions(true);
    // }

    const changeChain = (chain, logo, theme) => {
        setViewTokens(false);
        setViewTransactions(false);
        setViewNFTs(false);
        setCurrentChain(chain);
        setChainLogo(logo);
        setTheme(theme);
    }

    useEffect(() => {
        if(isInitialized){
            
        }  
    }, [ isInitialized])

    useEffect(() => {

    }, [tokens, nfts])

    return (
        <>        
        <div className="wallet-background">
            <div className="choose-chain-wallet-wrapper">
                <div className={`choose-chain-wallet-${theme}`}>                  
                <div className="choose-chain-wallet-choose">                    
                    <div className="choose-chain-wallet-chain" onClick={() => changeChain("eth", ETH, "eth")}>
                        <img src={ETH} />
                    </div>
                    <div className="choose-chain-wallet-chain" onClick={() => changeChain("bsc", BSC, "bsc")}>
                        <img src={BSC} />
                    </div>
                    <div className="choose-chain-wallet-chain" onClick={() => changeChain("matic", MATIC, "matic")}>
                        <img src={MATIC} />
                    </div>
                </div>
                </div>
            </div>
            <div className="choose-display-holding-wrapper">
                <div className={`choose-display-holding-${theme}`}>
                    <button id={`display-holding-option-${theme}`} onClick={getTokens}>TOKENS</button>
                    <button id={`display-holding-option-${theme}`} onClick={getNFTs}>NFTS</button>
                    {/* <button id="display-holding-option" onClick={getTransactions}>HISTORY</button> */}
                </div>
            </div>            
            {viewTokens &&
            <div className="wallet-tokens-wrapper">
                    <div className={`wallet-token-chart-${theme}`}>                        
                        <span id="chart-column-name">Logo</span>
                        <span id="chart-column-name">Name/ Symbol</span>
                        <span id="chart-column-name">Balance</span>
                        <span id="chart-column-name">Price</span>
                        <span id="chart-column-name">Holdings</span>
                    </div>
                <div className={`wallet-tokens-${theme}`}>
                    {tokens.map(token => (
                        <div key={token.token_address} className="wallet-token">
                            <span id="token-detail"><img src={ !token.logo ? chainLogo : token.logo }/></span>
                            <span id="token-detail">{token.name}<br/>({token.symbol})</span>
                            <span id="token-detail">{(token.balance/(10**token.decimals)).toFixed(2)}</span>
                            <span id="token-detail">${token.price}</span>
                            <span id="token-detail">${token.usdAmount}</span>
                            {/* ((token.price)*(token.balance/(10**token.decimals))).toFixed(2) */}
                        </div>
                    ))}
                </div>
            </div>
            }
            {viewNFTs && 
                <div className="wallet-tokens-wrapper ">
                    <div className="wallet-nfts">
                    <div className="nft-grid-container">
                        <div className="nft-grid-wrapper">
                        {nfts.map(nft => (
                            <div key={nft.token_uri} className="nft-card">  
                                <NFTCard
                                src={nft.image}
                                name={nft.name}
                                symbol={nft.symbol}
                                tokenId={nft.token_id}
                                contractType={nft.contract_type}
                                amount={nft.amount}
                                />                              
                                {/* <span id="token-detail"><img src={nft.image} /></span>
                                <span id="token-detail">{nft.name}</span>
                                <span id="token-detail">{nft.symbol}{" "}{nft.token_id}</span>
                                <span id="token-detail">Quantity:{" "}{nft.amount}</span> */}
                            </div>
                        ))}
                    </div>
                    </div>
                    </div>
                </div>
            }
            {viewTransactions && 
                <div className="wallet-tokens-wrapper">
                    <div className="wallet-tokens">
                        {transactions.map(transaction => (
                            <div key={transaction.hash} className="wallet-token">                                
                                <span id="token-detail"><img src={transaction.logo} /></span>
                                <span id="token-detail">{transaction.name}</span>
                                <span id="token-detail">{transaction.symbol}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
        </>
    )
}

export default Wallet;
