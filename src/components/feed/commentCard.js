import React, { useState, useEffect } from 'react'
import {
    addComments, getPostComments, deleteComment, addReply, getCommentReplies, deleteReply
} from "./../../api/index"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"
import moment from 'moment'
import Reply from './replies'
function CommentCard({ postid, passCommentLengthParent }) {
    // console.log("POSTID", postid)
    // passRepliesLengthParent

    const { user, Moralis, isInitialized } = useMoralis();
    let walletid = user?.attributes?.accounts[0];
    const [comments, setComments] = useState([])
    const [commentsLen, setCommentsLen] = useState(0)
    const [comment, setComment] = useState("")
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        getTheComments()
    }, [])
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

                                        <Reply commentId={comment.commentid} />
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
