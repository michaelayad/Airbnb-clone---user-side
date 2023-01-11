import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { filterContext } from '../../contexts/filtersModel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './filters.css'
import { Checkbox, Divider, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../axios config/axiosInstance';
import { GetUnits } from '../../store/actions/getUnits';
import { getHomeURL } from '../../store/actions/homePageURL';


const Filters = () => {
    function valuetext(value) {
        return `${value}£`;
    }

    const minDistance = 1;

    const [value, setValue] = React.useState([8, 840]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    const [placeType, setPlaceType] = useState([])
    const [essentials, setEssentials] = useState([])
    const [hostLangs, setHostLangs] = useState([])
    const [rooms, setRooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [beds, setBeds] = useState(0)
    const [queryStr, setQueryStr] = useState('')

    const defaultHostlangs = ['English', 'Arabic', 'Spanish', 'French']
    const defaultPlaceTypes = ['Private room', 'Entire place', 'Shared room']
    const defaultEssentials = ['Kitchen', 'TV']
    useEffect(() => {
        setQueryStr(
            `EnglishUnit.placeType[in]=${placeType.length >= 1 ? placeType.join('&EnglishUnit.placeType[in]=').toString() : defaultPlaceTypes.join('&EnglishUnit.placeType[in]=').toString()}${essentials.length > 1 ? `&EnglishUnit.advantages.title[all]=${essentials.join('&EnglishUnit.advantages.title[all]=').toString()}` : `&EnglishUnit.advantages.title[all]=${defaultEssentials.join('&EnglishUnit.advantages.title[all]=').toString()}`}&hostLang[in]=${hostLangs.length >= 1 ? hostLangs.join('&hostLang[in]=').toString() : defaultHostlangs.join('&hostLang[in]=').toString()}&pricePerNight[gte]=${value[0] * 8}&pricePerNight[lte]=${value[1] * 8}&rooms[gte]=${rooms}&bathrooms[gte]=${bathrooms}&beds[gte]=${beds}`)
    }, [placeType, essentials, hostLangs, value, rooms, bathrooms, beds, defaultPlaceTypes, defaultEssentials, defaultHostlangs]);

    const handlePlaceTypeChange = (event) => { event.target.checked ? setPlaceType([...placeType, event.target.value]) : setPlaceType(placeType.filter((place) => place !== event.target.value)) }
    const handleEssentialsChange = (event) => { event.target.checked ? setEssentials([...essentials, event.target.value]) : setEssentials(essentials.filter((place) => place !== event.target.value)) }
    const handleHostLangChange = (event) => { event.target.checked ? setHostLangs([...hostLangs, event.target.value]) : setHostLangs(hostLangs.filter((lang) => lang !== event.target.value)) }

    const { t, i18n } = useTranslation()

    const { showFilters, setShowFilters } = useContext(filterContext)
    const handleCloseFilters = () => setShowFilters(false)

    const handleRooms = (event) => {
        let [type, value] = event.target.value.split('-')
        if (value !== 'any') {
            switch (type) {
                case "rooms":
                    setRooms(value);
                    break;
                case "baths":
                    setBathrooms(value);
                    break;
                case "beds":
                    setBeds(value);
                    break;
                default: setRooms(0); setBathrooms(0); setBeds(0);
            }
        } else {
            setRooms(0); setBathrooms(0); setBeds(0);
        }
    }

    const dispatch = useDispatch()
    const lang = localStorage.getItem('lang');
    const filterUnits = (query, lang) => {
        axiosInstance.get(`/units/search/query?${query}&lang=${lang}`).then((res) => {
            dispatch(GetUnits(res.data))
            dispatch(getHomeURL(`units/search/query?${query}&`))
            console.log(placeType, essentials, hostLangs, rooms, beds, bathrooms)
            setRooms(0); setBathrooms(0); setBeds(0); setPlaceType([]); setEssentials([]); setHostLangs([])
            setShowFilters(false)
        }).catch((err) => {
        })
    }

    return (
        <Modal show={showFilters} onHide={handleCloseFilters}
            size="lg"
            centered
            scrollable
        >
            <Modal.Header closeButton elementtype="div" style={(i18n.language === 'en' ? { 'direction': 'ltr' } : { 'direction': 'rtl' })}>
                <h5>{t("Filter")}</h5>
            </Modal.Header>
            <Modal.Body style={(i18n.language === 'en' ? { 'direction': 'ltr' } : { 'direction': 'rtl' })}>
                <Box sx={{ width: "95%" }}>
                    <h4>{t("Price range")}</h4>
                    <span className='opacity-60 my-5'>{t("The average nightly price is £59")}</span>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={value}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                        disableSwap
                        isRtl={i18n.language === 'en' ? false : true}
                        sx={{ color: "#111827", width: "85%", mx: "5%", my: "5vh" }}
                    />
                    <div className='flex justify-around' dir='ltr'>
                        <TextField
                            id="outlined-helperText"
                            label={t("Min price")}
                            value={valuetext(value[0] * 8)}
                            sx={{ width: '40%' }}
                        />
                        <span>-</span>
                        <TextField
                            id="outlined-helperText"
                            label={t("Max price")}
                            value={valuetext(value[1] * 8)}
                            sx={{ width: '40%' }}
                        />
                    </div>
                </Box>
                <Divider sx={{ my: 5 }} />
                <Box>
                    <h4>{t("Type of Place")}</h4>
                    <FormGroup>
                        <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Entire place")} value={"Entire place"} onChange={handlePlaceTypeChange} />
                        <span className='opacity-60'>{t("A place all to yourself")}</span>
                        <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Private room")} value={"Private room"} onChange={handlePlaceTypeChange} />
                        <span className='opacity-60'>{t("Your own room in a home or a hotel, plus some shared common spaces")}</span>
                        <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Shared room")} value={"Shared room"} onChange={handlePlaceTypeChange} />
                        <span className='opacity-60' >{t("A sleeping space and common areas that may be shared with others")}</span>
                    </FormGroup>
                </Box>
                <Divider sx={{ my: 5 }} />
                <Box>
                    <h4>{t("Rooms and beds")}</h4>
                    <h6 className='m-4 opacity-70'>{t("Rooms")}</h6>
                    <ul className="flex justify-between w-5/6">
                        <li>
                            <input onClick={handleRooms} defaultChecked type="radio" id="rooms-any" name="rooms" value="rooms-any" className="hidden peer" />
                            <label htmlFor="rooms-any" className="w-full text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                {t("any")}
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-1" name="rooms" value="rooms-1" className="hidden peer" />
                            <label htmlFor="rooms-1" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                1
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-2" name="rooms" value="rooms-2" className="hidden peer" />
                            <label htmlFor="rooms-2" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                2
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-3" name="rooms" value="rooms-3" className="hidden peer" />
                            <label htmlFor="rooms-3" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                3
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-4" name="rooms" value="rooms-4" className="hidden peer" />
                            <label htmlFor="rooms-4" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                4
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-5" name="rooms" value="rooms-5" className="hidden peer" />
                            <label htmlFor="rooms-5" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                5
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-6" name="rooms" value="rooms-6" className="hidden peer" />
                            <label htmlFor="rooms-6" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                6
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-7" name="rooms" value="rooms-7" className="hidden peer" />
                            <label htmlFor="rooms-7" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                7
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="rooms-8" name="rooms" value="rooms-8" className="hidden peer" />
                            <label htmlFor="rooms-8" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                +8
                            </label>
                        </li>
                    </ul>
                    <h6 className='m-4 opacity-70'>{t("Beds")}</h6>
                    <ul className="flex justify-between w-5/6">
                        <li>
                            <input onClick={handleRooms} defaultChecked type="radio" id="beds-any" name="beds" value="beds-any" className="hidden peer" />
                            <label htmlFor="beds-any" className="w-full text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                {t("any")}
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-1" name="beds" value="beds-1" className="hidden peer" />
                            <label htmlFor="beds-1" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                1
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-2" name="beds" value="beds-2" className="hidden peer" />
                            <label htmlFor="beds-2" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                2
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-3" name="beds" value="beds-3" className="hidden peer" />
                            <label htmlFor="beds-3" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                3
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-4" name="beds" value="beds-4" className="hidden peer" />
                            <label htmlFor="beds-4" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                4
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-5" name="beds" value="beds-5" className="hidden peer" />
                            <label htmlFor="beds-5" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                5
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-6" name="beds" value="beds-6" className="hidden peer" />
                            <label htmlFor="beds-6" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                6
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-7" name="beds" value="beds-7" className="hidden peer" />
                            <label htmlFor="beds-7" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                7
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="beds-8" name="beds" value="beds-8" className="hidden peer" />
                            <label htmlFor="beds-8" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                +8
                            </label>
                        </li>
                    </ul>
                    <h6 className='m-4 opacity-70'>{t("Bathrooms")} </h6>
                    <ul className="flex justify-between w-5/6">
                        <li>
                            <input onClick={handleRooms} defaultChecked type="radio" id="baths-any" name="baths" value="baths-any" className="hidden peer" />
                            <label htmlFor="baths-any" className="w-full text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                {t("any")}
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-1" name="baths" value="baths-1" className="hidden peer" />
                            <label htmlFor="baths-1" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                1
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-2" name="baths" value="baths-2" className="hidden peer" />
                            <label htmlFor="baths-2" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                2
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-3" name="baths" value="baths-3" className="hidden peer" />
                            <label htmlFor="baths-3" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                3
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-4" name="baths" value="baths-4" className="hidden peer" />
                            <label htmlFor="baths-4" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                4
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-5" name="baths" value="baths-5" className="hidden peer" />
                            <label htmlFor="baths-5" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                5
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-6" name="baths" value="baths-6" className="hidden peer" />
                            <label htmlFor="baths-6" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                6
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-7" name="baths" value="baths-7" className="hidden peer" />
                            <label htmlFor="baths-7" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                7
                            </label>
                        </li>
                        <li>
                            <input onClick={handleRooms} type="radio" id="baths-8" name="baths" value="baths-8" className="hidden peer" />
                            <label htmlFor="baths-8" className="text-gray-500 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer peer-checked:bg-gray-900 peer-checked:text-white hover:text-gray-600 hover:bg-grey-600">
                                +8
                            </label>
                        </li>
                    </ul>
                </Box>
                <Divider sx={{ my: 5 }} />
                <Box>
                    <h4>{t("Essentials")}</h4>
                    <FormGroup className='flex-row'>
                        <Box className='flex flex-col w-2/5'>
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Wifi")} value={"Wifi"} onChange={handleEssentialsChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Kitchen")} value={"Kitchen"} onChange={handleEssentialsChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Washer")} value={"Washer"} onChange={handleEssentialsChange} />
                            {/* <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t()}"Dryer" value={"Dryer"} onChange={handleEssentialsChange} /> */}
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Air conditioning")} value={"Air conditioning"} onChange={handleEssentialsChange} />
                        </Box>
                        <Box className='flex flex-col w-2/5'>
                            {/* <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t()}"Heating" value={"Heating"} onChange={handleEssentialsChange} /> */}
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Dedicated workspace")} value={"Dedicated workspace"} onChange={handleEssentialsChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("TV")} value={"TV"} onChange={handleEssentialsChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Free parking")} value={"Hair dryer"} onChange={handleEssentialsChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Paid parking")} value={"Iron"} onChange={handleEssentialsChange} />
                        </Box>
                    </FormGroup>
                </Box>
                <Divider sx={{ my: 5 }} />
                <Box>
                    <h4>{t("Host language")}</h4>
                    <FormGroup className='flex-row'>
                        <Box className='flex flex-col w-2/5'>
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} color='black' control={<Checkbox />} label={t("English")} value={"English"} onChange={handleHostLangChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Arabic")} value={"Arabic"} onChange={handleHostLangChange} />
                        </Box>
                        <Box className='flex flex-col w-2/5'>
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("Spanish")} value={"Spanish"} onChange={handleHostLangChange} />
                            <FormControlLabel componentsProps={{ typography: { fontSize: 20 } }} control={<Checkbox />} label={t("French")} value={"French"} onChange={handleHostLangChange} />
                        </Box>
                    </FormGroup>
                </Box>

            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button className='btn-light text-decoration-underline'>{t("clear all")}</Button>
                <Button className='btn-dark' onClick={() => { filterUnits(queryStr, lang) }}>{t("Show Homes")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Filters;
