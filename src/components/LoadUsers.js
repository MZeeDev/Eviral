import React, {useState, useEffect} from 'react';
import ProfileCard from './ProfileCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';

function LoadUsers() {

  const { user, Moralis } = useMoralis();
  const [ users, setUsers ] = useState([""]);
  const initLoad = 0; // change later to accomodate refresh/sorting data
  const myUsername = (user.attributes.username);

  const LoadUsers = async() => {
    const userList = await Moralis.Cloud.run("loadUsers");
    setUsers(userList);
    console.log(users);
  };

  useEffect(() => {
    LoadUsers();
    },
    [initLoad]
  );  

    return (           
      <>
      <button onClick={LoadUsers}>LOAD</button>
        <React.Fragment>
          <div className="cards">
            <h3 className="my-projects-title">Newest Members</h3>
            <div className="cards-background"> 
            <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <div className='cards__items'>      
                        {users.map(userProfile => (
                          <div key={userProfile.username} className="cards__item">
                            <ProfileCard
                            title={userProfile.username}
                            bio={userProfile.bio}
                            src={userProfile.profilePic}
                            username={userProfile.username}
                            path={userProfile.username}               
                            />
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </React.Fragment>
      </>
    )
}

export default LoadUsers;
