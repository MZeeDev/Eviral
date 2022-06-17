import axios from "axios"
let SERVER_URL = process.env.REACT_APP_SERVER_URL

export const addPost = async (walletid, post, media) => {
    try {
        let res
        res = await axios.post(`${SERVER_URL}/api/feed/post`, {
            walletid: walletid,
            post: post,
            media: media
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const allPosts = async () => {
    try {
        let res
        res = await axios.get(`${SERVER_URL}/api/feed/allposts`);
        return res
    } catch (error) {
        console.log(error)
    }
}

// wallet id by
export const postsByWallet = async (walletid) => {
    try {

        // console.log(`${SERVER_URL}/api/feed/userposts?walletid=${walletid}`)
        let res;
        res = await axios.get(`${SERVER_URL}/api/feed/userposts?walletid=${walletid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const postsByPostId = async (postid) => {
    try {
        console.log(`${SERVER_URL}/api/feed/userpost?postid=${postid}`)
        let res;
        res = await axios.get(`${SERVER_URL}/api/feed/userpost?postid=${postid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};





export const addLike = async (postid, walletid) => {
    try {

        let res;
        res = await axios.post(`${SERVER_URL}/api/like`, {
            postid: postid,
            walletid: walletid
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const getUserLikes = async (walletid) => {
    try {

        console.log(`${SERVER_URL}/api/likes/user?walletid=${walletid}`)
        let res;
        res = await axios.get(`${SERVER_URL}/api/likes/user?walletid=${walletid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};




export const getPostLikes = async (postid) => {
    try {
        let res;
        res = await axios.get(`${SERVER_URL}/api/likes?postid=${postid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const unlike = async (likeid) => {
    try {
        let res;
        res = await axios.delete(`${SERVER_URL}/api/likes/user?likeid=${likeid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};





