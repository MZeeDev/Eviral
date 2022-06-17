import React, { useState, useEffect } from 'react'
import "./postCard.css"
import CommentCard from "./commentCard"
import moment from 'moment'
import { addLike, getUserLikes, getPostLikes, unlike } from "./../../api/index.js"
function PostCard({ post, walletid, postid, created, media }) {

    const [likes, setLikes] = useState([])
    const [amILiked, setamILiked] = useState(false)


    useEffect(async () => {
        await getAllPostLikes();
    }, [])

    const like = async () => {
        try {
            let response = await addLike(postid, walletid)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllPostLikes = async () => {
        try {
            let response = await getPostLikes(postid)
            console.log(response)
            // setLikes(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    const disLike = async (likeid) => {
        try {
            let response = await unlike(likeid)
            console.log(response)
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
                        <div className="d-flex flex-row icons d-flex align-items-center"> <i className="fa fa-heart" />
                            <i style={{ color: "grey" }} className="fa fa-heart-o" aria-hidden="true"></i>
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
