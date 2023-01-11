import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';

const StepEight = () => {

    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)
    let user = useSelector(state => state.user)



    const [guests, setGuests] = useState(unite.guestsNumber ? unite.guestsNumber : 2)
    const [bedrooms, setBedrooms] = useState(unite.bedrooms ? unite.bedrooms : 2)
    const [beds, setBeds] = useState(unite.beds ? unite.beds : 2)
    const [bathrooms, setBathrooms] = useState(unite.bathrooms ? unite.bathrooms : 2)
    const [lang, setLang] = useState(unite.hostLang)

    useEffect(() => {


        dispatch(unit({ guestsNumber: guests, bedrooms: bedrooms, beds: beds, hostLang: lang, bathrooms: bathrooms, host: user._id }))
        console.log(unite);

    }, [guests, bedrooms, beds, bathrooms, lang]);



    return (

        <div className=' mt-4 mb-5 p3 pb-4  d-flex justify-content-center '>
            <div className='p-3 ' style={{ width: '650px', }}>
                <div className="mb-3">
                    <h2 className='' style={{ maxWidth: '640px', fontSize: '38px' }}>Share some basics about your place</h2>
                    <p className="text-secondary" style={{ fontSize: '21px' }}>You'll add more details later, like bed types.</p>
                </div >
                <div className=' mt-5 ' style={{ maxWidth: '640px', minWidth: '300px' }}>
                    <div className=' my-4 border-b-2'>
                        <div className='my-3 d-flex justify-content-between my-2'  >
                            <p className="text-center pt-2" style={{ fontSize: '22px' }} > Guests</p>
                            <div>
                                {guests > 1 ? <button className='mt-1 rounded-circle border border-secondary  ' onClick={() => { setGuests(guests - 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>-</button> : <></>}
                                <span className=' mx-3 text-secondary ' min="10" style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} >{guests}</span>
                                <button className='mt-1 rounded-circle border border-secondary p-0 ' onClick={() => { setGuests(guests + 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>+</button>
                            </div>
                        </div>
                    </div >
                    <div className=' my-4 border-b-2'>
                        <div className='my-3 d-flex justify-content-between my-2'  >
                            <p className="text-center pt-2" style={{ fontSize: '22px' }} >Bedrooms</p>
                            <div>
                                {bedrooms > 0 ? <button className='mt-1 rounded-circle border border-secondary ' onClick={() => { setBedrooms(bedrooms - 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>-</button> : <></>}
                                <span className=' mx-3 text-secondary ' min="10" style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} >{bedrooms}</span>
                                <button className='mt-1 rounded-circle border border-secondary p-0 ' onClick={() => { setBedrooms(bedrooms + 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className=' my-4 border-b-2'>
                        <div className='my-3 d-flex justify-content-between my-2'  >
                            <p className="text-center pt-2" style={{ fontSize: '22px' }} >Beds</p>
                            <div>
                                {beds > 1 ? <button className='mt-1 rounded-circle border border-secondary ' onClick={() => { setBeds(beds - 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>-</button> : <></>}
                                <span className=' mx-3 text-secondary ' min="10" style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} >{beds}</span>
                                <button className='mt-1 rounded-circle border border-secondary p-0 ' onClick={() => { setBeds(beds + 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className=' my-4 border-b-2'>
                        <div className='my-3 d-flex justify-content-between my-2'  >
                            <hp className="text-center pt-2" style={{ fontSize: '22px' }} >Bathrooms</hp>
                            <div>
                                {bathrooms > 1 ? <button className='mt-1 rounded-circle border border-secondary ' onClick={() => { setBathrooms(bathrooms - 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>-</button> : <></>}
                                <span className=' mx-3 text-secondary ' readOnly value={5} min="10" style={{ width: '', height: '', fontSize: '', fontWeight: "bold" }} >{bathrooms}</span>
                                <button className='mt-1 rounded-circle border border-secondary p-0 ' onClick={() => { setBathrooms(bathrooms + 1) }} style={{ width: "38px", fontSize: '22px', height: "38px", }}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-5' >
                        <h4 className="pb-3" style={{ fontSize: '' }}>Language to deal with clients</h4>

                        <select required className='form-control' defaultValue={lang} onChange={(e) => { setLang(e.target.value) }}>
                            <option disabled selected >Choose Language</option>
                            <option>English</option>
                            <option >Arabic</option>
                            <option >Spanish</option>
                            <option >French</option>

                        </select>
                    </div >
                </div>
            </div>
        </div >

    );
}

export default StepEight;
