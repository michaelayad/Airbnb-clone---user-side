import { PropaneSharp } from '@mui/icons-material';
import React, { useState } from 'react';
import { useRef } from 'react';
import './unitType.css'

const PlaceTypeCard = (props) => {


    const [isActive, setIsActive] = useState(false);


    const hover = useHover({ margin: '-1.5px', border: "1px solid black", maxWidth: "600px", minWidth: "150px", height: "90", padding: "0", borderRadius: "10px", userSelect: "none" }, { maxWidth: "600px", minWidth: "150px", padding: "0", borderRadius: "10px" })
    function useHover(styleOnHover, styleOnNotHover = {}) {
        const [style, setStyle] = React.useState(styleOnNotHover);
        const onMouseEnter = () => setStyle(styleOnHover)
        const onMouseLeave = () => setStyle(styleOnNotHover)
        return { style, onMouseLeave, onMouseEnter }
    }

    let ref = useRef()
    function handleInputChange(ev) {
        setIsActive(current => !current)
        const l = document.getElementsByClassName('card')
        for (let e of l) {
            console.log(e);
            e.className = "card rounded-lg m-2  py-1"
        }

        (!ref.current.classList.contains(`border-dark`)) ? ref.current.className = 'card rounded-lg m-2  py-1 border border-dark border-2' : ref.current.className = 'card rounded-lg m-2  py-1'
    }



    return (

        <div ref={ref} className={`card rounded-lg m-2 py-1`}  {...hover} id={props.id} onClick={() => { handleInputChange('entire place') }}>
            < div className="card-body justify-content-center d-flex justify-content-between" >
                <div className='' style={{ width: '90%' }}>
                    <h5 className="mb-0 font-weight-bold">{props.title}</h5>
                    <small className="mb-0 font-weight-bold text-secondary">{props.desc}</small>
                </div>
                <p className=" mb-0 pt-2" style={{ width: '7%' }}><i className={props.icon} style={{ fontSize: "30px", marginBottom: "5px" }}></i></p>
            </div>
        </div >
    )



}

export default PlaceTypeCard;
