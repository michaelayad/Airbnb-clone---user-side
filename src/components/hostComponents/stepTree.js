
import React, { useEffect, useState } from 'react';
import UnitTypeCard from './cards/unitTypeCard';
import Style from 'style-it';
import { minWidth } from '@mui/system';
import PlaceTypeCard from './cards/placeType';
import CottageIcon from '@mui/icons-material/Cottage';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';
import Advantage from './cards/advantage';

const StepThree = () => {
    let unite = useSelector(state => state.unit)
    const dispatch = useDispatch()

    const [selectedType, setSelectedType] = useState(unite.advantages)



    function handleInputChange(title, icon) {
        var adv = { title: title, icon: icon }
        var bool = selectedType.find(e => e.title === adv.title)
        if (!bool) {
            setSelectedType([...selectedType, adv])
        } else {
            let filteredArray = selectedType.filter(e => {
                return e.title !== adv.title
            })
            setSelectedType(filteredArray)
        }
    }
    useEffect(() => {
        dispatch(unit({ advantages: selectedType }))
        console.log(unite);

    }, [selectedType]);


    return (
        <div className=' my-4  p3  d-flex justify-content-center '>
            <div className=' ' style={{ maxWidth: '700px' }}>


                <div className='mb-5 p-3 '  >
                    <h2 className='mb-3 ' style={{ maxWidth: '550px' }}>Which of these best describes your place?</h2>
                    <div className=' row' >
                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange('Wifi', 'bi bi-wifi') }}>
                            <Advantage title="Wifi" icon="bi bi-wifi" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("TV", "bi bi-tv") }}>
                            <Advantage title="TV" icon="bi bi-tv" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("Kitchen", "fa-solid fa-kitchen-set") }}>
                            <Advantage title="Kitchen" icon="fa-solid fa-kitchen-set" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("Washer", "bi bi-train-lightrail-front") }}>
                            <Advantage title="Washer" icon="bi bi-train-lightrail-front" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("Free parking", "bi bi-truck-front") }}>
                            <Advantage title="Free parking" icon="bi bi-truck-front" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("Paid parking", "bi bi-cash-coin") }}>
                            <Advantage title="Paid parking" icon="bi bi-cash-coin" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange("Air conditioning", "bi bi-snow") }}>
                            <Advantage title="Air conditioning" icon="bi bi-snow" />
                        </span>

                        <span className='p-0' style={{ width: "fit-content" }} onClick={() => { handleInputChange('Dedicated workspace', 'bi bi-person-workspace') }}>
                            <Advantage title="Dedicated workspace" icon="bi bi-person-workspace" />
                        </span>
                    </div >
                </div>


            </div>
        </div>
    );
}

export default StepThree;
