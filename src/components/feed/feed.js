import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import CommentCard from './commentCard'
import { allPosts } from "./../../api/index.js"
import { addLike, getUserLikes, getPostLikes, unlike } from "./../../api/index.js"
import { useMoralis } from 'react-moralis';
function Feed({ socket }) {
    const { user, Moralis, isInitialized } = useMoralis();

    console.log('user', user);
    console.log('user', user?.attributes?.username);
    console.log('userwalletid', user?.attributes?.accounts[0]);
    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(false)
    useEffect(() => {
        getAllPosts()
    }, [])


    useEffect(() => {
        if (socket.current) {
            socket.current.on("post", (data) => {
                console.log("POST DATA", data)
                setPosts(posts => [data, ...posts]);
                return
            });
        }
    }, [socket]);

    console.log("POSTS", posts)
    const getAllPosts = async () => {
        try {
            setIsloading(true)
            let res = await allPosts();
            if (res.status === 200) {
                let arr = []
                // for (let index = 0; index < res.data.posts?.length; index++) {
                //     const element = res.data.posts[index];
                //     console.log(element.postid)
                //     let likes = await getAllPostLikes(element.postid)
                //     arr.push({
                //         ...res.data.posts[index],
                //         likes: likes
                //     })
                // }
                setPosts(res.data.posts)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }

    const [likes, setLikes] = useState([])
    const [amILiked, setamILiked] = useState(false)

    // useEffect(async () => {
    //     await getAllPostLikes();
    // }, [])

    // const like = async () => {
    //     try {
    //         let response = await addLike(postid, walletid)
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getAllPostLikes = async (postid) => {
    //     try {
    //         let response = await getPostLikes(postid)
    //         console.log(response?.data.likes)
    //         return response?.data.likes
    //         // setLikes(response.data.posts)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const disLike = async (likeid) => {
    //     try {
    //         let response = await unlike(likeid)
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // console.log("POSTS", posts)

    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    {
                        isLoading === true ? <b>Please wait....</b> :
                            posts?.length > 0 ? posts.filter((value, index, self) => self.map(x => x.postid).indexOf(value.postid) == index).map((post, index) => {
                                return (<div key={index}>


                                    <PostCard post={post.post} walletid={post.walletid} postid={post.postid}
                                        created={post.created}
                                        media={post.media}
                                        socket={socket}

                                    />

                                </div>
                                )
                            }) : <p>No Posts were found!!!</p>
                    }

                </div>
            </div>
        </div >

    )
}

export default Feed
