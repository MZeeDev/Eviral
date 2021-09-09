// Moralis.Cloud.define("loadRequestMessage", async (request) => {
//     const logger = Moralis.Cloud.getLogger();

//     const Chat = Moralis.Object.extend("Conversation");
//     const queryChat = new Moralis.Query(Chat);
//     queryChat.equalTo('objectId', request.params.chatId);
//     const chatFound = await queryChat.find();
//     const conversation = chatFound[0];
//     logger.info(conversation);
//     logger.info(conversation.id);
// logger.info("below is conversation obj and id");

//   const Message = Moralis.Object.extend("Messages");
//     const query = new Moralis.Query(Message);
//     query.equalTo('parent', conversation);
//     query.select('from.username', 'from.profilePic', 'message', 'date','time', 'project')
//     const message = await query.find({useMasterKey:true});
//   const results = [];  
// logger.info(message[0].attributes.date);
//  logger.info(message[0].attributes.from.attributes.username);
//     for (let i = 0; i < message.length; ++i) {
//     let profilePic;
//      if (typeof message[i].attributes.from.attributes.profilePic === 'undefined') {
//            profilePic = "https://i.ibb.co/mvFxwhM/default-Profile.png";
//      } else {
//        profilePic = message[i].attributes.from.attributes.profilePic._url;
//      }
//     results.push({
//       "fromUsername": message[i].attributes.from.attributes.username,
//       "fromProfilePic": profilePic,
//       "projectName": message[i].attributes.project,
//       "message": message[i].attributes.message,
//       "date" : message[i].attributes.date,
//       "time" : message[i].attributes.time,            
//     });        
//   }
//     logger.info(results[0].date);
//  logger.info(results[0].fromUsername);
//   return results;
// });







// Moralis.Cloud.define("loadRequestsProfiles", async (request) => {
//   const logger = Moralis.Cloud.getLogger();
//   const user = request.user;
//   const relation = user.relation('conversations');
//   const query = relation.query({useMasterKey:true});
//     query.equalTo('notifyUser2', true)
//     query.notEqualTo('user1', user)
//     query.select('user1.username', 'user1.profilePic', 'date', 'projectName');
//      query.descending('createdAt');
//     const queryResults = await query.find({useMasterKey:true});
//     const results = [];
// logger.info("first request profile loaded");
// logger.info(queryResults[0].user1);
// logger.info(queryResults[0].attributes.user1);
// logger.info(queryResults);
//     for (let i = 0; i < queryResults.length; ++i) {
//     let profilePic;
//     if (typeof queryResults[i].attributes.user1.attributes.profilePic === 'undefined') {
//            profilePic = "https://i.ibb.co/mvFxwhM/default-Profile.png";
//     } else {
//        profilePic = queryResults[i].attributes.user1.attributes.profilePic._url;
//     }
//     results.push({
//       "username": queryResults[i].attributes.user1.attributes.username,
//       "date": queryResults[i].attributes.date,
//       "profilePic": profilePic,
//       "projectName": queryResults[i].attributes.projectName,
//       "chatId" : queryResults[i].id,
//     });        
//   }
//   return results;
// });

// Moralis.Cloud.define("sendMessage", async (request) => {
      
//     const logger = Moralis.Cloud.getLogger();

//   const Chat = Moralis.Object.extend("Conversation");
//     let chat = new Chat();
//   const Message = Moralis.Object.extend("Messages");
//     let messages = new Message();
//   const fromUsername = request.params.from;
//   logger.info("params from");
//   logger.info(fromUsername);
//   const toUsername = request.params.to;
//     const date = request.params.date;
//     const time = request.params.time;
//     const project = request.params.project;
//     const message = request.params.message;
//   logger.info("params username to");
//   logger.info(toUsername);

//   const Profile = Moralis.Object.extend("User");
//     const findProfile = new Moralis.Query(Profile);
//     findProfile.equalTo("username", toUsername);
//     const user = await findProfile.find({useMasterKey:true});
//     const toUser = user[0];

//     const findProfileFrom = new Moralis.Query(Profile);
//     findProfileFrom.equalTo("username", fromUsername);
//     const userFrom = await findProfileFrom.find({useMasterKey:true});
//     const fromUser = userFrom[0];

// logger.info("to user Id");
//  logger.info(toUser);  
//     messages.set('from', fromUser);
//     messages.set('to', toUser);
//     messages.set('date', date);
//     messages.set('time', time);
//     messages.set('project', project);
//     messages.set('message', message);
//    messages.set('parent', chat);
//     await messages.save();  
//     chat.set('user1', fromUser);
//     chat.set('user2', toUser);
//     chat.set('notifyUser2', true);  
//     chat.set('date', date);
//     chat.set('time', time);
//     chat.set('projectName', project);
//     const relationMsg = chat.relation("messages");
//     relationMsg.add(messages);
//   await chat.save(null,{useMasterKey:true});

//   const relationTo = toUser.relation("conversations");
//   relationTo.add(chat);
//   await toUser.save(null,{useMasterKey:true});

//   const relationFrom = fromUser.relation("conversations");
//   relationFrom.add(chat);
//   await fromUser.save(null,{useMasterKey:true});



//     return messages;
// });

// Moralis.Cloud.define("searchUsersByName", async (request) => {
//   const Profiles = Moralis.Object.extend("User");
//   let query = new Parse.Query(Profiles);
//   query.matches('username', request.params.username);
//   query.select('username', 'userLocation', 'bio', 'profilePic', 'createdAt');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];  
//   for (let i = 0; i < queryResults.length; ++i) {
//     if (typeof queryResults[i].attributes.profilePic !== 'undefined') {
//       results.push({
//       "username": queryResults[i].attributes.username,
//       "location": queryResults[i].attributes.userLocation,   
//       "bio": queryResults[i].attributes.bio,       
//       "profilePic": queryResults[i].attributes.profilePic._url          
//       });
//     };
//   }
//   return results;
// });

// Moralis.Cloud.define("searchProjectsByName", async (request) => {
//   const Projects = Moralis.Object.extend("Projects");
//   let query = new Parse.Query(Projects);
//   query.matches('title', request.params.title);
//   query.select('creatorProfilePic', 'title','projectPhoto', 'summary','isVerified', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       "objectId": queryResults[i].attributes.objectId,
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// });


// Moralis.Cloud.define("loadReviews", async (request) => {
//  const logger = Moralis.Cloud.getLogger();  
//     const query = new Moralis.Query("Projects");
//   query.equalTo('title', request.params.projectTitle)  	
//   const queryResults = await query.find({useMasterKey:true});    
//     const relation = queryResults[0].relation('reviews');
//     const queryRelation = relation.query();
//     queryRelation.select('stars', 'username','reviewerPic', 'review', 'updatedAt', 'createdAt', 'reviewTitle');
//     queryRelation.descending('updatedAt');
//     const relationResults = await queryRelation.find({useMasterKey:true});
//     const results = [];
//   for (let i = 0; i < relationResults.length; ++i) {
//     let date = new Date(Date.parse(relationResults[i].attributes.createdAt));
//     let createdOn = date.toLocaleDateString();
//     results.push({
//         "username" : relationResults[i].attributes.username,
//       "reviewerPic" : relationResults[i].attributes.reviewerPic,
//       "stars" : relationResults[i].attributes.stars,
//       "review" : relationResults[i].attributes.review,       
//       "createdAt" : createdOn,
//       "updatedAt" : relationResults[i].attributes.updatedAt,   
//        "reviewTitle" : relationResults[i].attributes.reviewTitle, 
//     });
//   }
//     return results;
// });

// Moralis.Cloud.define("loadProjectRating", async (request) => {
//  const logger = Moralis.Cloud.getLogger();  
//     const query = new Moralis.Query("Projects");
//   query.equalTo('title', request.params.projectTitle)  	
//   const queryResults = await query.find({useMasterKey:true});
//     if(typeof queryResults[0] === 'undefined'){
//     return
//   }
//     const relation = queryResults[0].relation('reviews');
//     const queryRelation = relation.query();
//     const relationResults = await queryRelation.find({useMasterKey:true});
//     let sum = 0;
//     for( let i = 0; i < relationResults.length; ++i) {
//       sum += relationResults[i].attributes.stars;
//   }
//     const numberReviews = relationResults.length;
//     let averageRating = (sum / numberReviews).toFixed(1);
//   if(isNaN(averageRating)) {
//     averageRating = 0;
//   }
//     return [numberReviews, averageRating];
// });
    

// Moralis.Cloud.beforeSave("Projects", async (request) => {
// const logger = Moralis.Cloud.getLogger();
// logger.info("beforeSave!");
// logger.info(request.object.get('title'));
// const query = new Moralis.Query("Projects");
// query.equalTo('title', request.object.get('title'));
// const queryResults = await query.find({useMasterKey:true});
// if(queryResults.length > 0){
//   if(queryResults[0].id != request.object.id) {
//       throw 'You must choose an unique name for your project.';
//    }
// };
// if(typeof request.object.get('projectPhoto') === 'undefined') {
//   throw 'Please include a photo for your project. The filename must not contain special characters.';
// };
// if(typeof request.object.get('title') === 'undefined') {
//   throw 'Please give your project a name.';
// };
// if(typeof request.object.get('summary') === 'undefined') {
//   throw 'Please give your project a summary.';
// };
// if(typeof request.object.get('description') === 'undefined') {
//   throw 'Please give your project a description.';
// };
// });

// Moralis.Cloud.define("renderProjects", async (request) => {
//     const skipAmount = (request.params.skipAmount)*(6);
//   const query = new Moralis.Query("Projects");
//     query.select('creatorProfilePic', 'title','projectPhoto', 'summary','isVerified', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//     query.descending('createdAt');
//     query.limit(6);
//     query.skip(skipAmount);
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       "objectId": queryResults[i].id,
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// });

// Moralis.Cloud.define("renderSavedProjects", async (request) => {
//     const currentUser = request.user;
//     const relation = currentUser.relation('bookmarkedProjects');
//     const query = relation.query();
//   query.select('creatorProfilePic', 'title','projectPhoto', 'summary','isVerified', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// });

// Moralis.Cloud.define("renderMyProjects", async (request) => {
//     const currentUser = request.user;
//     const relation = currentUser.relation('projects');
//     const query = relation.query();
//   query.select('creatorProfilePic', 'title','projectPhoto', 'summary', 'isVerified','date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// });


// Moralis.Cloud.define("renderUserProjects", async (request) => {
// const logger = Moralis.Cloud.getLogger();
// logger.info("beforeserquery!");
//     const Profile = Moralis.Object.extend("User");
//     const findProfile = new Moralis.Query(Profile);
//     findProfile.equalTo("username", request.params.userUsername);
//     const user = await findProfile.find({useMasterKey:true});
//     const relation = user[0].relation('projects');
//     const query = relation.query();
//   query.select('creatorProfilePic', 'title','projectPhoto', 'isVerified','summary', 'date','description', 'creator.username', 'creator.profilePic', 'createdAt');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   logger.info(queryResults);
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// logger.info(results);
// });

// Moralis.Cloud.define("projectData", async (request) => {
//   const query = new Moralis.Query("Projects");
//   query.equalTo('title', request.params.projectTitle)
//     query.select('creatorProfilePic', 'title', 'objectId', 'isVerified','projectPhoto', 'summary', 'date','description', 'creator.username', 'creator.profilePic','creator.bio', 'createdAt','website','twitter', 'telegram', 'linkedIn', 'discord', 'twitch', 'youtube');
//     query.descending('createdAt');
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     results.push({
//       "username": queryResults[i].attributes.creator.attributes.username,
//       "profilePic": queryResults[i].attributes.creator.attributes.profilePic._url,
//       "bio": queryResults[i].attributes.creator.attributes.bio,
//       "title": queryResults[i].attributes.title,
//       "projectPhoto": queryResults[i].attributes.projectPhoto._url,
//       "summary": queryResults[i].attributes.summary,    	
//       "createdOn": queryResults[i].attributes.date,
//       "description": queryResults[i].attributes.description,
//       'objectId': queryResults[i].objectId,  
//       "website": queryResults[i].attributes.website,
//       "twitter": queryResults[i].attributes.twitter,
//       "telegram": queryResults[i].attributes.telegram,
//       "linkedIn": queryResults[i].attributes.linkedIn,
//       "discord": queryResults[i].attributes.discord,
//       "twitch": queryResults[i].attributes.twitch, 
//       "youtube": queryResults[i].attributes.youtube,        
//       'isVerified': queryResults[i].attributes.isVerified,
//     });
//   }
//   return results;
// });

// Moralis.Cloud.define("getProjectByName", async (request) => {
//     const query = new Moralis.Query("Projects");
//   query.equalTo('title', request.params.projectTitle)  	
//   const queryResults = await query.find({useMasterKey:true});
//     return queryResults[0];
// });

// Moralis.Cloud.define("loadUserProjectRating", async (request) => {
// const logger = Moralis.Cloud.getLogger();
// logger.info("beforeLoadUserProjectRating!");
//     const query = new Moralis.Query("Projects");
//   query.equalTo('title', request.params.projectTitle)  	
//   const queryResults = await query.find({useMasterKey:true});
//     const projectId = queryResults[0].id;
// logger.info(projectId);
//     const queryReview = new Moralis.Query("Reviews");
//   queryReview.equalTo('project', projectId)
//     queryReview.equalTo('reviewer', request.user.id)
// logger.info(request.user.id);
//   const queryResult = await queryReview.find({useMasterKey:true});
//     return queryResult;  
//   logger.info(queryResult);
// });

// Moralis.Cloud.define("findUser", async (request) => {
// const query = new Moralis.Query("User");
// query.equalTo("username", request.params.profileName)
// const profile = await query.find({useMasterKey:true});
// return profile;
// });

// Moralis.Cloud.define("loadUsers", async (request) => {
//     const skipAmount = (request.params.skipAmount)*(6);
//   const query = new Parse.Query("User");  
//   query.select('username', 'userLocation', 'bio', 'profilePic', 'createdAt', 'landscapePic');
//     query.descending('createdAt');
//     query.limit(6);
//     query.skip(skipAmount);
//   const queryResults = await query.find({useMasterKey:true});
//   const results = [];  
//   for (let i = 0; i < queryResults.length; ++i) {
//       if (typeof queryResults[i].attributes.profilePic !== 'undefined') {
//         let landscapePic;
//         if(typeof queryResults[i].attributes.landscapePic === 'undefined') {
//             landscapePic = queryResults[i].attributes.profilePic._url;
//         } else {
//             landscapePic = queryResults[i].attributes.landscapePic._url;
//         }
//         results.push({
//           "username": queryResults[i].attributes.username,
//           "location": queryResults[i].attributes.userLocation,   
//           "bio": queryResults[i].attributes.bio,       
//           "profilePic": queryResults[i].attributes.profilePic._url,
//           "landscapePic":  landscapePic,          
//         });
//       };
//   }
//   return results;
// });

// Moralis.Cloud.define("loadSavedProfiles", async (request) => {
// const currentUser = request.user;
// const relation = currentUser.relation('savedProfiles');
// const query = relation.query();
// const queryResults = await query.find({useMasterKey:true});
// const results = [];  
//   for (let i = 0; i < queryResults.length; ++i) {
//     if (typeof queryResults[i].attributes.profilePic !== 'undefined') {
//       results.push({
//       "username": queryResults[i].attributes.username,
//       "location": queryResults[i].attributes.userLocation,   
//       "bio": queryResults[i].attributes.bio,       
//       "profilePic": queryResults[i].attributes.profilePic._url          
//       });
//     };
//   }
//   return results;
// });

// Moralis.Cloud.define("checkIfSavedProfile", async (request) => {
// const currentUser = request.user;
// const relation = currentUser.relation('savedProfiles');
// const query = relation.query();
// query.equalTo('username', request.params.profileName)
// const queryResults = await query.find({useMasterKey:true});
// const results = [];  
//   for (let i = 0; i < queryResults.length; ++i) {
//     if (typeof queryResults[i].attributes.profilePic !== 'undefined') {
//       results.push({
//       "username": queryResults[i].attributes.username,    
//       });
//     };
//   }
//   return results;
// });

// Moralis.Cloud.define("userProfileData", async (request) => {
// const query = new Moralis.Query("User");
// query.equalTo('username', request.params.userUsername)
// query.select('username', 'profilePic','userLocation', 'skills', 'bio','website', 'createdAt', 'landscapePic', 'story', 'twitter', 'telegram', 'linkedIn', 'discord', 'twitch', 'youtube');  	
// const queryResults = await query.find({useMasterKey:true});
// const results = [];
//   for (let i = 0; i < queryResults.length; ++i) {
//     let landscapePic;
//     if(typeof queryResults[i].attributes.landscapePic === 'undefined') {
//       landscapePic = queryResults[i].attributes.profilePic._url;
//     } else {
//          landscapePic = queryResults[i].attributes.landscapePic._url;
//     }
//       results.push({
//         "username": queryResults[i].attributes.username,
//         "profilePic": queryResults[i].attributes.profilePic._url,
//         "bio": queryResults[i].attributes.bio,
//         "userLocation": queryResults[i].attributes.userLocation,
//         "skills": queryResults[i].attributes.skills,
//         "website": queryResults[i].attributes.website,    	
//         "createdAt": queryResults[i].attributes.createdAt,
//         "landscapePic":  landscapePic,
//         "story": queryResults[i].attributes.story,
//         "twitter": queryResults[i].attributes.twitter,
//         "telegram": queryResults[i].attributes.telegram,
//         "linkedIn": queryResults[i].attributes.linkedIn,
//         "discord": queryResults[i].attributes.discord,
//         "twitch": queryResults[i].attributes.twitch, 
//         "youtube": queryResults[i].attributes.youtube,
//       });
    
//   console.log(queryResults[i]);
// }
// return results;
// });