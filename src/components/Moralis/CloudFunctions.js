// Moralis.Cloud.define("renderProjects", async (request) => {
//     const query = new Moralis.Query("Projects");
//   	query.select('creatorProfilePic', 'title','projectPhoto', 'summary', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//   	query.descending('createdAt');
//     const queryResults = await query.find({useMasterKey:true});
//     const results = [];
//     for (let i = 0; i < queryResults.length; ++i) {
//       results.push({
//         "username": queryResults[i].attributes.creator.attributes.username,
//         "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//         "title": queryResults[i].attributes.title,
//         "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//         "summary": queryResults[i].attributes.summary,    	
//         "createdOn": queryResults[i].attributes.date,
//         "description": queryResults[i].attributes.description,
//       });
//     }
//     return results;
//  });

// Moralis.Cloud.define("renderMyProjects", async (request) => {
//     const query = new Moralis.Query("Projects");
//     query.select('creatorProfilePic', 'title','projectPhoto', 'summary', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//   	query.descending('createdAt');
//     const queryResults = await query.find({useMasterKey:true});
//     const results = [];
//     for (let i = 0; i < queryResults.length; ++i) {
//       results.push({
//         "username": queryResults[i].attributes.creator.attributes.username,
//         "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//         "title": queryResults[i].attributes.title,
//         "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//         "summary": queryResults[i].attributes.summary,    	
//         "createdOn": queryResults[i].attributes.date,
//         "description": queryResults[i].attributes.description,
//       });
//     }
//     return results;
//   });

// Moralis.Cloud.define("projectData", async (request) => {
//     const query = new Moralis.Query("Projects");
// 	query.equalTo('title', request.params.projectTitle)
//   	query.select('creatorProfilePic', 'title','projectPhoto', 'summary', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//   	query.descending('createdAt');
//     const queryResults = await query.find({useMasterKey:true});
//     const results = [];
//     for (let i = 0; i < queryResults.length; ++i) {
//       results.push({
//         "username": queryResults[i].attributes.creator.attributes.username,
//         "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//         "bio": queryResults[i].attributes.creator.attributes.bio,
//         "title": queryResults[i].attributes.title,
//         "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//         "summary": queryResults[i].attributes.summary,    	
//         "createdOn": queryResults[i].attributes.date,
//         "description": queryResults[i].attributes.description,
//       });
//     }
//     return results;
//  });


// Moralis.Cloud.define("loadUsers", async (request) => {
//     const query = new Parse.Query("User");  
//     query.select('username', 'userLocation', 'bio', 'profilePic', 'createdAt');
//   	query.descending('createdAt');
//     const queryResults = await query.find({useMasterKey:true});
//     const results = [];  
//     for (let i = 0; i < queryResults.length; ++i) {
//       if (typeof queryResults[i].attributes.profilePic !== 'undefined') {
//         results.push({
//         "username": queryResults[i].attributes.username,
//         "location": queryResults[i].attributes.userLocation,   
//         "bio": queryResults[i].attributes.bio,       
//         "profilePic": queryResults[i].attributes.profilePic._url
//         });
//       };
//       console.log(queryResults[i]);
//     }
// 	console.log(queryResults);
//     return results;
//   });



// Moralis.Cloud.define("userProfileData", async (request) => {
//   const query = new Moralis.Query("User");
//   query.equalTo('username', request.params.userUsername)
//     query.select('username', 'profilePic','userLocation', 'skills', 'bio','website', 'createdAt', 'landscapePic', 'story');  	
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//     for (let i = 0; i < queryResults.length; ++i) {
//       let landscapePic;
//       if(typeof queryResults[i].attributes.landscapePic === 'undefined') {
//         landscapePic = queryResults[i].attributes.profilePic._url;
//       } else {
//        	landscapePic = queryResults[i].attributes.landscapePic._url;
//       }
//         results.push({
//           "username": queryResults[i].attributes.username,
//           "profilePic": queryResults[i].attributes.profilePic._url,
//           "bio": queryResults[i].attributes.bio,
//           "userLocation": queryResults[i].attributes.userLocation,
//           "skills": queryResults[i].attributes.skills,
//           "website": queryResults[i].attributes.website,    	
//           "createdAt": queryResults[i].attributes.createdAt,
//           "landscapePic":  landscapePic,
//           "story": queryResults[i].attributes.story,
//         });
      
//     console.log(queryResults[i]);
//   }
//   return results;
// });