import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import CommentCard from './commentCard'
import {
    getUserShares, getPostLikes, postsByPostId

    // addShare, getUserShares, getPostShares, undoShare

} from "../../api/index.js"
import { useMoralis } from 'react-moralis';
function MyShares() {
    const { user, Moralis, isInitialized } = useMoralis();
    let walletid = user?.attributes?.accounts[0];
    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(false)

    console.log("WALLLLET ID", walletid)
    useEffect(() => {
        getAllLikes()
    }, [walletid])

    const postByPId = async (postid) => {
        try {
            let response = await postsByPostId(postid)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const getAllLikes = async () => {
        try {
            setIsloading(true)
            let res = await getUserShares(walletid);
            if (res.status === 200) {
                let arr = []
                for (let index = 0; index < res.data.shares.length; index++) {
                    const element = res.data.shares[index];
                    let posts = await postByPId(element.postid)
                    arr.push(
                        ...posts.data.post
                    )
                }
                setPosts(arr)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }

    console.log("POSTS", posts)
    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    {
                        isLoading === true ? <b>Please wait....</b> :
                            posts?.length > 0 ? posts.map((post, index) => {
                                return (<div key={index}>

                                    {/* <PostCard post={post[index].post} walletid={post[index].walletid} postid={post[index].postid}
                                        created={post[index].created}
                                      media={post[index].media}
                                    /> */}
                                    <PostCard post={post.post} walletid={post.walletid} postid={post.postid}
                                        created={post.created}
                                        media={post.media}
                                    />
                                    {/* <CommentCard /> */}
                                </div>
                                )
                            }) : <p>You have not liked any post yet!</p>
                    }

                </div>
            </div>
        </div>

    )
}

export default MyShares
