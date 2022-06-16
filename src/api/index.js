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
        let res;
        res = await axios.get(`${SERVER_URL}/api/feed/userposts?walletid=${walletid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
