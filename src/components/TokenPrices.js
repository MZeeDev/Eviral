import React, {useState, useEffect} from 'react';
import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import { useMoralis } from "react-moralis";

function TokenPrices() {

    const { Moralis } = useMoralis();

    const [eViralPrice, setEViralPrice] = useState(0);
    const [beViralPrice, setBEViralPrice] = useState(0);
    const init = 0;

    const getEViralQuote = async() => {
        const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0x7cec018ceef82339ee583fd95446334f2685d24f', // The token you want to swap
        toTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // The token you want to receive
        amount: 1,
        });
        setEViralPrice(quote);
    }

    const getBEViralQuote = async() => {
        const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: '0x7cec018ceef82339ee583fd95446334f2685d24f', // The token you want to swap
        toTokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // The token you want to receive
        amount: 1,
        });
        setBEViralPrice(quote);
    }

    useEffect(() => {
        try{
            (async function(){
                Moralis.initPlugins();
            })();
            console.log("success");
        } catch (error) {
            alert(error)
        }
        }, [init])

    const getQuotes = async() => {
        await getEViralQuote();
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
