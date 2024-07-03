import { v4 as uuidv4 } from 'uuid';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/welcome.modules.scss";
import { Default, Home } from "../../shared/layouts";
import { iconRoom } from '../../shared/components';
import { SocketContext } from '../../shared/hooks/context/socket';

export const Welcome = () => {    
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [nick, setNick] = useState("");    
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [typeRoom, setTypeRoom] = useState("Objects");
    const typesRooms = ["Objects", "Foods", "General"];

    useEffect(() => {
        if(!socket.connected){
            socket.connect();
        }

        socket.emit("getRoomTypes");
    }, []);

    useEffect(() => {
        socket.on("roomTypes", data => {
            setRooms(data);
        })
    }, [socket])

    socket.on("roomTypes", data => {
        setRooms(data);
    })

    const createRoom = async () => {
        if(nick.trim() == ""){
            setError("Field is required!");
            return;
        }

        let idRoom = uuidv4();
        let created = true;

        if (socket){
            await socket.emit("joinRoom", { nick, idRoom, typeRoom, created })
            navigate(`/${idRoom}`);
        }
    }

    const joinRoom = async (data) => {
        if(nick.trim() == ""){
            setError("Field is required!");
            return;
        }

        let idRoom = data.room;
        let typeRoom = data.type;
        let created = false;

        if (socket){
            await socket.emit("joinRoom", { nick, idRoom, typeRoom, created })
            navigate(`/${idRoom}`);
        }

    }

    const changeTypeRoom = (value) => {
        setTypeRoom(value);
    }
    
    return (
        <Home>
            <div className="welcome">
                <div className="welcome__box-brand">
                    <img src="https://gartic.com.br/imgs/v3/logoHome2x.png?v=1" className='welcome__brand' alt="Gartic" />
                </div>
                <div className="welcome__header">
                    <div className={`welcome__box-input ${error != "" ? "error" : ""}`}>
                        <i className="fa-solid fa-circle-user welcome__icon"></i>
                        <input type="text" name="nick" id="" className='welcome__input' placeholder='Nick' onChange={e => {setNick(e.target.value); setError("")}}/>
                    </div>
                    { error != "" ? (
                        <span className="welcome__error">{error}</span>
                    ) : ""}
                    <div className="welcome__box-input">
                        <i className="fa-solid fa-list welcome__icon"></i>
                        <select onChange={(event) => changeTypeRoom(event.target.value)} value={typeRoom}
                        className='welcome__input'>
                            {typesRooms.map((type, i) => (
                                <option value={type.toLowerCase()} key={i}>{type}</option>
                            ))}       
                        </select>
                    </div>
                    <div className="welcome__box-input">
                        <i className="fa-solid fa-magnifying-glass welcome__icon"></i>
                        <input
                            type="text"
                            name="search"
                            className="welcome__input"
                            placeholder="Search Room..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className='welcome__rooms-container'>
                    {rooms.length > 0
                        ? (
                            <ul className="welcome__rooms">
                                {rooms.filter(item => {
                                    return search.toLowerCase() === "" ? item : item.type.toLowerCase().includes(search)
                                }).map((room, i) => (
                                    <li className="welcome__item-room" key={i} onClick={() => joinRoom(room)} title='Join Room'>
                                        {iconRoom({type: room.type})}
                                        <span className='welcome__item-type'>{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</span>
                                        <span className='welcome__item-quantity'>{room.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        )
                        : (
                            <span className='welcome__rooms-message'>Nenhuma sala encontrada.</span>
                        )}
                </div>

                <div className="welcome__actions">
                    <button type='button' className='welcome__button welcome__button--secondary' onClick={createRoom}>Create Room</button>
                </div>
            </div>
        </Home>
    )
}