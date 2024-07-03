import React, { useContext, useEffect, useState } from 'react'
import { SketchPicker } from "react-color";
import "../../../styles/tools.modules.scss";
import { ITools } from "../Types/Tools"
import { InputRange } from "../../forms"
import { SocketContext } from '../../hooks/context/socket';
import { useNavigate } from 'react-router-dom';

const Tools: React.FC<ITools> = ({ settings, editor }) => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    const logout = () => {
        socket.disconnect();
        navigate("/");
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    };

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    return (
        <>
            <div className="tools" data-open={open}>
                <div className="tools__container">
                    <div className="tools__icons-board">
                        <button type="button" className={!editor ? "tools__button tools__button--disabled" : "tools__button" } disabled={!editor ? true : false } onClick={() => settings.setClearBoard(true)}>
                            Clean
                            <i className="fa-solid fa-broom tools__icon"></i>
                        </button>

                        <button type="button" className={!editor ? "tools__button tools__button--disabled" : "tools__button" } disabled={!editor ? true : false } onClick={() => setPickerOpen(!pickerOpen)}>
                            Pick Color
                            <i className="fa-solid fa-palette tools__icon"></i>
                            { pickerOpen ? <div style={ popover }>
                                <div style={ cover } onClick={() => setPickerOpen(false) }/>
                                <SketchPicker color={settings.color} onChange={e => settings.setColor(e.hex)} />
                            </div> : null }
                        </button>

                        <InputRange lineWidth={settings.lineWidth} setLineWidth={settings.setLineWidth} editor={editor} />

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