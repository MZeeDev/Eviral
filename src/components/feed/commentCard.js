import React, { useState, useEffect } from 'react'
import {
    addComments, getPostComments, deleteComment, addReply, getCommentReplies, deleteReply
} from "./../../api/index"
function CommentCard({ postid }) {
    console.log("POSTID", postid)
    return (

        <div className="comments">

            <div className="d-flex flex-row mb-2"> <img src="https://i.imgur.com/1YrCKa1.jpg" width={40} className="rounded-image" />
                <div className="d-flex flex-column ml-2"> <span className="name">Elizabeth goodmen</span> <small className="comment-text">Thanks for sharing!</small>
                    <div className="d-flex flex-row align-items-center status">
                        {/* <small>Like</small> */}
                        <small>Reply</small>
                        {/* <small>Translate</small> */}
                        <small>8 mins</small>
                    </div>
                    <div>
                        <div className="d-flex flex-column ml-2"> <span className="name">Elizabeth goodmen</span> <small className="comment-text">Thanks for sharing!</small>
                            <div className="d-flex flex-row align-items-center status">
                                <small>8 mins</small>
                            </div>

                        </div>
                        <div className="comment-input"> <input type="text" className="form-control" />
                            <div className="fonts">
                                {/* <i className="fa fa-camera" />  */}
                            </div>
                        </div>
                        {/* /// */}
                    </div>

                </div>

            </div>
            <div className="comment-input"> <input type="text" className="form-control" />
                <div className="fonts">
                    {/* <i className="fa fa-camera" />  */}
                </div>
            </div>
        </div>

    )
}

export default CommentCard
