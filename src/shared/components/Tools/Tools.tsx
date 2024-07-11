import React, { useContext, useState } from 'react'
import { SketchPicker } from "react-color";
import "../../../styles/tools.modules.scss";
import { ITools } from "../Types/Tools"
import { InputRange } from "../../forms"
import { SocketContext } from '../../hooks/context/socket';
import { useNavigate } from 'react-router-dom';

const Tools: React.FC<ITools> = ({ settings, editor }) => {
    const { color, setColor, lineWidth, setLineWidth, setClearBoard, eraser, setEraser } = settings;
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    const classEditor = !editor ? "tools__button tools__button--disabled" : "tools__button";
    const classEraser = eraser ? "tools__button--active" : "";
    const classButtonEraser = !editor ? `tools__button tools__button--disabled ${classEraser}` : `tools__button ${classEraser}`;

    const logout = () => {
        socket.disconnect();
        navigate("/");
    }

    return (
        <>
            <div className="tools" data-open={open}>
                <div className="tools__container">
                    <div className="tools__icons-board">
                        <button type="button" className={classEditor} disabled={!editor ? true : false } onClick={() => setClearBoard?.(true)}>
                            Clean
                            <i className="fa-solid fa-broom tools__icon"></i>
                        </button>

                        <button type="button" className={classEditor} disabled={!editor ? true : false } onClick={() => setPickerOpen(!pickerOpen)}>
                            Pick Color
                            <i className="fa-solid fa-palette tools__icon"></i>
                            { pickerOpen ? <div className='tools__color-palette'>
                                <div className='tools__color-palette-cover' onClick={() => setPickerOpen(false) }/>
                                <SketchPicker color={color} onChange={e => setColor?.(e.hex)} />
                            </div> : null }
                        </button>

                        <InputRange lineWidth={lineWidth} setLineWidth={setLineWidth} editor={editor} />

                        <button type="button" className={classButtonEraser} disabled={!editor ? true : false } onClick={() => setEraser?.(!eraser)}>
                            Eraser
                            <i className="fa-solid fa-eraser tools__icon"></i>
                        </button>

                        <button className='tools__button tools__button--close' onClick={() => setOpen(false)}>
                            <i className="fa-solid fa-circle-xmark "></i>
                        </button>
                    </div>
                    <div className='tools__icons-actions'>
                        <button type="button" className="tools__button" onClick={logout}>
                            Disconnect
                            <i className="fa-solid fa-right-from-bracket tools__icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <button className='tools__button tools__button--settings' onClick={() => setOpen(true)}>
                <i className="fa-solid fa-sliders"></i>
            </button>
        </>
    )
}

export { Tools }