import React, { useState } from 'react';
import './unitType.css'
import { useRef } from 'react';
import { selectClasses } from '@mui/material';


const Advantage = (props) => {

    const [isActive, setIsActive] = useState(false);
    const hover = useHover({ margin: '-1.5px', border: "1px solid black", width: "190px", padding: "0", borderRadius: "10px", userSelect: "none" }, { width: "190px", padding: "0", borderRadius: "10px" })

    function useHover(styleOnHover, styleOnNotHover = {}) {
        const [style, setStyle] = React.useState(styleOnNotHover);
        const onMouseEnter = () => setStyle(styleOnHover)
        const onMouseLeave = () => setStyle(styleOnNotHover)
        return { style, onMouseLeave, onMouseEnter }
    }
    let ref = useRef()

    function handleInputChange() {
        setIsActive(current => !current);
    }


    return (

        <div ref={ref} className={`card rounded-lg m-2 py-1  ${isActive ? "border border-dark border-2" : ""}`} id={props.title}  {...hover} onClick={(e) => {
            handleInputChange(e)
        }}
        >
            < div className="card-body justify-content-center" style={{ height: '' }} >
                <p className=" mb-0 align-content-center" style={{ height: "35px" }}><i className={props.icon} style={{ fontSize: "30px", marginBottom: "5px", height: "30px" }}></i></p>
                <p className="mb-0 font-weight-bold">{props.title}</p>
            </div>
        </div >
    )



}

export default Advantage;
