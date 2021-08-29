import React, {useState, useEffect} from 'react';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';
import './Project.css';
import { useMoralis } from 'react-moralis';

function LoadMyProject() {

  const { user, Moralis } = useMoralis();

  const [ projects, setProjects ] = useState([""]);
  const initLoad = 0; // change later to accomodate refresh/sorting data

  const LoadProjects = async() => {
    const user = Moralis.User.current();
    const relation = user.relation("projects");     
    const query = relation.query();  
    query.select('creatorProfilePic', 'title','projectPhoto', 'summary', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
    const results = await query.find();
    const results2 = [];
    for (let i = 0; i < results.length; ++i) {
      results2.push({
        "username": results[i].attributes.creator.attributes.username,
        "profilePic": results[i].attributes.creator.attributes.profilePic._url,
        "title": results[i].attributes.title,
        "projectPhoto": results[i].attributes.projectPhoto._url,
        "summary": results[i].attributes.summary,    	
        "createdOn": results[i].attributes.date,
        "description": results[i].attributes.description,
        "objectId": results[i].attributes.objectId,
      });
    }
    setProjects(results2);
    console.log(results2);




     // const projectList = await Moralis.Cloud.run("renderMyProjects", params);
    // setProjects(projectList);
    // console.log(projectList);
    // const username = await user.get('username')
    // const User = Moralis.Object.extend("User");
    // const Project = Moralis.Object.extend("Projects");
    // const innerQuery = new Moralis.Query(User);
    // innerQuery.equalTo('username', username);
    // const query = new Moralis.Query(Project);
    // query.matchesQuery("post", innerQuery);


    // const user = Moralis.User.current();
    //     const relation = user.relation("projects");     
    //     const query = relation.query();
    //     query.select("attributes.title")
    //     const results = await query.find();
    //     console.log(results);

  };

  useEffect(() => {
    LoadProjects();
    },
    [initLoad]
  );  

    return (           
      <>
      <button onClick={() => LoadProjects()}>Load</button>
        <React.Fragment>
          <div className="cards">
            <h3 className="my-projects-title">My Projects</h3>
            <div className="cards-background"> 
            <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <div className='cards__items'>      
                        {projects.map(listItem => (
                          <div key={listItem.title} className="cards__item">
                            <ProjectCard
                            title={listItem.title}
                            summary={listItem.summary}
                            src={listItem.projectPhoto}
                            username={listItem.username}
                            creatorProfilePic={listItem.profilePic}
                            createdOn = {listItem.createdOn}
                            label={listItem.username}
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

export default LoadMyProject;
