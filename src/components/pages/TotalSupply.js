import React, { useState, useEffect } from 'react';

function TotalSupply() {
    const [totalSupply, setTotalSupply] = useState();
    const eViralAPIURL = "https://api.etherscan.io/api/?module=stats&action=tokensupply&contractaddress=0x7CeC018CEEF82339ee583Fd95446334f2685d24f&apikey=HNNKFS3GX5T3QY3G1KFB69545EWRQY33ET";
    
    const geteViralTotalSupply = async()=>{   
        
        try{
        await fetch("https://api.etherscan.io/api/?module=stats&action=tokensupply&contractaddress=0x7CeC018CEEF82339ee583Fd95446334f2685d24f&apikey=HNNKFS3GX5T3QY3G1KFB69545EWRQY33ET")
        .then((response) => response.json())
        // .then(data=>{return data.json()["result"]})
        // .then(data=>{setTotalSupply(data.json()["result"])})
        
        .then((json)=> {
            setTotalSupply(json["result"])
            console.log(json)
        })
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        geteViralTotalSupply();
    },[])
    
    return (
        <>        
        {totalSupply}
        </>
    )
}

export default TotalSupply;


