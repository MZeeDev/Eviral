import React, {useState, useEffect} from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { Link } from 'react-router-dom';
import Alert from './Alert';
import './RatingProject.css'

function RatingProject(props) {
    const { user, Moralis } = useMoralis();

    const [review, setReview] = useState();
    const [stars, setStars] = useState(0);
    const [reviewTitle, setReviewTitle] = useState();
    const [ prevTitle, setPrevTitle] = useState("Review Title");
    
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContents, setAlertContents] = useState();
    const init=0;

    const [hasReview, setHasReview] = useState(false);

    const loadUserRating = async() => {
        const params = { projectTitle: (props.projectName) }; 
        const currentProject = await Moralis.Cloud.run("getProjectByName", params);
        const projectRelation = currentProject.relation("reviews")
        const query = projectRelation.query();
        query.equalTo('username', user.attributes?.username)
        const queryResults = await query.find();
        console.log(queryResults[0]);
        if(queryResults.length > 0) {
            console.log(queryResults[0].attributes.review);
            console.log(queryResults[0].id);
            const stars = queryResults[0].attributes.stars;
            const reviewText = queryResults[0].attributes.review;
            const title = queryResults[0].attributes.reviewTitle;
            setReview(reviewText);
            setStars(stars);
            setPrevTitle(title);
            setHasReview(true);
            console.log(hasReview);
        } else {
            setAlertContents(
                <>
                <div className="alert-popup-contents">
                No review found.
                </div>
                </>
                );
            setAlertVisible(true);
        }
    }
    
    const postProjectRating = async() => {    
        const canPost = await userCheck();
        if (canPost) {
            if(stars < 1) {
                throw alert('Please choose a star.');
            }
            if (typeof review === 'undefined') {
                throw alert('Please leave a review.');
            }
            if(hasReview){
                const params = { projectTitle: (props.projectName) }; 
                const currentProject = await Moralis.Cloud.run("getProjectByName", params);
                const projectRelation = currentProject.relation("reviews")
                const query = projectRelation.query();
                query.equalTo('username', user.attributes?.username)
                const queryResults = await query.find();
                const userReview = queryResults[0];
                userReview.set("stars", stars);
                userReview.set('review', review);
                userReview.set('reviewTitle', reviewTitle);
                await userReview.save();
                alert("Review updated!")
            }  else {
                const userReview = Moralis.Object.extend("Reviews");
                const newReview = new userReview();
                const currentUser = await Moralis.User.current();
                const username = currentUser.attributes.username;
                const profilePic = currentUser.attributes.profilePic._url;
                const params = { projectTitle: (props.projectName) };
                const currentProject = await Moralis.Cloud.run("getProjectByName", params);
                newReview.set("stars", stars);
                newReview.set("review", review);
                newReview.set('reviewer', currentUser);
                newReview.set("username", username);
                newReview.set('reviewerPic', profilePic);
                newReview.set('project', currentProject);     
                newReview.set('reviewTitle', reviewTitle);       
                await newReview.save();
                const relation = currentUser.relation("reviews");
                relation.add(newReview);
                user.save();
                const projectRelation = currentProject.relation("reviews")
                projectRelation.add(newReview);
                currentProject.save();
                alert("Thank you for your review!")
            }
        }
    }

    const userCheck = async() => {
        console.log(user);
        const eViral = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const beViral = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const balanceETH = eViral.balance;
        const balanceBSC = beViral.balance;
        if( (balanceETH == 0) && (balanceBSC == 0) ) {
          setAlertContents(
              <>
              <div className="alert-popup-contents">
              You'll need to own either eViral or beViral to access this feature.
              <Link to='/'><button className="btn2">Buy from Home Page</button></Link>
              </div>
              </>
              );
          setAlertVisible(true);
          return false;
        }  else if (!user.attributes?.profileCreated) {
          setAlertContents(
              <>
          <div className="alert-popup-contents">
          You'll need to set up a Profile to access this feature.                
          </div>
          </>
          ) 
          setAlertVisible(true);
          return false;
        } else {
            return true;
        }
      }

    useEffect(() => {  
    })

    return (
        <>
        <div className="rating-project-container">
            <div className="rating-project-wrapper">
                <h4>Your Review</h4>
                
                <div className="rating-project-stars-container">
                    {[...Array(5)].map( (star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label>
                                <input type="radio" name="rating-radio" value={ratingValue} onClick={() => setStars(ratingValue)}/>
                                {ratingValue  <= stars ? <i class="fas fa-star gold"></i> : <i class="fas fa-star grey"></i>}
                            </label>
                        )
                    })}
                </div>
                    <input className="rating-review-title" type="text" placeholder={prevTitle} value={reviewTitle} required 
                    onChange={(event) =>setReviewTitle(event.currentTarget.value)}/>
                <div className="rating-project-review-text">
                <textarea rows={3} 
                    className="form-control" 
                    placeholder="Please leave a review in less than 150 characters." 
                    maxLength={150} 
                    value={review} 
                    required 
                    onChange={(event) =>setReview(event.currentTarget.value)}/>
                </div>
                <div className="rating-project-submit">
                <button className="rating-project-submit-button btn1" onClick={() => {loadUserRating()}}>Load My Review</button>
                    <button className="rating-project-submit-button btn2" onClick={postProjectRating}>Post Review</button>
                </div>
            </div>   
        </div>
        {alertVisible &&
            <Alert 
            visible={setAlertVisible}
            content={alertContents}            
            />
        } 
        </>
    )
}

export default RatingProject;
