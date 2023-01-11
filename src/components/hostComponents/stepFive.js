import React, { useEffect, useState } from 'react';
import UnitTypeCard from './cards/unitTypeCard';
import Style from 'style-it';
import { minWidth } from '@mui/system';
import PlaceTypeCard from './cards/placeType';
import CottageIcon from '@mui/icons-material/Cottage';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';
import { cleanup } from '@testing-library/react';
import { useSelect } from '@mui/base';

const StepFive = () => {

    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)

    const [title, setTitle] = useState(unite.title)
    const [desc, setDesc] = useState(unite.description)
    const [cat, setCat] = useState(unite.catName)

    useEffect(() => {


        dispatch(unit({ title: title, description: desc, catName: cat }))
        console.log(unite);

    }, [title, desc, cat]);


    return (
        <div className=' mt-4 mb-5 p3 pb-4  d-flex justify-content-center '>
            <div className='p-3 ' style={{ maxWidth: '600px', minWidth: '300px' }}>
                <div className="mb-3">
                    <h4 className='' style={{ maxWidth: '550px' }}>Now, let's give your property a title and description</h4>
                    <p className="text-secondary" style={{ fontSize: '16px' }}>Short titles work best. Have fun with it—you can always change it later.</p>
                </div >
                <div className='row  mb-3' >
                    <h5 className="text-secondary">Title :</h5>
                    <textarea className='borer rounded-3 border-secondary' value={title} onChange={(e) => { setTitle(e.target.value) }} id="w3review" rows="6" cols="10" style={{ maxWidth: '550px', height: "150px" }} ></textarea>
                </div >
                <div className='row mb-3' >
                    <h5 className="text-secondary" style={{ fontSize: '16px' }}>Share what makes your place special :</h5>
                    <textarea className='borer rounded-3 border-secondary' value={desc} onChange={(e) => { setDesc(e.target.value) }} id="w3review" rows="6" cols="10" style={{ maxWidth: '550px', height: "150px" }} ></textarea>
                </div >
                <div className='row' >
                    <h5 className="text-secondary" style={{ fontSize: '16px' }}>Category :</h5>

                    <select required className='form-control' defaultValue={cat} onChange={(e) => { setCat(e.target.value) }}>
                        <option disabled selected >Choose the category</option>
                        <option >New</option>
                        <option >Amazing views</option>
                        <option >Top of the world</option>

                    </select>
                </div >
            </div>
        </div>
    );
}

export default StepFive;
