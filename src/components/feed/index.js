import React, { useState, useEffect, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import { Link, useHistory } from 'react-router-dom';
import Alert from './../Alert';
import { io } from "socket.io-client";
import FeedPost from './FeedPost.js';

import Feed from './feed.js';
function Index() {
    const { user, Moralis, isInitialized } = useMoralis();

    console.log('user', user);
    console.log('user', user?.attributes?.username);
    console.log('userwalletid', user?.attributes?.accounts[0]);

    const socket = useRef();


    // console.log("socket", socket)
    let host = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        if (user) {
            socket.current = io(host);
            // const socket = io(host)
            socket.current.emit("add-user", user?.attributes?.accounts[0]);
        }
    }, [user]);


    return (
        <div>
            <FeedPost socket={socket} />
            <Feed socket={socket} />
        </div>
    );
}

export default Index;
