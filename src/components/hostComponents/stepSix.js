import React, { useEffect, useState } from 'react';
import UnitTypeCard from './cards/unitTypeCard';
import Style from 'style-it';
import { minWidth } from '@mui/system';
import PlaceTypeCard from './cards/placeType';
import CottageIcon from '@mui/icons-material/Cottage';
import countriesAPI from '../../axios config/Api';
import axios from 'axios';
import { unitReducer } from '../../store/reducers/unit';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from '../../store/actions/unit';

const StepSix = () => {

    const dispatch = useDispatch()
    let unite = useSelector(state => state.unit)

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [token, setToken] = useState('')

    const [location, setLocation] = useState({
        country: unite.location.country,
        state: unite.location.state,
        city: unite.location.city
    })
    // const [country, setCountry] = useState('')
    // const [state, setState] = useState('')
    // const [city, setCity] = useState('')



    let conf = {
        headers: {
            "Accept": "application/json",
            "api-token": "XcyX62aHpNkMh9mcWOlIBMmwcUNXg01RnVotgNzcfkwZw6s0-RP_7ESNUATUPlSdZxA",
            "user-email": "sarraree5@gmail.com",
        }
    }

    var config = {
        headers: {
            "Accept": "application/json",
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzYXJyYXJlZTVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiWGN5WDYyYUhwTmtNaDltY1dPbElCTW13Y1VOWGcwMVJuVm90Z056Y2Zrd1p3NnMwLVJQXzdFU05VQVRVUGxTZFp4QSJ9LCJleHAiOjE2NzE1MDQ3MTB9.KQjqZNCaA6EdfEdchUpVjU2fx2iibSdAnHTnSa6HHCs'
            'Authorization': `Bearer ${token}`
        }
    }
    useEffect(() => {
        countriesAPI.get("/getaccesstoken", conf).then((res) => {
            // console.log(res.data.auth_token);
            setToken(res.data.auth_token)

        }).catch((err) => {
            console.log(err);
        })

        if (token) {
            countriesAPI.get("/countries/", config).then((res) => {
                // console.log(res.data);
                setCountries(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }

        dispatch(unit({ location: location }))
        console.log(unite);

    }, [token, location]);

    function getStates() {
        countriesAPI.get(`/states/${location.country}`, config).then((res) => {
            setStates(res.data)
        }).catch((err) => {
            console.log(err);
        })

    }


    function getCities() {

        countriesAPI.get(`cities/${location.state}`, config).then((res) => {
            setCities(res.data)
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <div className=' my-4  p3  d-flex justify-content-center '>

            <div className='p-3 ' style={{ maxWidth: '600px', minWidth: '300px' }}>
                <div className="mb-4">
                    <h2 className='' style={{ maxWidth: '550px' }}>Where's your place located?</h2>
                    <p className="text-secondary" style={{ fontSize: '18px' }}>Your address is only shared with guests after they’ve made a reservation.</p>
                </div >

                <div className='row mb-3' >
                    <h5 className="text-secondary" style={{ fontSize: '16px' }}>Country :</h5>

                    <select className='form-control' onChange={(e) => { setLocation({ ...location, country: e.target.value }) }}>
                        {location.country ? <option selected >{location.country}</option> : <option disabled selected >Choose the country</option>}
                        {countries.map((c, index) => {
                            return <option key={index}>{c.country_name}</option>
                            // <option key={index}>{c.country_name}</option>
                        })
                        }
                    </select>
                </div >
                <div className='row mb-3' >
                    <h5 className="text-secondary" style={{ fontSize: '16px' }}>State :</h5>

                    <select className='form-control' onChange={(e) => { setLocation({ ...location, state: e.target.value }) }} onClick={() => { getStates() }}>
                        {location.state ? <option selected >{location.state}</option> : <option disabled selected >Choose the state</option>}
                        {states.map((s, index) => {
                            return <option key={index}>{s.state_name}</option>
                        })
                        }
                    </select>
                </div >
                <div className='row' >
                    <h5 className="text-secondary" style={{ fontSize: '16px' }}>City :</h5>

                    <select className='form-control' defaultValue={unite.cat} onChange={(e) => { setLocation({ ...location, city: e.target.value }) }} onClick={() => { getCities() }} >
                        {location.city ? <option selected >{location.city}</option> : <option disabled selected >Choose the city</option>}
                        {cities.map((c, index) => {
                            return <option key={index}>{c.city_name}</option>
                        })
                        }
                    </select>
                </div >
            </div>
        </div >



    );
}

export default StepSix;
