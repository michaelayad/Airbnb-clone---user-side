import { Divider, Paper, Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { format } from 'date-fns';
import React from 'react';
import countriesAPI from '../../axios config/Api';

const OpenedSearchBar = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: grey[300],
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const [countries, setCountries] = React.useState([])

    const [token, setToken] = React.useState('')

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
    React.useEffect(() => {
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
    }, [token]);


    return (
        <div>
            <Stack
                className='w-75%'
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={0}
                sx={{
                    borderRadius: '99px',
                    backgroundColor: grey[300],
                    // width:"1000px",
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Item className={` ${(!props.showDateRange && !props.showGuestsInput) ? 'flex flex-col start rounded-pill bg-white' : 'flex flex-col start rounded-pill'}`} style={{ width: "50%" }}
                    onClick={() => { props.setShowDateRange(false); props.setShowGuestsInput(false) }}
                >
                    <span className='text-start ps-1 text-dark'>Where</span>
                    {/* <input type="text" className='border-0 ring-0 focus:ring-0 rounded-pill bg-light' value={country} placeholder='search countries' onChange={handleChange} /> */}
                    <select className='border-0 ring-0 focus:ring-0 rounded-pill bg-light' onChange={(e) => { props.setCountry(e.target.value) }}>
                        {props.country ? <option selected >{props.country}</option> : <option disabled selected >Choose the country</option>}
                        {countries.map((c, index) => {
                            return <option key={index}>{c.country_name}</option>
                            // <option key={index}>{c.country_name}</option>
                        })
                        }
                    </select>
                </Item>
                <Item className={`${props.showDateRange ? 'flex flex-col bg-white' : 'flex flex-col'}`}
                    onClick={() => { props.setShowDateRange(true); props.setShowGuestsInput(false) }}
                >
                    <span className='text-start text-dark'>Check in</span>
                    <span className='mt-2'>{`${props.startDate ? `${format(props.startDate, "dd-MM")}` : "Add dates"}`}</span>
                </Item>
                <Item className={`${props.showDateRange ? 'flex flex-col bg-white' : 'flex flex-col'}`}
                    onClick={() => { props.setShowDateRange(true); props.setShowGuestsInput(false) }}>
                    <span className='text-start text-dark'>Check out</span>
                    <span className='mt-2'>{`${props.endDate ? `${format(props.endDate, "dd-MM")}` : "Add dates"}`}</span>
                </Item>
                <Item className={`${props.showGuestsInput ? 'flex justify-between rounded-pill bg-white' : 'flex justify-between rounded-pill'}`}
                    onClick={() => { props.setShowGuestsInput(true); props.setShowDateRange(false); }}
                >
                    <div className='flex flex-col justify-start'>
                        <span className='text-start text-dark'>Who</span>
                        <span className='mt-2 text-start'>{`${(props.numberOfAdults || props.numberOfChildren) ? `${props.numberOfAdults + props.numberOfChildren} guests` : "Add guests"}`}</span>
                    </div>
                    <button className='mx-3 rounded-pill px-3 text-white' style={{ "backgroundColor": "#e31c5e" }}
                        onClick={props.handleSearchSubmit}
                    >
                        Search
                    </button>
                </Item>
            </Stack>
        </div>
    );
}

export default OpenedSearchBar;
