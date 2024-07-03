import React from "react"

export const iconRoom = ({ type }) => {
    switch(type.toLowerCase()){
        case "foods":
            return <i className="fa-solid fa-utensils welcome__icon"></i>
        case "general":
            return <i className="fa-solid fa-wrench welcome__icon"></i>
        case "objects":
            return <i className="fa-solid fa-circle welcome__icon"></i>
        default:
            return;
    }
}