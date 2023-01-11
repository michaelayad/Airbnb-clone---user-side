import React, { useContext, useState } from 'react';
import '../sign-up/sign-up.css'
import { Modal } from 'react-bootstrap';
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';


import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FiSmartphone } from 'react-icons/fi';

import { FcGoogle, } from 'react-icons/fc';
import { loginContext } from '../../contexts/loginModel';
import { useTranslation } from 'react-i18next';




const Login = () => {

    const { showLogin, setShowLogin } = useContext(loginContext)
    const handleCloseLogin = () => setShowLogin(false)

    const { t, i18n } = useTranslation();



    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
        loginError: ""
    })



    const handleInputChange = (evt) => {
        let emailRegex = /^[A-Za-z0-9]{3,}@(gmail|yahoo|outlook).com$/
        let PassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/


        if (evt.target.name === "email") {

            setUserLogin({ ...userLogin, email: evt.target.value })

            setErrors({
                ...errors, emailError: (evt.target.value.length === 0) ?
                    `${t(" This field is required.")}` : (!emailRegex.test(evt.target.value)) ?
                        `${t(" Invalid Email format.")}` : ""
            })
        } else if (evt.target.name === "password") {

            setUserLogin({ ...userLogin, password: evt.target.value })

            setErrors({
                ...errors, passwordError: (evt.target.value.length === 0) ?
                    `${t(" Password is required")}` : (!PassRegex.test(evt.target.value)) ?
                        `${t(" Password must be at least 8 characters, contains at least one uppercase , one lowercase letter,one special char.  ")}` : ""
            })
        }
    }




    const history = useHistory()

    const handleForm = (ev) => {
        ev.preventDefault();
        if (!errors.emailError && !errors.passwordError) {

            axiosInstance.post('/users/login', userLogin).then((res) => {

                if (res.status === 200) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setShowLogin(false)
                        history.push('/')
                        setUserLogin({ ...userLogin, password: "" })
                        setErrors({})
                    }
                } else {
                    setErrors({
                        ...errors, loginError: `${t(" Cannot login. Invalid email or password.")}`
                    })

                    setUserLogin({ ...userLogin, password: "" })
                }
            }).catch((err) => {
                setErrors({
                    ...errors, loginError: `${t(" Cannot login. Invalid email or password.")}`
                })
                setUserLogin({ ...userLogin, password: "" })
            })
        } else {
            setErrors({
                ...errors, loginError: `${t(" Cannot login. Invalid email or password.")}`
            })

            setUserLogin({
                ...userLogin, password: ""
            })
        }
    }






    return (

        <div className=''>

            <Modal show={showLogin} onHide={handleCloseLogin} className=""
            >
                <Modal.Body style={{ borderRadius: '2rem' }} className="">
                    <div className="signup-container ">
                        <div className="finish-signup p-0">
                            <h5 className="text-center">{t("Log in")}</h5>
                        </div>
                        <form onSubmit={(e) => { handleForm(e) }} className=" " method='GET' >
                            <h4 className='pb-2'>{t("Welcome to Airbnb")} </h4>
                            <div className='pb-2'>
                                <div className={`input-container ${(errors.emailError ? "border-danger shadow-none" : "")}`}>
                                    <input type="text" className={`shadow-none ${(errors.emailError ? "border-danger shadow-none" : "")}`}
                                        value={userLogin.email}
                                        name="email"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("Email")}
                                    />
                                </div>
                                <p className={`error shadow-none ${!errors.emailError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.emailError}</p>
                            </div>


                            <div>
                                <div className={` input-container ${(errors.passwordError ? "border-danger shadow-none" : "")}`}>

                                    <input type="text"
                                        className='shadow-none'
                                        value={userLogin.password}
                                        name="password"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("password")}
                                    />
                                </div>
                                <p className={`error ${!errors.passwordError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.passwordError}</p>
                            </div>
                            <br />
                            <p className={`error ${!errors.loginError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "> </i>{errors.loginError}</p>

                            <input
                                type="submit"
                                className="agree-btn"
                                value={t(" continue")}
                                name="submit-btn"
                            />


                            <div>
                                <div className="row" style={{ marginLeft: '20px', marginTop: '30px' }} >
                                    <div className="col-5" style={{ padding: 0 }}>
                                        <hr />
                                    </div>
                                    <div className="col-1" style={{ padding: 0, textAlign: 'center' }}>
                                        {t("or")}
                                    </div>
                                    <div className="col-5" style={{ padding: 0 }}>
                                        <hr />
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="social-login__btn">
                                    <div className="facebook-container">
                                        <div className="facebook-icon-container ">
                                            <FaFacebookSquare
                                                style={{
                                                    fontSize: '1.4rem',
                                                    color: '#1873eb',
                                                }}
                                            />
                                        </div>
                                        <div className="facebook-text-container">
                                            {t("Continue With Facebook")}
                                        </div>
                                    </div>
                                </div>



                                <div

                                    className="social-login__btn "
                                >
                                    <div className="google-container">
                                        <div className="google-icon-container">
                                            <FcGoogle style={{ fontSize: '1.4rem' }} />
                                        </div>
                                        <div className="google-text-container">
                                            {t("Continue With Google")}
                                        </div>
                                    </div>
                                </div>

                                <div className="social-login__btn">
                                    <div className="apple-container">
                                        <div className="apple-icon-container">
                                            <FaApple
                                                style={{
                                                    fontSize: '1.4rem',
                                                }}
                                            />
                                        </div>
                                        <div className="apple-text-container"> {t("Continue With Apple")}</div>
                                    </div>
                                </div>


                                <div className="social-login__btn">
                                    <div className="email-container">
                                        <div className="email-icon-container">
                                            < FiSmartphone style={{ fontSize: '1.4rem' }} />
                                        </div>
                                        <div className="email-text-container"> {t("Continue With Phone")}</div>
                                    </div>
                                </div>
                            </div>



                        </form >
                    </div>
                </Modal.Body >
            </Modal >
        </div >

    );

}
export default Login;
