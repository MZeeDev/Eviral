import React, { useEffect, useState, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import { addPost } from './../../api/index.js';
import axios from 'axios';
import { toast } from "react-toastify"
// import { io } from "socket.io-client";
function FeedPost({ socket }) {
    const [post, setPost] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const { user, Moralis, isInitialized } = useMoralis();

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    console.log("SOCKET", socket)
    // const socket = useRef();

    // let host = process.env.REACT_APP_SERVER_URL;

    // useEffect(() => {
    //     if (user) {
    //         socket.current = io(host);
    //         socket.current.emit("add-user", user?.attributes?.accounts[0]);
    //     }
    // }, [user]);

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, [matches]);

    // console.log('user', user);
    // console.log('user', user?.attributes?.username);

    const postThePost = async () => {



        if (post === "") {
            toast.error(`OOPS, you've written nothing!!!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return
        }
        if (selectedImage === "") {
            toast.success('Please wait...', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            let response = await addPost(user?.attributes?.accounts[0], post, null);
            console.log("response.data.post", response.data.post)
            socket.current.emit("add-post", response.data.post);

            setPost("")
            // removeSelectedImage()
            // selectedImage("")
            toast.success('WOW!!! Your Post is published!!!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return
        } else {
            toast.success('Please wait...', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            const formData = new FormData();
            formData.append("file", selectedImage)
            const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/file/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            // console.log(result.data.key)
            let media = result.data.key
            let response = await addPost(user?.attributes?.accounts[0], post, media);
            console.log(response)

            socket.current.emit("add-post", response.data.post);
            setPost("")
            removeSelectedImage()
            // selectedImage("")
            toast.success('WOW!!! Your Post is published!!!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return
        }
    };

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let formData = new FormData();
            formData = e.target.files[0];
            console.log(formData);
            setSelectedImage(e.target.files[0]);
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage('');
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50
        },
        preview: {
            marginTop: 50,
            display: 'flex',
            flexDirection: 'column'
        },
        image: { maxWidth: '100%', maxHeight: 320, marginBottom: 10 },
        delete: {
            cursor: 'pointer',
            padding: 15,
            background: 'red',
            color: 'white',
            border: 'none'
        }
    };

    return (
        <div


            // style={{
            //     marginLeft: matches ? '28vw' : "0vw",
            //     paddingTop: 10,
            //     paddingBottom: 0
            // }}
            className="container"
        >

            {matches}
            <div className="md:flex -mx-4">
                {/* <img src="https://zia-ullah-test.s3.amazonaws.com/f356b81602f1e241a592c2e28fc2a50b"></img> */}
                <div style={{ margin: "auto" }} className="lg:w-2/4 px-4">
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <div className="flex w-full">
                            <div className="flex-shrink-0 mr-5">
                                <div className="cursor-pointer font-bold w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                                    <span className="uppercase text-gray-700" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <textarea

                                    className="mb-2 bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white border border-transparent rounded-lg py-2 px-4 block w-full appearance-none leading-normal placeholder-gray-700"
                                    rows={3}
                                    placeholder="What's happening..."
                                    value={post}
                                    onChange={(e) => setPost(e.target.value)}
                                />
                                <div
                                    className="relative w-auto mb-2 border rounded-lg relative bg-gray-100 mb-4 shadow-inset overflow-hidden"
                                    x-show="images.length > 0"
                                >
                                    <div className="gg-container">
                                        <div
                                            className="gg-box square-gallery"
                                            style={{ margin: 0 }}
                                        >
                                            <template x-for="image in images" />
                                        </div>
                                    </div>
                                    <div className="shadow cursor-pointer absolute top-0 right-0 p-2 mr-2 mt-2 rounded-full bg-gray-600">
                                        <svg
                                            className="h-6 w-6 text-gray-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {/* <img src={}></img> */}
                                <i
                                    style={{
                                        display: selectedImage ? 'default' : 'none',
                                        float: 'right',
                                        cursor: 'pointer'
                                    }}
                                    className="fa fa-times"
                                    onClick={removeSelectedImage}
                                    aria-hidden="true"
                                ></i>

                                {selectedImage && (
                                    <div>
                                        <img
                                            width={'100%'}
                                            height={'50%'}
                                            className="img-fluid"
                                            src={URL.createObjectURL(selectedImage)}
                                            style={styles.image}
                                            alt="Thumb"
                                        />
                                        <button style={styles.delete} onClick={removeSelectedImage}>
                                            Remove This Image
                                        </button>
                                    </div>
                                )}

                                <br />
                                <input
                                    name="photo"
                                    id="fileInput"
                                    accept="image/*"
                                    className="hidden"
                                    type="file"
                                    style={{ display: !selectedImage ? 'default' : 'none' }}
                                    onChange={imageChange}
                                />

                                <div className="flex justify-between items-center">
                                    <div>
                                        <label
                                            htmlFor="fileInput"
                                            type="button"
                                            className="-ml-2 cursor-pointer inine-flex justify-between items-center focus:outline-none p-2 rounded-full text-gray-500 bg-white hover:bg-gray-200"
                                        >
                                            <svg
                                                className="h-6 w-6 text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </label>
                                    </div>
                                    <div>
                                        <span className="mr-3 text-sm text-gray-600" />
                                        <button
                                            // disabled={post === ""}
                                            onClick={() => {
                                                postThePost();
                                            }}
                                            type="button"
                                            className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedPost;
