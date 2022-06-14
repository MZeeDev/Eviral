import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";
import './Rating.css';

function Rating(props) {
    const { user, Moralis, isInitialized } = useMoralis();
    const title = (props.title);


    const [rating, setRating] = useState(0);
    const [reviewCount, setReviewCount] = useState( 0 );

    const checkRating = async(props) => {
        const params = { projectTitle: title};
        const projectRating = await Moralis.Cloud.run("loadProjectRating", params);
        if (typeof projectRating !== 'undefined') {
            setReviewCount(projectRating[0]);
            setRating(projectRating[1]);    
        }
     }

    useEffect(() => {
        if(isInitialized){
        checkRating();
        }
        },
        [isInitialized],
      );
      
    return (
        <div className="rating" >
            <div id="ratingStars">
            {[...Array(1)].map( (star,index) => {
                return <i key={index} class="fas fa-star"></i>
            })}
            </div>
            <span id="rating">{rating}</span>
            <span id="review-count">{" "}({reviewCount} Reviews)</span>
        </div>
    )
}

export default Rating;
