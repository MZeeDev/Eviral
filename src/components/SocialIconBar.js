import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";

function SocialIconBar(props) {
    const { isInitialized } = useMoralis();  

    const [ twitterActive, setTwitterActive] = useState(true);
    const [ youtubeActive, setYoutubeActive] = useState(true);
    const [ telegramActive, setTelegramActive] = useState(true);
    const [ discordActive, setDiscordActive] = useState(true);
    const [ linkedInActive, setLinkedInActive] = useState(true);
    const [ twitchActive, setTwitchActive] = useState(true);

    // useEffect(() => {
    //     if(typeof props.twitter === 'undefined'){
    //         setTwitterActive(false);
    //     }
    //     if(typeof props.telegram === 'undefined'){
    //         setTelegramActive(false);
    //     }
    //     if(typeof props.discord === 'undefined'){
    //         setDiscordActive(false);
    //     }
    //     if( typeof props.linkedIn === 'undefined'){
    //         setLinkedInActive(false);
    //     }
    //     if(typeof props.twitch === 'undefined'){
    //         setTwitchActive(false);
    //     }
    //     if(typeof props.youtube === 'undefined'){
    //         setYoutubeActive(false);
    //     }        
    // }, [])


    return (
        <div className='profile-social-icon-wrapper'>
        { twitterActive &&
            <Link className='profile-social-icon twitter' to={{ pathname: (`https://twitter.com/${(props.twitter)}`) }} target="_blank" aria-label='Twitter'>
                <i className="fab fa-twitter"></i>
            </Link>
        }
        { telegramActive &&
            <Link className='profile-social-icon telegram' to={{ pathname: (`https://t.me/${(props.telegram)}`) }} target="_blank" aria-label='Telegram'>
                <i className="fab fa-telegram"></i>
            </Link>
        }
        { discordActive &&
            <Link className='profile-social-icon discord' to={{ pathname: (`https://discord.gg/${(props.discord)}`) }} target="_blank" aria-label='Discord'>
                <i className="fab fa-discord"></i>
            </Link>
        }
        { linkedInActive &&
            <Link className='profile-social-icon linkedIn' to={{ pathname: (`https://linkedin.com/in/${(props.linkedIn)}`) }} target="_blank" aria-label='LinkedIn'>
                <i className="fab fa-linkedin"></i>
            </Link>
        }
        { youtubeActive &&
            <Link className='profile-social-icon youtube' to={{ pathname: (`https://youtube.com/c/${(props.youtube)}`) }} target="_blank" aria-label='Youtube'>
                <i className="fab fa-youtube"></i>
            </Link>
        }
        { twitchActive &&
            <Link className='profile-social-icon twitch' to={{ pathname: (`https://twitch.tv/${(props.twitch)}`) }} target="_blank" aria-label='Twitch'>
                <i className="fab fa-twitch"></i>
            </Link>
        }
    </div>
    )
}

export default SocialIconBar;
