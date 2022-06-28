import React, { useState, useEffect } from 'react'
import {
    addComments, getPostComments, deleteComment, addReply, getCommentReplies, deleteReply
} from "./../../api/index"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"
import moment from 'moment'
import Reply from './replies'
function CommentCard({ postid, passCommentLengthParent, socket }) {
    // console.log("POSTID", postid)
    // passRepliesLengthParent

    const { user, Moralis, isInitialized } = useMoralis();
    let walletid = user?.attributes?.accounts[0];
    const [comments, setComments] = useState([])
    const [commentsLen, setCommentsLen] = useState(0)
    const [comment, setComment] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [reRender, setReRender] = useState(false)
    const [myPostId, setmyPostId] = useState("")

    useEffect(() => {
        // console.log("myPostId", myPostId)
        // if (myPostId === "") {
        getTheComments()
        // }
        // else {
        //     getTheCommentsByPostId(myPostId)
        // }
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("commented-postid", (data) => {
                // getTheComments()
                getTheCommentsByPostId(data)
                // console.log("DATA", data)
                // getTheCommentsByPostId(data)
                // setmyPostId(setmyPostId)
                // setReRender(!reRender)
                return
            });
        }
    }, [socket]);

    const getTheComments = async () => {
        try {
            let response = await getPostComments(postid)
            console.log("RESPONSE", response)
            if (response.data.success === true) {
                passCommentLengthParent(response.data.comments.length)
                setComments(response.data.comments)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getTheCommentsByPostId = async (postid) => {
        try {
            let response = await getPostComments(postid)
            console.log("RESPONSE", response)
            if (response.data.success === true) {

                // let targetedComments = comments.find(x => x.position === postid)
                setComments(comments => [...comments, response.data.comments]);

                passCommentLengthParent(response.data.comments.length)
                // setComments(response.data.comments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addTheComment = async () => {
        try {
            let response = await addComments(postid, walletid, comment)
            console.log(response)
            toast.success('Comment added...', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            socket.current.emit("add-comment", postid);
            setComment("")
            return
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTheComment = async (commentId) => {
        try {
            let response = await deleteComment(commentId)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("COMMENTS", comments)
    return (

        <div className="comments">

            <div className="d-flex flex-row mb-2">
                {
                    comments.length > 0 ?

                        <div className="d-flex flex-column ml-2">
                            {
                                comments?.map((comment, index) => (
                                    <div className="d-flex flex-column ml-2"> <span className="name">{comment.walletid}</span> <small className="comment-text">{comment.comment}</small>
                                        <div className="d-flex flex-row align-items-center status">
                                            {/* <small>Like</small> */}
                                            <small>Reply</small>
                                            {/* <small>Translate</small> */}
                                            <small>{moment(comment.created).fromNow()}</small>
                                        </div>

                                        <Reply commentId={comment.commentid} socket={socket} />
                                    </div>

                                ))
                            }

                        </div>

                        : null
                }

                {/* <img src="https://i.imgur.com/1YrCKa1.jpg" width={40} className="rounded-image" /> */}


            </div>
            <div className="comment-input"> <input type="text"
                value={comment}
                placeholder="Add comment"
                onChange={(e) => { setComment(e.target.value) }}
                className="form-control" />
                <div onClick={() => { addTheComment() }} className="fonts">
                    <i className="fa fa-rocket" />
                </div>
            </div>
        </div >

    )
}

export default CommentCard
