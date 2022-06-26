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


export const postsByPostId = async (postid) => {
    try {
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











export const addShare = async (postid, walletid) => {
    try {
        let res;
        res = await axios.post(`${SERVER_URL}/api/shares`, {
            postid: postid,
            walletid: walletid
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const getUserShares = async (walletid) => {
    try {

        console.log(`${SERVER_URL}/api/shares/user?walletid=${walletid}`)
        let res;
        res = await axios.get(`${SERVER_URL}/api/shares/user?walletid=${walletid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostShares = async (postid) => {
    try {
        console.log(`${SERVER_URL}/api/shares?postid=${postid}`)
        let res;
        res = await axios.get(`${SERVER_URL}/api/shares?postid=${postid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const undoShare = async (shareid) => {
    try {
        let res;
        res = await axios.delete(`${SERVER_URL}/api/shares/user?shareid=${shareid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};






//Comments

export const addComments = async (postid, walletid, comment) => {
    try {

        let res;
        res = await axios.post(`${SERVER_URL}/api/comments`, {
            postid: postid,
            walletid: walletid,
            comment: comment
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostComments = async (postid) => {
    try {
        let res;
        res = await axios.get(`${SERVER_URL}/api/comments?postid=${postid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (commentid) => {
    try {
        let res;
        res = await axios.delete(`${SERVER_URL}/api/comments/user?commentid=${commentid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};



// replies



//Comments

export const addReply = async (commentid, walletid, reply) => {
    try {

        let res;
        res = await axios.post(`${SERVER_URL}/api/replies`, {
            commentid: commentid,
            walletid: walletid,
            reply: reply
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCommentReplies = async (commentid) => {
    try {
        let res;
        res = await axios.get(`${SERVER_URL}/api/replies?commentid=${commentid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteReply = async (replyid) => {
    try {
        let res;
        res = await axios.delete(`${SERVER_URL}/api/replies/user?replyid=${replyid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};