import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";

function Rating() {

    const [rating, setRating] = useState("");
    const [reviewCount, setReviewCount] = useState( 0 );

    const checkRating = async() => {
        // const user = Moralis.User.current();
        // const relation = user.relation("bookmarkedProjects");     
        // const query = relation.query();
        // query.equalTo("title", (props.projectTitle));
        // query.select("attributes.title")
        // const results = await query.find();
        // if(typeof results[0].attributes.title !== 'undefined') {
        //     setBookmark(true);
        // } 
    }

    useEffect(() => {
        checkRating();
        },
        [null],
      );
      
    return (
        <div className="rating">
            <i class="fas fa-star"></i>
            <span className="rating">{rating}</span>
            <span className="review-count">{" "}({reviewCount})</span>
        </div>
    )
}

export default Rating;
