import React, { useState } from 'react';
import './SendMessagePopUp.css';
import { useMoralis } from 'react-moralis';

function SendMessagePopUp(props) {
    const { user, Moralis } = useMoralis();

    const [ msg, setMessage ] = useState();

    
  const SendMessage = async() => {
    const msgDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const msgTime = new Date().toLocaleTimeString('en-US');
    // const conversationId = await getConversationId();
    const params = { from: user.attributes?.username, to: (props.creatorName), date: msgDate, time: msgTime, project: (props.projectName), message: msg};
    try {
        const message = await Moralis.Cloud.run("sendMessage", params);        
        alert("Message Sent!");
        (props.visible(false));
    } catch (error) {
        alert(error)
    }    
  }

//   const getConversationId = async() => {
//     const params = { from: user.attributes?.username, to: (props.creatorName) };
//     const chatId = await Moralis.Cloud.run("getChatId", params);
//     return chatId;
//   }


    return (
        <>
        <div className="send-msg-background">
            <div className="send-msg-container">
                <div className="send-msg-wrapper">
                    <div className="send-msg-title">                        
                        <h3>Send a Message</h3>
                        <div className="send-msg-close">
                        <i class="fas fa-times"  onClick={() => {props.visible(false)}}></i>
                        </div>
                    </div>
                    <div className="send-msg-body">
                        <div className="creator-prj-info">
                            <div className="send-msg-creator">
                                <img className="send-msg-profilePic" src={props.creatorProfilePic} />
                                {props.creatorName}
                            </div>
                            <div className="send-msg-project">
                                <img className="send-msg-projectPic" src={props.projectPic} />
                                {props.projectName}
                            </div>
                        </div>
                        <div className="send-msg-text">
                            <textarea placeholder="Enter message. Max length: 500 characters" value={msg} maxLength="500" onChange={(event) =>setMessage(event.currentTarget.value)}></textarea>
                        </div>
                    </div>
                    <div className="send-msg-footer">
                        <button  onClick={SendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>           
    </>
    )
}

export default SendMessagePopUp;
