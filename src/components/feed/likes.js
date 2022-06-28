import React, { useState, useEffect } from 'react'
import { addLike, getUserLikes, getPostLikes, unlike } from "./../../api/index.js"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"

function Likes({ postid }) {


    const [likes, setLikes] = useState(0)

    const [myLikes, setMyLikes] = useState([])


    const { user, Moralis, isInitialized } = useMoralis();
    let userwalletid = user?.attributes?.accounts[0];
    const [amILiked, setamILiked] = useState(false)
    useEffect(async () => {
        let index =
            myLikes.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
        index === -1 ? setamILiked(false) : setamILiked(true)
    }, [myLikes])

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
            getAllPostLikes()
        } catch (error) {
            console.log(error)
        }
    }


    const disLike = async () => {
        try {
            let index =
                myLikes.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
            let likeid = myLikes[index].likeid
            let response = await unlike(likeid)
            setamILiked(false)
            getAllPostLikes()
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

    useEffect(async () => {
        await getAllPostLikes()
    }, [likes])
    const getAllPostLikes = async () => {
        try {
            let response = await getPostLikes(postid)
            console.log(response?.data.likes)
            setMyLikes(response?.data.likes)
            setLikes(response?.data.likes.length)
            // setLikes(response.data.posts)
            return
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="d-flex flex-row icons d-flex align-items-center"> <i

            onClick={() => { likeOrDislike() }}
            style={{ color: amILiked === true ? "red" : "grey", cursor: "pointer" }}
            className="fa fa-heart" />&nbsp;
            {/* <i style={{ color: "grey" }} className="fa fa-heart-o" aria-hidden="true"></i> */}
            <b> {likes}&nbsp;</b>{likes === 1 ? "like" : "likes"}
        </div>
    )
}

export default Likes
