import React, {useState} from 'react';
import { useMoralis, user } from "react-moralis"; 

export const Balance = () => {
    const { isInitialized, Moralis } = useMoralis ();
    const [balance, setBalance] = useState(1);

    if(isInitialized){}
    setBalance(Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'}));
    // const balance = _eViralBalance.balance/(10**18);
    // const balance = (eBalance.toFixed(3) + " Bil " + " ");
    return (        
            { balance }        
    )
}

export default Balance;
