import React from 'react';
import { Link } from 'react-router-dom';

function SocialIconBar(props) {
    return (
        <div className='profile-social-icon-wrapper'>
        <Link className='profile-social-icon twitter' to={{ pathname: (`https://twitter.com/${(props.twitter)}`) }} target="_blank" aria-label='Twitter'>
        <i className="fab fa-twitter"></i>
        </Link>
        <Link className='profile-social-icon telegram' to={{ pathname: (`https://t.me/${(props.telegram)}`) }} target="_blank" aria-label='Telegram'>
        <i className="fab fa-telegram"></i>
        </Link>
        <Link className='profile-social-icon discord' to={{ pathname: (`https://discord.gg/${(props.discord)}`) }} target="_blank" aria-label='Discord'>
        <i className="fab fa-discord"></i>
        </Link>
        <Link className='profile-social-icon linkedIn' to={{ pathname: (`https://linkedin.com/in/${(props.linkedIn)}`) }} target="_blank" aria-label='LinkedIn'>
        <i className="fab fa-linkedin"></i>
        </Link>
        <Link className='profile-social-icon youtube' to={{ pathname: (`https://youtube.com/c/${(props.youtube)}`) }} target="_blank" aria-label='Youtube'>
        <i className="fab fa-youtube"></i>
        </Link>
        <Link className='profile-social-icon twitch' to={{ pathname: (`https://twitch.tv/${(props.twitch)}`) }} target="_blank" aria-label='Twitch'>
        <i className="fab fa-twitch"></i>
        </Link>
    </div>
    )
}

export default SocialIconBar;
