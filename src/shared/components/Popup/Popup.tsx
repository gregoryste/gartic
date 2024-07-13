import React from 'react'
import "../../../styles/popup.modules.scss";

export const Popup = (props) => {
    const { popup, setPopup, editor, word } = props;
    const message = !editor ? "Guess What" : "Draw this word";

    const closePopup = () => {
        setPopup(false);
        console.log(popup)
    }

    return (
        <div className={popup ? "popup" : "popup popup--hide"}>
            <div className="popup__container">
                <span className="popup__text">{ message }</span>
                <div className="popup__content-word">
                    {word.split("").map((letter, i) => (
                        <span key={i} className="popup__text popup__text--letter">{ editor ? letter : "" }</span>
                    ))}
                </div>
                <div onClick={closePopup}>
                    <i className="fa-solid fa-circle-xmark popup__close"></i>
                </div>
            </div>

        </div>
    )
}