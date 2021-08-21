import React, { useState} from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';

function MyProjects() {
    const { user, Moralis } = useMoralis();
    const { } = useMoralisFile();

    // const [projects, renderProjects] = useState(getQuery);
    // const getQuery = async () => {
    // }

    

    const [projectPhoto, setProjectPhoto] = useState();
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [description, setDescription] = useState();
    const [creatorUserName, setCreatorUserName] = useState();
    const [creatorPic, setCreatorPic] = useState();
    const [ createdOnDate, setCreatedOnDate] = useState();

    const getMyProjects = async () => {
        const myProjects = Moralis.Object.extend("Projects");
        const query = new Moralis.Query(myProjects);
        const project = await query.first();
        setProjectPhoto(project.attributes.projectPhoto._url);
        setTitle(project.attributes.title);
        setSummary(project.attributes.summary);
        setCreatorUserName(project.attributes.creator.attributes.username);
        setCreatorPic(project.attributes.creator.attributes.profilePic._url);
        setCreatedOnDate(project.attributes.createdAt.toLocaleDateString());
    }
    
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="my-project-wrapper">
                        <div className="my-projects-title">
                            <h3>My Projects</h3>
                            <button onClick={getMyProjects}>Load</button>
                        </div>
                        <div className="my-projects-render">
                            <ProjectCard
                                label="Art"
                                src={projectPhoto}
                                title={title}
                                creatorProfilePic={creatorPic}
                                username={creatorUserName}
                                createdOn={[createdOnDate]}
                                summary={summary}
                                rating="5.0"
                                reviewCount="931"          
                            />
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default MyProjects;
