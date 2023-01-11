import * as React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FeedIcon from '@mui/icons-material/Feed';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessibleIcon from '@mui/icons-material/Accessible';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import LandslideIcon from '@mui/icons-material/Landslide';
import LightIcon from '@mui/icons-material/Light';
import PoolIcon from '@mui/icons-material/Pool';
import HouseIcon from '@mui/icons-material/House';
import '../header/header.css'
import { authContext } from '../../contexts/auth';
import { useTranslation } from "react-i18next";
import './catList.css'
import { GetUnits } from '../../store/actions/getUnits';
import { filterContext } from '../../contexts/filtersModel';
import axiosInstance from '../../axios config/axiosInstance';
import { searchContext } from '../../contexts/searchModal';
import { getHomeURL } from '../../store/actions/homePageURL';


const CatList = (props) => {


    const { t, i18n } = useTranslation();
    const { isAuth, setAuth } = useContext(authContext);

    const { showFilters, setShowFilters } = useContext(filterContext)


    const handleShowFilters = () => setShowFilters(true)

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    const dispatch = useDispatch()
    const lang = localStorage.getItem('lang')
    function getCatUnits(name) {

        console.log(name);
        axiosInstance.get(`/units/category/${name}?lang=${lang}`).then((res) => {
            console.log(res.data);
            dispatch(GetUnits(res.data))
            dispatch(getHomeURL(`units/category/${name}?`))
        }).catch((err) => {
        })



    }

    const { showSearch, setShowSearch } = useContext(searchContext);

    return (
        <>
            {!showSearch &&
                <div className='container-fluid sticky z-50 top-20 bg-white py-1 px-0'>
                    <div
                        className="flex flex-row items-center px-0 "
                        dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            className='grow-1'
                        >
                            <Tab icon={<LandslideIcon onClick={()=>{ getCatUnits("Amazing views")}}/>} label={t("Amazing views")} name="Amazing views" onClick={(e) => { getCatUnits(e.target.name) }} value={0} />
                            <Tab icon={<FeedIcon onClick={()=>{ getCatUnits("New")}}/>} label={t('New')} name="New" onClick={(e) => { getCatUnits(e.target.name) }} value={2}/>
                            <Tab icon={<FilterHdrIcon />} label={t("Top of the world")} name="Top of the world" onClick={(e) => { getCatUnits(e.target.name) }} value={3}/>
                            <Tab icon={<WhatshotIcon />} label={t("Trending")} />
                            <Tab icon={<AccessibleIcon />} label={t("Adapted")} />
                            <Tab icon={<SportsHandballIcon />} label={t("Playing")} />
                            <Tab icon={<TempleBuddhistIcon />} label={t("Hankoks")} />
                            <Tab icon={<AirlineSeatIndividualSuiteIcon />} label={t("Private rooms")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<HouseIcon />} label={t("Tiny home")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<HouseIcon />} label={t("Tiny home")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<HouseIcon />} label={t("Tiny home")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                            <Tab icon={<HouseIcon />} label={t("Tiny home")} />
                            <Tab icon={<LandslideIcon />} label={t("Amazing views")} />
                            <Tab icon={<LightIcon />} label={t("OMG!")} />
                            <Tab icon={<PoolIcon />} label={t("Amazing pools")} />
                        </Tabs>

                        <button className="btn btn-white lg:me-2 grow-0 border" onClick={handleShowFilters}>
                            <h6>{t("Filter")}</h6>
                        </button>
                    </div >
                </div >
            }
        </>
    );
};

export default CatList;