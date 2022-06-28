import React, { useState, useEffect } from 'react'
import { addShare, getUserShares, getPostShares, undoShare } from "./../../api/index.js"
import { useMoralis } from 'react-moralis';
import { toast } from "react-toastify"

export default function Share({ postid }) {


    console.log("POSTID", postid)
    const [shares, setShares] = useState(0)

    const [myshares, setMyshares] = useState([])

    const [isProcessing, setIsProcessing] = useState(false)

    const { user, Moralis, isInitialized } = useMoralis();
    let userwalletid = user?.attributes?.accounts[0];
    const [amIShared, setamIShared] = useState(false)
    useEffect(async () => {
        let index =
            myshares?.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
        index === -1 ? setamIShared(false) : setamIShared(true)
    }, [myshares])

    const share = async () => {

        try {
            setIsProcessing(true)
            let response = await addShare(postid, userwalletid)
            console.log(response)
            setamIShared(true)
            toast.success('You shared the post.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setIsProcessing(false)
            getPostSharesByComponent()
        } catch (error) {
            console.log(error)
        }
    }


    const undoTheShare = async () => {

        try {
            setIsProcessing(true)
            let index =
                myshares?.reduce((i, item, index) => item.walletid === userwalletid ? index : i, -1);
            let shareid = myshares[index].shareid
            let response = await undoShare(shareid)
            setamIShared(false)
            setIsProcessing(false)
            getPostSharesByComponent()
            toast.success('You undo the post share!!!.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

        } catch (error) {
            console.log(error)
        }
    }


    const shareOrUndoShare = async (e) => {
        e.preventDefault()
        try {

            if (amIShared === true) {
                await undoTheShare()
                return
            }
            else {
                await share()
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        await getPostSharesByComponent()
    }, [shares])

    const getPostSharesByComponent = async () => {
        try {
            let response = await getPostShares(postid)
            if (response?.data.shares !== undefined) {
                console.log(response?.data.shares)
                setMyshares(response?.data.shares)
                setShares(response?.data.shares.length)
            } else {
                setMyshares([])
                setShares(0)
            }
            // setShares(response.data.posts)
            return
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <span className="ml-2" >

                <b> {shares}&nbsp;</b>{shares === 1 ? "share" : "shares"}


            </span>   <span style={{ cursor: "pointer" }}

                onClick={(e) => { shareOrUndoShare(e) }}

                className="ml-2">{
                    isProcessing === true ? <span>Please wait...</span> : amIShared === true ? "undo share" : "share"
                }</span>
        </div>
    )
}
