import React, { useState, useEffect } from 'react'
import "./postCard.css"
import CommentCard from "./commentCard"
import moment from 'moment'
import Likes from './likes'
function PostCard({ post, walletid, postid, created, media }) {

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
                        <Likes postid={postid} />
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
