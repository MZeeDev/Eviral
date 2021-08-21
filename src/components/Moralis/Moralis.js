import React from 'react';
import { useMoralis } from "react-moralis";

function Moralis() {
    const { web3, enableWeb3 } = useMoralis()
    const eViralBalance = Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});

    return (
        <div>
            <div>
                <button onClick={() => enableWeb3()} disabled={isWeb3EnableLoading}>Enable web3</button>
            </div>
            <button>

            </button>
        </div>
    )
}

export default Moralis;
