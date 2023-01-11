import React, { useEffect, useState } from 'react';
import UnitTypeCard from './cards/unitTypeCard';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';
import { useRef } from 'react';


const StepOne = () => {

    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)

    const [isActive, setIsActive] = useState("border border-dark border-2");
    const [selectedType, setSelectedType] = useState(unite.unitType)
    let ref = useRef()


    function handleInputChange(title) {

        if (selectedType === title) {
            setSelectedType("")
            setIsActive(current => !current);
        } else {
            setSelectedType(title)
        }
    }

    useEffect(() => {
        dispatch(unit({ unitType: selectedType }))
    }, [selectedType]);


    return (
        <div className=' my-4  p3  d-flex justify-content-center '>
            <div className=' ' style={{ maxWidth: '700px' }}>
                <div className='mb-5 p-3 '  >
                    <h2 className='mb-5 ' style={{ maxWidth: '550px' }}>Which of these best describes your place?</h2>
                    <div className=' row' id='' >
                        <span className={`p-0 }`} style={{ width: "fit-content" }} onClick={(e) => { handleInputChange('House') }}>
                            <UnitTypeCard id="id" title="House" icon="bi bi-house-door " selectedType={selectedType} />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange('Apartment') }}>
                            <UnitTypeCard title="Apartment" icon="bi bi-building" selectedType={selectedType} />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange('Hotel') }}>
                            <UnitTypeCard title="Hotel" icon="bi bi-buildings" selectedType={selectedType} />
                        </span>
                    </div >
                </div>


            </div>
        </div>
    );
}

export default StepOne;
