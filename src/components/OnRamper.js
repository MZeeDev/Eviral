import React from 'react';
import './OnRamper.css';


export default function OnRamper() {
    return (
        <div>
            <iframe
                className="onramper-widget"
                defaultCrypto="ETH"
                id="onramper-widget"
                title="Onramper widget"
                frameborder="no"
                allow="accelerometer; autoplay; camera; gyroscope; payment;"                
                src="https://widget.onramper.com?color=266678&apiKey=pk_test_uJQ9wgwePDgiietYBRP6uhVvx_7RJTULFfPUk04BUq40">
                </iframe>
        </div>
    )
}
