import React, { useState, useEffect } from 'react'
import "./postCard.css"
import CommentCard from "./commentCard"
import moment from 'moment'
import Likes from './likes'
import Share from './share'
// import Styled from "styled-components";
function PostCard({ post, walletid, postid, created, media }) {

    const [commentsLen, setCommentsLen] = useState(0)
    // console.log(post, walletid, postid, created, media)
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    const commentsLength = (data) => {
        setCommentsLen(data)
    }

    return (
        <div key={postid}>
            <div className="card">
                <div style={{ alignSelf: "end" }} className="d-flex flex-row mt-1 ellipsis"> <small style={{ alignSelf: "end" }} className="mr-2">{moment(created).fromNow()}</small> <i className="fa fa-ellipsis-h" /> </div>
                <div className="d-flex justify-content-between p-2 px-3">
                    <div className="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg" width={50} className="rounded-circle" />
                        <div className="d-flex flex-column ml-2">
                            {matches && (<span className="font-weight-bold"  >
                                {walletid}
                            </span>)}
                            {!matches && (<span
                                style={{ width: "100%", wordBreak: "break-all" }}
                                className="font-weight-bold"  >
                                {walletid}
                            </span>)}
                            {/* <span className="font-weight-bold walletSpan"> */}

                            {/* {walletid} */}

                            {/* </span> */}
                            {/* <small className="text-primary">Collegues</small> */}

                        </div>
                    </div>

                </div>
                {
                    media !== null ? <img src={`${process.env.REACT_APP_SERVER_URL}/api/file/${media}`} className="img-fluid" /> : null
                }

                <div className="p-2">
                    <p className="text-justify">{post}</p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <Likes postid={postid} />
                        <div className="d-flex flex-row muted-color"> <span>{commentsLen} comments</span> <Share postid={postid} /> </div>
                    </div>
                    <hr />
                    <CommentCard
                        passCommentLengthParent={commentsLength}
                        postid={postid} />

                </div>
            </div>
        </div>
    )
}

export default PostCard
