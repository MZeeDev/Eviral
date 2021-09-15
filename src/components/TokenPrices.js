import React, {useState, useEffect} from 'react';
import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function TokenPrices() {

    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const [eViralPrice, setEViralPrice] = useState(0);
    const [beViralPrice, setBEViralPrice] = useState(0);
    const init = 0;

    // const getEViralQuote = async() => {       
    //     const options = {
    //         address: "0x7cec018ceef82339ee583fd95446334f2685d24f",
    //         chain: "Eth",
    //         exchange: "uniswap-v2"
    //     };
    //     const price = await Moralis.Web3API.token.getTokenPrice(options);
    //     setEViralPrice(price);
    // }

    const getBEViralQuote = async() => {
        
        const options = {
            address: "0x7cec018ceef82339ee583fd95446334f2685d24f",
            chain: "bsc",
            exchange: "pancakeswap-v2"
        };
        const price = await Web3Api.token.getTokenPrice(options);
        console.log(price);
        setBEViralPrice(price);
    }

    useEffect(() => {
        // getEViralQuote();
        getBEViralQuote();
        }, [init])

    const getQuotes = async() => {
        // await getEViralQuote();
        await getBEViralQuote();
    }


    return (
        <div>
            <div className="tokenPrices">
                <div className="tokenPrices-wrapper">
                    <div className="eViral-price">
                        <img className="eViralLogo" src={eViralLogo}/>{eViralPrice}
                        <button onClick={getQuotes}>Quotes</button>
                    </div>
                    <div className="beViral-price">
                        <img className="eViralLogo" src={beViralLogo}/>{beViralPrice}
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default TokenPrices
