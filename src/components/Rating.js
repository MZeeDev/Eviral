import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";

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
        <div className="rating">
            {[...Array(1)].map( star => {
                return <i class="fas fa-star"></i>
            })}
            <span className="rating">{rating}</span>
            <span className="review-count">{" "}({reviewCount})</span>
        </div>
    )
}

export default Rating;
