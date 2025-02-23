import React, { useContext, useEffect, useState } from 'react';
import "../../../styles/chat.modules.scss";
import { SocketContext } from "../../hooks/context/socket";
import { useParams } from 'react-router-dom';

export const Chat = () => {    
    const socket = useContext(SocketContext);
    const { idRoom } = useParams();
    const [message, setMessage] = useState("");
    const [messageAnswers, setMessageAnswers] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        socket.on('chat', data => {
            setMessageReceived((msg) => [...msg, data]);
        });

        socket.on('answers', data => {
            setAnswers((msg) => [...msg, data]);
        })
    }, [socket]);

    const sendMessage = () => {
        if(message && message != ""){
            socket.emit("message", message);
            setMessage("");
        } 
    }

    const sendMessageAnswers = () => {
        if(messageAnswers && messageAnswers != ""){
            socket.emit("messageAnswers", {message: messageAnswers.toLowerCase(), idRoom: idRoom});
            setMessageAnswers("");
        } 
    }

    return (
        <>
            <div className='chat'>
                <div className="chat__container chat__answers">
                    <div className="chat__box-title">
                        <span className="chat__title">Answers</span>
                    </div>
                    <ul className="chat__list">
                        {answers.map((item, i) => (
                            <>
                                <li className='chat__item' key={i}>
                                    { item.type == "wrong" ? (
                                        <>
                                            <i className="fa-solid fa-xmark chat__icon chat__icon--left"></i>
                                            <span className="chat__answers-text chat__answers-text--wrong">{item.message}</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-check chat__icon chat__icon--check"></i>
                                            <span className="chat__answers-text">{item.message}</span>
                                        </>
                                    ) }
                                </li>
                            </>
                        ))}  
                    </ul>
                    <div className="chat__box-input">
                        <i className="fa-solid fa-pen chat__icon chat__icon--edit"></i>
                        <input type="text" className='chat__input' placeholder='Answer Here...' value={messageAnswers} onChange={e => setMessageAnswers(e.target.value)} />
                        <button type="button" className="chat__button chat__button--answer" onClick={sendMessageAnswers}>
                            <i className="fa-regular fa-paper-plane chat__icon chat__icon--send"></i>
                        </button>
                    </div>
                </div>
                <div className="chat__container">
                    <div className="chat__box-title">
                        <span className="chat__title">Chat</span>
                    </div>
                    <ul className="chat__list">
                        {messageReceived.map((message, i) => (
                            <li className="chat__item" key={i}>
                                { message.type == "info" ? (
                                    <>
                                        <i className="fa-solid fa-circle-info chat__icon chat__icon--info" title={message.message}></i>
                                        <span className="chat__historic-text chat__historic-text--info">{message.message}</span>
                                    </>
                                ) : message.type == "left" ? (
                                    <>
                                        <i className="fa-regular fa-circle-xmark chat__icon chat__icon--left" title={message.message}></i>  
                                        <span className="chat__historic-text chat__historic-text--left">{message.message}</span>       
                                    </>  
                                ) : message.type == "welcome" ? (
                                    <>
                                        <i className="fa-regular fa-face-laugh-wink chat__icon" title={message.message}></i>  
                                        <span className="chat__historic-text">{message.message}</span>       
                                    </>  
                                ) : (
                                    <span className="chat__historic-text">{message.message}</span>
                                ) }
                            </li>
                        ))}                       
                    </ul>
                    <div className="chat__box-input">
                        <i className="fa-regular fa-comments chat__icon chat__icon--chat"></i>
                        <input type="text" className='chat__input' placeholder='Type in chat here...' value={message} onChange={e => setMessage(e.target.value)}/>
                        <button type="button" className="chat__button chat__button--historic" onClick={sendMessage}>
                            <i className="fa-solid fa-comment-dots chat__icon chat__icon--send"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}