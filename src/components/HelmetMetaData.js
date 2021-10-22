import React from "react";
import { Helmet } from "react-helmet";
import ShareBanner from '../img/shareBanner.png'

function HelmetMetaData(props) {
    let image = props.image !== undefined ? props.image : ShareBanner;
    let currentUrl = "`https://viralcrypto.app" + (props.path !== undefined ? props.path : "/");
    let title = props.title !== undefined ? props.title : "Viral Crypto";
    let description = props.description !== undefined ? props.description : "Connecting Innovators and Influencers in DeFi";

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta charset="utf-8" />
                <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={description}/>
                <meta property="og:url" content={currentUrl} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content={props.twitter} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:image" content={image} />
            </Helmet>
        </div>
    )
}

export default HelmetMetaData
