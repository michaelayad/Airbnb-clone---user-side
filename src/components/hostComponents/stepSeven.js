import React, { useEffect, useState } from 'react';
import UnitTypeCard from './cards/unitTypeCard';
import { minWidth } from '@mui/system';
import PlaceTypeCard from './cards/placeType';
import CottageIcon from '@mui/icons-material/Cottage';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';
import { addDays, format } from 'date-fns';

const StepSeven = () => {
    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)

    const [price, setPrice] = useState(unite.pricePerNight ? unite.pricePerNight : 30)
    const [date, setData] = useState({
        start: unite.date.start,
        end: unite.date.end,

    })
    console.log(price);



    useEffect(() => {


        dispatch(unit({ pricePerNight: price, date: date }))
        console.log(unite);

    }, [price, date]);

    return (
        <div className=' my-4  p3  d-flex justify-content-center '>
            <div className='p-3 ' style={{ maxWidth: '600px', minWidth: '300px' }}>
                <div className="mb-3">
                    <h2 className='' style={{ maxWidth: '550px' }}>Now, set your price</h2>
                    <p className="text-secondary" style={{ fontSize: '18px' }}>You can change it anytime</p>
                </div >
                <div className='row  rounded-2 d-flex justify-content-center align-content-center mt-4 mx-0' style={{ backgroundColor: '#f8fafc', width: '95%', height: '265px', border: '2px lightgray solid' }} >
                    <div className='d-flex justify-content-evenly '>
                        <button className='mt-1 rounded-circle border border-secondary ' onClick={() => { setPrice(price - 5) }} style={{ width: "43px", fontSize: '22px', height: "43px", }}>-</button>
                        <input className=' border border-secondary rounded-2 text-center ' readOnly value={'$' + price} min="10" style={{ width: '63%', height: '70px', fontSize: '20px', fontWeight: "bold" }} />
                        <button className='mt-1 rounded-circle border border-secondary p-0 ' onClick={() => { setPrice(price + 5) }} style={{ width: "43px", fontSize: '22px', height: "43px", }}>+</button>
                    </div>
                    <p className='co1-12 text-center pt-2'>per night</p>
                    <p className=' text-center pt-3 font-medium' style={{ width: "58%" }}>Places like yours in your area usually range from $23 to $38s</p>

                </div>
                <h2 className='mt-4 ' style={{ maxWidth: '550px' }}>Reservation availability</h2>
                <div className='py-2 mb-5 ' style={{ maxWidth: '600px', minWidth: '300px' }}>
                    <div className="my-1 ">
                        <p className="m-0 py-1" style={{ fontSize: '22px' }}>From</p>
                        <input type='date' className=' border border-secondary form-control ' style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} value={date.start} onChange={(e) => { setData({ ...date, start: format(new Date(e.target.value), "MM/dd/yyyy") }) }} />
                    </div>
                    <div className="my-3 ">
                        <p className="my-0 py-1" style={{ fontSize: '22px' }}>To</p>
                        <input type='date' className=' border border-secondary form-control ' style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} value={date.end} onChange={(e) => { setData({ ...date, end: format(new Date(e.target.value), "MM/dd/yyyy") }) }} />
                    </div>
                </div>
            </div >

        </div >

    );
}

export default StepSeven;
