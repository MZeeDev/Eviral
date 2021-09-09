import React, {useState, useEffect} from 'react';
import { useMoralis } from "react-moralis";

function Bookmark(props) {
    const { user, Moralis } = useMoralis();
    const [bookmark, setBookmark] = useState(false);
    const init = null;

    const saveProject = async() => {
        setBookmark(true);
        const Project = Moralis.Object.extend("Projects"); 
        const query = new Moralis.Query(Project);
        query.equalTo("title", props.projectTitle);
        const project = await query.find();
        const currentUser = await Moralis.User.current();
        const relation = currentUser.relation("bookmarkedProjects");
        relation.add(project);
        await user.save();
        alert("Project Bookmarked!");
    }

    const removeProject = async() => {
        setBookmark(false);
        const Project = Moralis.Object.extend("Projects"); 
        const query = new Moralis.Query(Project);
        query.exists("title");
        query.equalTo("title", props.projectTitle);
        const project = await query.find();
        const currentUser = await Moralis.User.current();
        const relation = currentUser.relation("bookmarkedProjects");
        relation.remove(project);
        await user.save();
        alert("Project Removed!");
    }  

    const checkBookmark = async() => {
        const user = Moralis.User.current();
        const relation = user.relation("bookmarkedProjects");     
        const query = relation.query();
        query.equalTo("title", (props.projectTitle));
        query.select("attributes.title")
        const queryResults = await query.find();
        const results = [];
        for (let i = 0; i < queryResults.length; ++i) {
              results.push({
              "title": queryResults[i].attributes.title,    
              });
            };
        if(results[0]) {
            setBookmark(true);
        } 
    }

    useEffect(() => {
        checkBookmark();
        },
        [init],
      );

    return (
        <div className="bookmark" >
            {bookmark ? <i class="fas fa-bookmark" onClick={() => removeProject()}></i>  : <i class="far fa-bookmark" onClick={() => saveProject()}></i>}
        </div>
    )
}

export default Bookmark;
