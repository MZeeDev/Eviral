import React, { useState, useEffect } from 'react'
import {
    addReplies, getPostReplies, deleteComment, addReply, getCommentReplies, deleteReply
} from "./../../api/index"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"
import "./replies.css"
import moment from 'moment'
function Replies({ commentId, passRepliesLengthParent, socket }) {
    console.log("commentId", commentId)

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    const { user, Moralis, isInitialized } = useMoralis();
    let walletid = user?.attributes?.accounts[0];
    const [replies, setReplies] = useState([])
    const [reply, setReply] = useState("")
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        getTheReplies()
    }, [])



    useEffect(() => {
        if (socket.current) {
            socket.current.on("replied-commentid", (data) => {
                // getTheComments()
                getTheReplies()
                // console.log("DATA", data)
                // getTheCommentsByPostId(data)
                // setmyPostId(setmyPostId)
                // setReRender(!reRender)
                return
            });
        }
    }, [socket]);

    const getTheReplies = async () => {
        try {
            let response = await getCommentReplies(commentId)
            console.log("RESPONSE", response)
            if (response.data.success === true) {
                // passRepliesLengthParent(response.data.replies.length)
                setReplies(response.data.replies)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addTheReply = async () => {
        try {
            let response = await addReply(commentId, walletid, reply)
            console.log(response)
            toast.success('Reply added...', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            socket.current.emit("add-reply", commentId);
            setReply("")
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

        <div style={{

            marginLeft: "2%"

        }} className="comments myContainer">
            {/* <div style={{ display: "flex" }} className="vertical-line">&nbsp;</div> */}
            <div
            // className="d-flex flex-row mb-2"
            >
                {
                    replies.length > 0 ? replies?.map((comment, index) => (
                        <div
                            key={index}
                            style={{
                                display:
                                    'contents'
                            }}
                        // className="d-flex flex-column ml-2"
                        >
                            {matches && (<span
                                className="name">{comment.walletid}</span>)}
                            {!matches && (<span

                                style={{

                                    wordBreak: "break-all",
                                    width: "100%"

                                }}
                                className="name">{comment.walletid}</span>)}
                            <small

                                style={{ display: "flex" }}
                                className="comment-text">{comment.reply}</small>
                            <div

                                className="d-flex flex-row align-items-center status"
                            >
                                <small style={{ display: comment.walletid === walletid ? "default" : "none", cursor: "pointer" }}>Delete</small>
                                {/* <small>Reply</small> */}
                                {/* <small>Translate</small> */}
                                <small>{moment(comment.created).fromNow()}</small>
                            </div>
                        </div>
                    )) : null
                }
                {/* <img src="https://i.imgur.com/1YrCKa1.jpg" width={40} className="rounded-image" /> */}
            </div>
            <div className="comment-input"> <input type="text"
                value={reply}
                placeholder="Add reply"
                onChange={(e) => { setReply(e.target.value) }}
                className="form-control" />
                <div onClick={() => { addTheReply() }} className="fonts">
                    <i className="fa fa-rocket" />
                </div>
            </div>
        </div >

    )
}

export default Replies
