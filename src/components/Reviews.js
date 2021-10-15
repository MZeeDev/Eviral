import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";
import ReviewCard from './ReviewCard';

function Reviews(props) {
    const { Moralis } = useMoralis();
    const title = (props.title);

    const [reviews, setReviews] = useState();
    const [seeReviews, setSeeReviews] = useState(false);

    const loadReviews = async(props) => {
        const params = { projectTitle: title};
        const reviewList = await Moralis.Cloud.run("loadReviews", params);
        console.log(reviewList);
        setReviews(reviewList);
        console.log(reviews);
        setSeeReviews(!seeReviews)        
    }

    return (
        <div>
            <button className="reviews-button btn1" onClick={() => loadReviews()}>Show&nbsp;Reviews</button>
            {seeReviews &&
                <div className="project-page-review-container">
                <h3>Reviews</h3>
                <div className="project-page-reviewList">
                    {reviews.map(review => (            
                        <div key={review.title} className="project-page-review">                            
                            <ReviewCard
                            username={review.username}
                            stars={review.stars}
                            review={review.review}
                            reviewerPic={review.reviewerPic}  
                            createdAt={review.createdAt} 
                            reviewTitle= {review.reviewTitle}                         
                            />                
                        </div>
                    ))}      
                </div>
            </div>
              }
        </div>
    )
}

export default Reviews;
