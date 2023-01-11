import React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Formik, Field, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";
import StepOne from '../../components/hostComponents/stepOne';
import StepTow from '../../components/hostComponents/stepTow';
import StepThree from '../../components/hostComponents/stepTree';
import DragDrop from '../../components/hostComponents/DragDrop/dragDrop';
import StepSix from '../../components/hostComponents/stepSix';
import StepFive from '../../components/hostComponents/stepFive';
import './host.css'
import countriesAPI from '../../axios config/Api';
import { useEffect } from 'react';
import StepSeven from '../../components/hostComponents/stepSeven';
import StepEight from '../../components/hostComponents/stepEight';
import StepNine from '../../components/hostComponents/stepNine';


const Host = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const steps = [

        <StepOne />,
        <StepTow />,
        <StepThree />,
        <DragDrop />,
        <StepFive />,
        <StepSix />,
        <StepSeven />,
        <StepEight />,
        <StepNine />
    ];

    return (
        <div className='body'>

            {/* <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
            </Paper > */}
            <div className='mainn'>{steps[activeStep]}</div>
            <div className='fixedElement d-flex justify-content-center '>
                <MobileStepper className=' d-flex justify-content-evenly '
                    variant="progress"
                    steps={9}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: '90%', flexGrow: 1 }}
                    color="primary"
                    nextButton={
                        <Button size="large" color="primary" variant="outlined"
                            onClick={handleNext} disabled={activeStep === 8}>
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button variant="outlined" size="medium" className='primary'
                            onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </div>
        </div>
    );

}

export default Host;

