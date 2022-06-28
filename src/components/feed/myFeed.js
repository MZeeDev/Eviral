import React, { useState, useEffect, useRef } from 'react'
import { useMoralis } from 'react-moralis';
import PostCard from './postCard'
import { postsByWallet } from "./../../api/index.js"
import { io } from "socket.io-client";
function MyFeed() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const { user, Moralis, isInitialized } = useMoralis();


    const socket = useRef();
    let host = process.env.REACT_APP_SERVER_URL;
    socket.current = io(host);

    useEffect(async () => {
        await getAllPosts()
    }, [user])
    const getAllPosts = async () => {
        try {
            setIsloading(true)
            setTimeout(() => {

            }, 3000);
            let res = await postsByWallet(user?.attributes?.accounts[0]);
            if (res.status === 200) {
                setPosts(res.data.posts)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }


    console.log("MY", posts)
    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    {
                        isLoading === true ? <b>Please wait...</b> :
                            posts?.length > 0 ? posts.map((post, index) => {
                                return (<div key={index}>

                                    <PostCard post={post.post} walletid={post.walletid} postid={post.postid}
                                        created={post.created}
                                        media={post.media}
                                        socket={socket}
                                    />
                                </div>
                                )
                            }) : <p>Not Found</p>
                    }

                </div>
            </div>
        </div >

    )
}

export default MyFeed
