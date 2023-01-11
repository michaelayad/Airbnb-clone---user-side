import { useTranslation } from "react-i18next";
import { CircularProgress, Divider } from "@mui/material";
import paypalLogo from "../../assets/paypal.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ReservationCart from "../../components/reservation/reservation-cart";
import PayPalCheckoutButtons from "../../components/reservation/paypal-checkout-buttons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axios config/axiosInstance";

const Reservation = () => {
    const { t, i18n } = useTranslation();
    const params = useParams();
    const location = useLocation();
    const [unit, setUnit] = useState({});
    const [isLoading, setLoading] = useState(true);
    const startDate = new URLSearchParams(location.search).get("startDate");
    const endDate = new URLSearchParams(location.search).get("endDate");
    const guests = new URLSearchParams(location.search).get("guests");
    const Difference_In_Time = new Date(endDate).getTime() - new Date(startDate).getTime();
    const numberOfDays = Difference_In_Time / (1000 * 3600 * 24)
    console.log("location", new URLSearchParams(location.search).get("startDate"));
    const history = useHistory();


    useEffect(() => {
        axiosInstance
            .get(`/units/${params.unitId}?lang=${i18n.language}`)
            .then((res) => {
                console.log(res.data);
                setUnit(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [i18n.language]);
    const backToUnitPage = () => {
        
            history.push(
                `/unit-details/${unit.id}`
            );
        
    };
    return (
        <>
            {isLoading ? (
                <div className="container p-5 m-5 d-flex justify-content-center">
                    <CircularProgress style={{ color: "#ff5b60" }} />
                </div>
            ) : (
                <div
                    className="container pt-3"
                    dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
                >
                    {/* ---------- component header ---------- */}
                    <div className="d-flex flex-row mt-3">
                        <button
                            type="button"
                            className="btn btn-light rounded-circle"
                            style={{ backgroundColor: "white" }}
                            onClick={backToUnitPage}
                        >
                            <i
                                className={`bi ${i18n.language === "en"
                                    ? "bi-caret-left-fill"
                                    : "bi-caret-right-fill"
                                    }  mx-2 fs-3`}
                            ></i>
                        </button>
                        <h2 className="m-1 fw-bold">{t("Confirm and pay")}</h2>
                    </div>
                    <div className="row my-4">
                        <div
                            className={`col-12 col-md-6 order-md-first order-last ${i18n.language === "en" ? "pe-4" : "ps-4"
                                }`}
                        >
                            <h4 className="fw-bold my-4">{t("Your trip")}</h4>
                            <h5 className="fw-bold m-0 p-0">{t("Dates")}</h5>
                            <p>{`${startDate}  -  ${endDate}`}</p>
                            <h5 className="fw-bold m-0 mt-2 p-0">{t("Guests")}</h5>
                            <p>{`${guests} ${t("Guests")}`}</p>
                            <Divider style={{ background: "#757575" }} className="my-3" />
                            <div className="d-flex flex-row justify-content-between">
                                <h4 className="fw-bold my-4">{t("Pay with")}</h4>
                                <img
                                    alt="paypal"
                                    src={paypalLogo}
                                    className="object-contain w-25"
                                />
                            </div>
                            <p>{t("Log in to use PayPal.")}</p>
                            <Divider style={{ background: "#757575" }} className="my-3" />
                            <h4 className="fw-bold my-4">{t("Ground rules")}</h4>
                            <p>
                                {t(
                                    "We ask every guest to remember a few simple things about what makes a great guest."
                                )}
                            </p>
                            <ul style={{ listStyleType: "square" }}>
                                <li>{t("Follow the house rules")}</li>
                                <li>{t("Treat your Host’s home like your own")}</li>
                            </ul>
                            <Divider style={{ background: "#757575" }} className="my-3" />
                            <p style={{ fontSize: "14px" }} className="my-3">
                                {t("By selecting the button below, I agree to the")}{" "}
                                <a href="/" className="text-dark fw-bold">
                                    {t("Host's House Rules")}
                                </a>{" "}
                                ,{" "}
                                <a href="/" className="text-dark fw-bold">
                                    {t("Ground rules for guests")}
                                </a>{" "}
                                ,{" "}
                                <a href="/" className="text-dark fw-bold">
                                    {t("Airbnb's Rebooking and Refund Policy")}
                                </a>{" "}
                                , {t("and that Airbnb can")}{" "}
                                <a href="/" className="text-dark fw-bold">
                                    {t("charge my payment method")}
                                </a>
                                {t(" if I’m responsible for damage.")}
                            </p>
                            <div className="my-2 mx-4">
                                <PayPalCheckoutButtons
                                    details={{
                                        unit,
                                        startDate,
                                        endDate,
                                        numberOfDays,
                                        totalPrice: numberOfDays * unit.pricePerNight,
                                    }}
                                />
                            </div>
                        </div>
                        {/* --------------- reservation Cart -------------- */}
                        <div className="col-12 col-md-6 order-md-last order-first py-3">
                            <div className="d-none d-md-flex col-12 p-3 border rounded-3">
                                <ReservationCart unit={unit} numberOfDays={numberOfDays} startDate={startDate} endDate={endDate} />
                            </div>
                            <div className="d-flex d-md-none col-12 py-3">
                                <ReservationCart unit={unit} numberOfDays={numberOfDays} startDate={startDate} endDate={endDate} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Reservation;
