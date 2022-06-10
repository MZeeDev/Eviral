import React from 'react';
import './OnRamper.css';


export default function OnRamper() {
    return (
        <div>
            <iframe
                className="onramper-widget"
                defaultcrypto="ETH"
                filters={{
                    onlyCryptos: ["ETH"]
                  }}
                id="onramper-widget"
                title="Onramper widget"
                frameBorder="no"
                allow="accelerometer; autoplay; camera; gyroscope; payment;"                
                src="https://widget.onramper.com?color=266678&apiKey=pk_test_uJQ9wgwePDgiietYBRP6uhVvx_7RJTULFfPUk04BUq40">
                </iframe>
        </div>
    )
}
