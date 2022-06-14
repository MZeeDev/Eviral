import axios from "axios"
import * as FormData from 'form-data'
let SERVER_URL = process.env.REACT_APP_SERVER_URL
let MEDIA_SERVER_URL = process.env.REACT_APP_MEDIA_SERVER_URL
export const addPost = async (walletid, post, media) => {
    try {
        let res
        res = await axios.post(`${SERVER_URL}feed/post`, {
            walletid: walletid,
            post: post,
            media: media
        });
        return res
    } catch (error) {
        console.log(error)
    }
}


export const addMedia = async (selectedImage) => {
    try {

        let lovelyURL = `${MEDIA_SERVER_URL}media/upload`
        let formData = new FormData();
        formData.append("file", selectedImage);
        console.log("formData", formData)
        axios.post(lovelyURL, selectedImage, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log("Response", response)
        }).catch((error) => {
            console.log("error", error)
        });

        return
        let res

        // console.log(selectedImage.type)

        res = await axios.post(`${MEDIA_SERVER_URL}media/upload`, { data: selectedImage },
            {
                headers: {
                    'Content-Type': selectedImage.type
                }
            }
        );
        console.log("RES", res)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const allPosts = async () => {
    try {
        let res
        res = await axios.get(`${SERVER_URL}feed/allposts`);
        return res
    } catch (error) {
        console.log(error)
    }
}

// wallet id
export const postsByWallet = async (walletid) => {
    try {
        let res;
        res = await axios.get(`${SERVER_URL}feed/userposts?walletid=${walletid}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
