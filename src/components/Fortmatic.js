// import React from 'react';
// import { useMoralis } from 'react-moralis';
// import { Web3Provider } from 'react-moralis/lib/hooks/useMoralis/_useMoralisWeb3';
// import Fortmatic from 'fortmatic';

// function FortmaticWallet() {

//     const { Moralis } = useMoralis();

//     Moralis.enable = async () => {
//         const web3Provider = new MoralisFortmaticProvider();
//         const web3 = await web3Provider.activate();
//         return web3;
//     }

//     class MoralisFortmaticProvider {

//         fm = new Fortmatic('YOUR_API_KEY');
        
//         async activate() {
    
//             this.provider = await this.torus.init(
//                 {
//                     enableLogging: true,
//                     network: {
//                         host: "<YOUR BINANCE SPEEDY NODE>",
//                         networkName: "Smart Chain - Testnet",
//                         chainId: 97,
//                         blockExplorer: "https://testnet.bscscan.com",
//                         ticker: 'BNB',
//                         tickerName: 'BNB',
//                     },
//                 })
//             await this.torus.login();
            
//             const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
//             this.web3 = new MWeb3(this.torus.provider);
//             this.isActivated = true;
    
//             return this.web3;
//         }
//     }

//     return (
//         <div>
            
//         </div>
//     )
// }

// export default FortmaticWallet;
