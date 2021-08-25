import React, {useState, useEffect} from 'react';
import ProjectCard from './ProjectCard';
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
            <h3 className="my-projects-title">New Members</h3>
            <div className="cards-background"> 
            <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <div className='cards__items'>      
                        {users.map(listItem => (
                          <div key={listItem.username} className="cards__item">
                            <ProjectCard
                            title={listItem.username}
                            summary={listItem.bio}
                            src={listItem.profilePic}
                            username={listItem.username}                    
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
