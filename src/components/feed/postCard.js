import React, { useState, useEffect } from 'react'
import "./postCard.css"
import CommentCard from "./commentCard"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"
import moment from 'moment'
import { addLike, getUserLikes, getPostLikes, unlike } from "./../../api/index.js"
function PostCard({ post, walletid, postid, created, media, likes }) {
    const { user, Moralis, isInitialized } = useMoralis();
    let userwalletid = user?.attributes?.accounts[0];
    const [amILiked, setamILiked] = useState(false)
    useEffect(async () => {
        let index =
            likes.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
        index === -1 ? setamILiked(false) : setamILiked(true)
    }, [])

    const like = async () => {
        try {
            let response = await addLike(postid, userwalletid)
            console.log(response)
            setamILiked(true)
            toast.success('You liked the post.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } catch (error) {
            console.log(error)
        }
    }

    const getAllPostLikes = async () => {
        try {
            let response = await getPostLikes(postid)
            console.log(response.data.likes)
            // setLikes(response.data.posts)

        } catch (error) {
            console.log(error)
        }
    }

    const disLike = async () => {
        try {
            let index =
                likes.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
            let likeid = likes[index].likeid
            let response = await unlike(likeid)
            setamILiked(false)
            toast.success('You disliked the post.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } catch (error) {
            console.log(error)
        }
    }


    const likeOrDislike = async () => {
        try {
            if (amILiked === true) {
                await disLike()
            }
            else {
                await like()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div key={postid}>
            <div className="card">
                <div className="d-flex justify-content-between p-2 px-3">
                    <div className="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg" width={50} className="rounded-circle" />
                        <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{walletid}</span>
                            {/* <small className="text-primary">Collegues</small> */}
                        </div>
                    </div>
                    <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{moment(created).fromNow()}</small> <i className="fa fa-ellipsis-h" /> </div>
                </div> <img src={`${process.env.REACT_APP_SERVER_URL}/api/file/${media}`} className="img-fluid" />
                <div className="p-2">
                    <p className="text-justify">{post}</p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row icons d-flex align-items-center"> <i

                            onClick={() => { likeOrDislike() }}
                            style={{ color: amILiked === true ? "red" : "grey", cursor: "pointer" }}
                            className="fa fa-heart" />
                            {/* <i style={{ color: "grey" }} className="fa fa-heart-o" aria-hidden="true"></i> */}
                            <b> {likes?.length}</b>{likes?.length === 1 ? "like" : "likes"}
                        </div>
                        <div className="d-flex flex-row muted-color"> <span>2 comments</span> <span className="ml-2">Share</span> </div>
                    </div>
                    <hr />
                    {/* <CommentCard /> */}

                </div>
            </div>
        </div>
    )
}

export default PostCard
