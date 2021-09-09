import React from 'react';
import './ChatPage.css';

function ProfileMessageCard(props) {
    return (
        <div className="pmc-container">
            <div className="pmc-profilePic">
                <img src={props.profilePic} />
            </div>
            <div className="pmc-body">
                <h5>{props.username}</h5>
                <p>RE:{props.projectName}</p>
                <div className="pmc-updatedAt">
                    <h5>{props.updatedAt}</h5>
                </div>     
            </div>
        </div>
    )
}

export default ProfileMessageCard;
