import React, {useState} from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';

/*
For project pages add description, for address to rank/review and then average that rating, links to project socials/github/website,
request collaboration
*/


function ProjectCard(props) {
    const { url } = useRouteMatch();

    const [bookmark, setBookmark] = useState(true);

    const saveProject = () => {
        setBookmark(!bookmark);
    }

    return (
        <>
            <div className="card-container">                
                    <Link className="cards-link" to={`${url}/${props.path}`}>
                        <figure className='card-pic-wrap' category={props.label}>
                            <img className="project-img" src={props.src}></img>
                        </figure>
                    </Link>
                    <div className="card-body">
                        <div>
                            <h4>{props.title}</h4>
                        </div>
                        <div className="project-creator">
                            Created by{" "}<img  src={props.creatorProfilePic}  className="creator-profile-pic"/>{" "}{props.username}{" on "}{props.createdOn}
                        </div>
                        <div className="project-summary">
                            {props.summary}
                        </div>
                    </div>
                    <div className="hl"></div>
                    <div className="card-footer">
                        <div className="rating">
                            <i class="fas fa-star"></i>
                            <span className="rating">{props.rating}</span>
                            <span className="review-count">{" "}({props.reviewCount})</span>
                        </div>
                        <div className="bookmark" onClick={saveProject}>
                            {bookmark ? <i class="far fa-bookmark"></i> : <i class="fas fa-bookmark"></i>}
                        </div>
                    </div>
               
            </div>
            
        </>
    )
}

export default ProjectCard;