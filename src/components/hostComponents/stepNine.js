import { Publish } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios config/axiosInstance';
import { unit } from '../../store/actions/unit';

const StepNine = () => {


    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)


    const history = useHistory()
    const token = localStorage.getItem('token')
    let config = {

        headers: {
            'Authorization': token
        }
    }
    function Publish() {

        axiosInstance.post(`/tempUnits`, unite, config).then((res) => {
            console.log(res);
            if (res.status === 201) {
                alert('Thank You. It takes from 3 to 5 days to publish your property ')
                history.push('/')
                dispatch(unit({
                    title: "", description: "", catName: null, location: { country: "", state: "", city: "" }, unitType: "",
                    placeType: "", advantages: [], date: { start: null, end: null }, pricePerNight: null, guestsNumber: "", host: null, hostLang: null,
                    bedrooms: "", bathrooms: "", beds: "", images: []
                }))
                console.log(unite);

            } else {
                alert('Error ocurred. Make sure you entered all required date and t ry again')
            }

        }).catch((err) => {
            alert('Error ocurred. Make sure you entered all required date and t ry again')
        })
    }

    return (
        <div className=' my-4  py  d-flex justify-content-center '>
            <div className='p-3 ' style={{ maxWidth: '700px', minWidth: '300px' }}>
                <h1 className='mb-5 pb-5 ' style={{ maxWidth: '550px' }}>Finish up and publish</h1>
                <h3 className="text-secondary" style={{ fontSize: '' }}>Yay! It’s time to publish ..</h3>
                <h3 className="text-secondary" style={{ fontSize: '' }}>Before you publish, make sure to review the details.</h3>
                <button className='btn btn-success my-4 p-2 px-5' onClick={() => { Publish() }}>PUBLISH</button>
                <div className='row' >

                </div >

            </div>
        </div>
    );
}

export default StepNine;
