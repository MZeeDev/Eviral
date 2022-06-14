import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import CommentCard from './commentCard'
import { allPosts } from "./../../api/index.js"

function Feed() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(false)
    useEffect(() => {
        getAllPosts()
    }, [])
    const getAllPosts = async () => {
        try {
            setIsloading(true)
            let res = await allPosts();
            if (res.status === 200) {
                setPosts(res.data.posts)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }
    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    {

                        isLoading === true ? <b>Please wait....</b> :
                            posts.length > 0 ? posts.map((post, index) => {
                                return (<div key={index}>

                                    <PostCard post={post.post} walletid={post.walletid} postid={post.postid}
                                        created={post.created}
                                        media={post.media}
                                    />
                                    <CommentCard />
                                </div>
                                )
                            }) : null
                    }

                </div>
            </div>
        </div >

    )
}

export default Feed
