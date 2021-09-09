import React from 'react'
import './ReviewCard.css';

function ReviewCard(props) {
    return (
        
            <div className="review-container"> 
                    <div className="review-profile">
                        <img className="creator-profile-pic" src={props.reviewerPic} />
                        {props.username}
                    </div>
                    <div className="review-title">
                        {[...Array(props.stars)].map( star => {
                            return <i class="fas fa-star"></i>
                        })}
                        {props.reviewTitle}
                    </div>
                    <div className="review-date">Reviewed on {props.createdAt}</div>
                    <div className="review-review">{props.review}</div>       
            </div>            
        
    )
}

export default ReviewCard;
