import React, { useState } from 'react';
import SingleCard from './../../components/card/card'
import CatList from '../../components/catList/catList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { GetUnits } from '../../store/actions/getUnits';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../axios config/axiosInstance';
import { getHomeURL } from '../../store/actions/homePageURL';
import CircularProgress from "@mui/material/CircularProgress";


const Home = () => {
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch()
    // console.log(Units);
    const lang = localStorage.getItem('lang');

    const link = useSelector(state => state.homePageURL)

    useEffect(() => {
        axiosInstance.get(`/${link}lang=${lang}`).then((res) => {
            console.log(res.data, link);
            dispatch(GetUnits(res.data))
            setLoading(false)
        }).catch((err) => {
        })
    }, [link, i18n.language, dispatch]);

    const Units = useSelector(state => state.getUnits)

    return (
        <div id='homePage' className='px-5'>
            {/* <Navbar /> */}
            <CatList />
            {isLoading ? (
                <div className="container p-5 m-5 d-flex justify-content-center">
                    <CircularProgress style={{ color: "#ff5b60" }} />
                </div>
            ) :
                <div className="row row-cols-md-2 row-cols-1 row-cols-lg-4 mt-4" dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}>
                    {Units.map((card) => (
                        <SingleCard data={card} key={card.id} />
                    ))}
                </div>}

        </div>
    );
}

export default Home;
