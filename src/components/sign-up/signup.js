import React, { useState, useContext } from 'react';
import './sign-up.css'
import { Modal } from 'react-bootstrap';
import axiosInstance from '../../axios config/axiosInstance';
import { useDispatch } from 'react-redux';
import { signupContext } from '../../contexts/singupModel';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Signup = (props) => {

    const { showsignup, setShowsignup } = useContext(signupContext)
    const handleCloseSignup = () => setShowsignup(false)

    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        fNameError: "",
        lNameError: "",
        birthDateError: "",
        emailError: "",
        passwordError: "",
        signupError: ""
    })


    const handleInputChange = (evt) => {
        console.log(user.birthDate);
        let emailRegex = /^[A-Za-z0-9]{3,}@(gmail|yahoo|outlook).com$/
        let PassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/


        if (evt.target.name === "firstName") {
            setUser({ ...user, firstName: evt.target.value })

            setErrors({
                ...errors, fNameError: (evt.target.value.length === 0) ? `${t(" First name is required.")}` : (evt.target.value.length < 3) ? `${t(" First name must be at least 3 characters.")}` : ""
            })

        } else if (evt.target.name === "lastName") {

            setUser({ ...user, lastName: evt.target.value })

            setErrors({
                ...errors, lNameError: (evt.target.value.length === 0) ? `${t(" Last name is required.")}` : (evt.target.value.length < 3) ? `${t(" Last name  must be at least 3 characters.")}` : ""
            })

        } else if (evt.target.name === "birthDate") {
            console.log();

            setUser({ ...user, birthDate: evt.target.value })

            setErrors({
                ...errors, birthDateError: (evt.target.value.length === 0) ?
                    `${t(" This field is required.")}` : ""
            })
        } else if (evt.target.name === "email") {

            setUser({ ...user, email: evt.target.value })

            setErrors({
                ...errors, emailError: (evt.target.value.length === 0) ?
                    `${t(" This field is required.")}` : (!emailRegex.test(evt.target.value)) ?
                        `${t(" Invalid Email format.")}` : ""
            })
        } else if (evt.target.name === "password") {

            setUser({ ...user, password: evt.target.value })

            setErrors({
                ...errors, passwordError: (evt.target.value.length === 0) ?
                    `${t(" Password is required")}` : (!PassRegex.test(evt.target.value)) ?
                        `${t(" Password must be at least 8 characters, contains at least one uppercase , one lowercase letter,one special char.  ")}` : ""
            })
        } else if (evt.target.name === "birthDate") {

            console.log(evt.target.value);
            console.log(user.birthDate);

            setUser({ ...user, birthDate: evt.target.value })

            setErrors({
                ...errors, birthDateError: (evt.target.value.length === 0) ?
                    `${t(" Birth date is required")}` : ""
            })
        }

    }

    const history = useHistory()

    const handleForm = (ev) => {


        ev.preventDefault();
        if (!errors.fNameError && !errors.lNameError && !errors.emailError && !errors.passwordError && !errors.birthDateError) {
            axiosInstance.post('/users', user).then((res) => {
                if (res.status === 201) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setShowsignup(false)
                        history.push('/')
                        setUser({})
                        setErrors({})
                    }
                } else {
                    setErrors({
                        ...errors, signupError: `${t(" Cannot Sign up. Please try again later.")}`
                    })

                    setUser({ ...user, password: "" })
                }
            }).catch((err) => {
                setErrors({
                    ...errors, signupError: `${t(" Cannot Sign up. Please try again later.")}`
                })
                setUser({ ...user, password: "" })
            })
        } else {
            setErrors({
                ...errors, signupError: `${t(" Cannot Sign up. Please try again later.")}`
            })

            setUser({ ...user, password: "" })
        }
    }

    return (


        <div className=''>

            <Modal show={showsignup} onHide={handleCloseSignup} className="" {...props}
            >


                <Modal.Body style={{ borderRadius: '2rem' }} className="">
                    <div className="signup-container " dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}>
                        <div className="finish-signup p-0">
                            <h5 className="text-center" closeButton>{t("Finish signing up")}</h5>
                        </div>
                        <form onSubmit={(e) => { handleForm(e) }} className=" "  >

                            <div className={` full-name ${(errors.fNameError || errors.lNameError ? "border-danger shadow-none" : "")}  `}>
                                <div className={`name-input ${(errors.fNameError ? "border-danger shadow-none" : "")} `}>
                                    <input type="text" className='  shadow-none'
                                        value={user.firstName}
                                        name="firstName"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("First name")}
                                    />

                                </div>

                                <div className="name-input last-name">
                                    <input type="text"
                                        className={`shadow-none`}
                                        value={user.lastName}
                                        name="lastName"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("Last name")}
                                    />
                                </div>
                            </div >
                            <p className={`error ${!errors.fNameError && !errors.lNameError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "> </i>{errors.fNameError + errors.lNameError}</p>
                            <span>{t("Make sure it matches the name on your government ID")}</span>
                            <br />
                            <div>
                                <div className="input-container">

                                    <input type="date" className={`shadow-none`}
                                        value={user.birthDate}
                                        name="birthDate"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("Birth date")}
                                    />
                                </div>
                                <p className={`error ${!errors.birthDateError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.birthDateError}</p>
                            </div>

                            <span>
                                {t("To sign up, you need to be at least 18")}
                            </span>
                            <br />
                            <div>
                                <div className={`input-container shadow-none ${(errors.emailError ? "border-danger shadow-none" : "")}`}>
                                    <input type="text" className={` shadow-none ${(errors.emailError ? "border-danger shadow-none" : "")}`}
                                        value={user.email}
                                        name="email"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("Email")}
                                    />
                                </div>
                                <p className={`error ${!errors.emailError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.emailError}</p>
                            </div>
                            <span>{t("We'll email you trip confirmations and receipts.")}</span>
                            <br />


                            <div>
                                <div className={` input-container ${(errors.passwordError ? "border-danger shadow-none" : "")}`}>

                                    <input type="password"
                                        className='shadow-none'
                                        value={user.password}
                                        name="password"
                                        onChange={(e) => { handleInputChange(e) }}
                                        placeholder={t("password")}
                                    />
                                </div>
                                <p className={`error ${!errors.passwordError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "></i>{errors.passwordError}</p>
                            </div>

                            <span>
                                {t("By selecting Agree and continue below, I agree to Airbnb")}
                                <a href="#">{t('Terms of Service')}</a> ,
                                <a href="#">{t("Payments Terms of Service")}</a> ,{' '}
                                <a href="#"> {t("Privacy Policy")}</a>, and{' '}
                                <a href="#">{t("Nondiscrimination Policy")}</a>.
                            </span>
                            <br />

                            <p className={`error ${!errors.signupError ? "d-none" : ""} `}><i className=" fa-solid fa-circle-exclamation "> </i>{errors.signupError}</p>

                            <input
                                type="submit"
                                className="agree-btn"
                                value={t("Agree and continue")}
                                name="submit-btn"
                            />
                            <p className=' small pt-5'>
                                {t("Airbnb will send you members-only deals")}
                            </p>
                            <br />
                            <div className="send-reminder">
                                <input type="checkbox" name="keep_contact" id="checkBox" />
                                <label htmlFor="checkBox ">
                                    <span className=' small p-0'>{t("I don't want to receive marketing messages from Airbnb.")}</span>
                                </label>
                            </div>
                        </form >
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
}

export default Signup;


