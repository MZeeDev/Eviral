import React, {useState, useEffect} from 'react';
import './ReviewCard.css';

function ReviewCard(props) {

    const stars = (props.stars);


    return (
        
            <div className="review-container"> 
                    <div id="review-title-stars">
                        <h4 id="reviewTitle">{props.reviewTitle}</h4>                            
                        <div id="reviewStars">
                            {[...Array(5)].map( (star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label>
                                        {ratingValue  <= stars ? <i class="fas fa-star gold"></i> : <i class="fas fa-star grey"></i>}
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                    <p id="review-review">{props.review}</p>       
                    <div id="review-reviewer">
                        <img id="review-profilePic" src={props.reviewerPic} />
                        <div id="review-nameanddate">
                            <h5>{props.username}</h5>
                            <p className="review-date"> {props.createdAt}</p>
                        </div>
                    </div>
            </div>            
        
    )
}

export default ReviewCard;
