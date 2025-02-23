import React, { useContext, useEffect, useState } from 'react'
import { Default } from "../../shared/layouts";
import { Ranking, Chat, Tools, Board, Popup } from "../../shared/components";
import { SocketContext } from '../../shared/hooks/context/socket';

export const Panel = () => {
    const socket = useContext(SocketContext);
    const [color, setColor] = useState("#37d67a");
    const [user, setUser] = useState([]);
    const [lineWidth, setLineWidth] = useState(5);
    const [clearBoard, setClearBoard] = useState(false);
    const [eraser, setEraser] = useState(false);
    const [popup, setPopup] = useState(false);
    const [word, setWord] = useState("");
    const [isPlayer, setIsPlayer] = useState(false);

    useEffect(() => {
        socket.on("gameStarts", message => {
            // alert(message);
        })

        socket.on("user", data => {
            setUser(data);
        })

        socket.on("word-selected", data => {
            setPopup(true);
            console.log(data)
            setWord(data.word);
            if(data.isPlayer == true){
                setIsPlayer(true);
            }
        })

    }, [socket])

    const settings = {
        color,
        setColor,
        lineWidth,
        setLineWidth,
        clearBoard,
        setClearBoard,
        eraser,
        setEraser,
        popup,
        setPopup,
        word
    }

    return (
        <Default>
            <Popup popup={popup} setPopup={setPopup} editor={user.editor} word={word} isPlayer={isPlayer}/>
            <Tools settings={settings} editor={user.editor}/> 
            <div className="panel">
                <Ranking />
                <Board color={settings.color} size={settings.lineWidth} clear={settings.clearBoard} setClear={settings.setClearBoard} eraser={settings.eraser} editor={user.editor}></Board>
                <Chat />
            </div>
        </Default>
    )
}