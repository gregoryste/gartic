import React from "react"

export const iconRoom = ({ type }) => {
    switch(type.toLowerCase()){
        case "food":
            return <i className="fa-solid fa-utensils welcome__icon"></i>
        case "technology":
            return <i className="fa-solid fa-gears welcome__icon"></i>
        case "animals":
            return <i className="fa-solid fa-hippo welcome__icon"></i>
        case "nature":
            return <i className="fa-solid fa-leaf welcome__icon"></i>
        case "movies":
            return <i className="fa-solid fa-film welcome__icon"></i>
        default:
            return;
    }
}