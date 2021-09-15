// import React from 'react';
// import { useMoralis } from 'react-moralis';
// // import { Web3Provider } from 'react-moralis/lib/hooks/useMoralis/_useMoralisWeb3';
// import Web3 from 'web3';
// import Fortmatic from 'fortmatic';
// import { Moralis } from 'moralis';

// function FortmaticWallet() {
    
//     Moralis.initPlugins();   
//     const enabler = () => {
//         Moralis.enable = async () => {
//             // const web3Provider = new MoralisFortmaticProvider();        
//             const web3 = new Web3(fm.getProvider());
//             return web3;
//         }}
        
//         const fm = new Fortmatic('pk_live_CAC6E97548234051');
//         // class MoralisFortmaticProvider {

        
//     //     async activate() {
    
//     //         this.provider = await this.fm.init(
//     //             {
//     //                 network: {
//     //                     host: "<YOUR BINANCE SPEEDY NODE>",
//     //                     networkName: "Smart Chain - Testnet",
//     //                     chainId: 97,
//     //                     blockExplorer: "https://testnet.bscscan.com",
//     //                     ticker: 'BNB',
//     //                     tickerName: 'BNB',
//     //                 },
//     //             })
//     //         await this.torus.login();
            
//     //         const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
//     //         this.web3 = new MWeb3(this.fm.provider);
//     //         this.isActivated = true;
    
//     //         return this.web3;
//     //     }
//     // }

//     return (
//         <div>
//             <button onClick={enabler}>Fortmatic</button>
//         </div>
//     )
// }

// export default FortmaticWallet;
