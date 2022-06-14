import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Link, useHistory } from 'react-router-dom';
import Alert from './../Alert';

import FeedPost from './FeedPost.js';

import Feed from './feed.js';
function Index() {
    const { user, Moralis, isInitialized } = useMoralis();

    console.log('user', user);
    console.log('user', user?.attributes?.username);
    console.log('userwalletid', user?.attributes?.accounts[0]);

    return (
        <div>
            <FeedPost />
            <Feed />
        </div>
    );
}

export default Index;
