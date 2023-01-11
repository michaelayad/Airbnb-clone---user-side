import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios config/axiosInstance";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const TripCart = (props) => {
    const { t, i18n } = useTranslation();
    let { trip ,isReview} = props;
    const history = useHistory();
    const Difference_In_Time =
        new Date(trip?.date?.start).getTime() - new Date().getTime();
    const numberOfDays = Difference_In_Time / (1000 * 3600 * 24);
    // console.log(trip);
    const [accessToken, setAccessToken] = useState("");
    const [open, setOpen] = useState(false);
    const [reviewMsg, setReviewMsg] = useState("");
    const [reviewRating, setReviewRating] = useState(2);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const token = localStorage.getItem("token");
    console.log("token", token);
    let config = {
        headers: {
            Authorization: token,
        },
    };
    useEffect(() => {
        if (accessToken) {
            axios
                .post(
                    `https://api.sandbox.paypal.com/v2/payments/captures/${trip.captureId}/refund`,
                    {
                        amount: {
                            value: (trip.totalPrice * 70) / 100,
                            // value: ("5.00"),
                            currency_code: "USD",
                        },
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: accessToken,

                            // Authorization:
                            //     "Bearer A21AAI-yQM2sY0V-BIYOvb97iGgMZ6Ms9lkUyA4Ldsj-n2yxlA2HTFNG918Va_M3EgW5XPJQO2wCFRbtzbAPwPI26qBdpKQCA",

                            // 'PayPal-Request-Id': '123e4567-e89b-12d3-a456-426655440020'
                        },
                    }
                )
                .then((res2) => {
                    console.log("response2", res2);
                    axiosInstance
                        .delete(`/reservations/${trip._id}`, config)
                        .then((res) => {
                            // console.log(res);
                            history.push(`/Trip-Cancelled`);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    }, [accessToken]);
    const goToUnitPage = () => {
        history.push(`/unit-details/${trip.unit._id}`);
    };

    const handleCancel = () => {
        axios
            .post(
                "https://api-m.sandbox.paypal.com/v1/oauth2/token",
                new URLSearchParams({
                    grant_type: "client_credentials",
                }),
                {
                    auth: {
                        username: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                        password: process.env.REACT_APP_PAYPAL_PASSWORD,
                    },
                }
            )
            .then((res) => {
                console.log("resToken", res.data);
                setAccessToken(`Bearer ${res.data.access_token}`);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleReviewChange = (e) => {
        setReviewMsg(e.target.value);
    }
    const handleReview = () => {
        axiosInstance
            .post(`/review/${trip.unit._id}`, {
                review: reviewMsg,
                rating: (parseInt(reviewRating) || 1)
            }, config)
            .then((res) => {
                console.log(res.data);
                setOpen(false);
                history.push(`/review-successful`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            {" "}
            <div className="col-12 row">
                <div className="col-4">
                    <img
                        alt="image1"
                        src={trip?.unit?.images[0]}
                        className="w-100"
                        style={{ objectFit: "cover", height: "70px" }}
                    />
                </div>
                <div className="col-8 d-flex flex-column justify-content-between px-2">
                    <div className="m-0 p-0">
                        <p className="text-secondary m-0 p-0" style={{ fontSize: "14px" }}>
                            {trip?.unit?.placeType}
                        </p>
                        <p
                            className="m-0 p-0 trip-card-header"
                            style={{ fontSize: "14px" }}
                        >
                            {`${trip?.unit?.title} - ${trip?.unit?.location?.state},${trip?.unit?.location?.country}`}
                        </p>
                    </div>
                    <div className="d-flex flex-row m-0 p-0">
                        <i
                            className="bi bi-star-fill m-0 p-0"
                            style={{ fontSize: "14px" }}
                        ></i>
                        <p className="mx-2 fw-bold" style={{ fontSize: "14px" }}>
                            {" "}
                            {trip?.unit?.rate || t("New")} .{" "}
                        </p>
                        <p className="text-secondary" style={{ fontSize: "14px" }}>
                            {trip?.unit?.numberOfRates
                                ? `${trip?.unit?.numberOfRates} ${t("reviews . ")}`
                                : ""}{" "}
                        </p>
                    </div>
                </div>
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <div className="d-flex justify-content-between">
                <h5 className="fw-bold">{t("Check in")}</h5>
                <h5 className="fw-bold">{t("Check out")}</h5>
            </div>
            <div className="d-flex justify-content-between">
                <p className="m-0 p-0">
                    {new Date(trip?.date?.start).toLocaleDateString("en-US")}
                </p>
                <p className="m-0 p-0">
                    {new Date(trip?.date?.end).toLocaleDateString("en-US")}
                </p>
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <h5 className="fw-bold">{t("Price details")}</h5>
            <div className="d-flex flex-row justify-content-between m-0 p-0">
                <p className="m-0 p-0">{`$${trip.pricePerNight} x ${trip.numberOfDays
                    } ${t("nights")}`}</p>
                <p className="m-0 p-0">{`$${trip.totalPrice}`}</p>
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <div className="d-flex flex-row justify-content-between m-0 p-0">
                <p className="m-0 p-0 fw-bold fs-6">{`${t("Total")} (USD)`}</p>
                <p className="m-0 p-0 fw-bold fs-6">{`$${trip.totalPrice}`}</p>
            </div>
            {/* <p>{`is review ${isReview}`}</p> */}
            <Divider style={{ background: "#757575" }} className="my-3" />
            <div className="d-flex flex-row justify-content-between">
                <button
                    type="button"
                    class="btn btn-outline-dark px-3 py-2 my-2"
                    onClick={goToUnitPage}
                >
                    {t("show place")}
                </button>
                {numberOfDays <= 0 && !isReview ? (
                    <button
                        type="button"
                        class="btn btn-outline-dark px-3 py-2 my-2"
                        onClick={handleClickOpen}
                    >
                        {t("Add Review")}
                    </button>
                ) : (
                    <></>
                )}
                {numberOfDays >= 2 ? (
                    <button
                        type="button"
                        class="btn btn-outline-dark px-3 py-2 my-2"
                        onClick={handleCancel}
                    >
                        {t("Cancel Trip")}
                    </button>
                ) : (
                    <></>
                )}
            </div>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} >
                <DialogTitle style={{ fontSize: "30px", fontWeight: "bold" }}>{t("Add Review")}</DialogTitle>
                <DialogContent>
                    <textarea
                        className="form-control"
                        value={reviewMsg}
                        placeholder={t("Enter your review here...")}
                        rows="5"
                        onChange={(e) => handleReviewChange(e)}
                    ></textarea>
                    <h6 className="fw-bold my-3">{t("Your Rating")}</h6>
                    <Rating
                        name="simple-controlled"
                        value={reviewRating}
                        onChange={(event, newValue) => {
                            setReviewRating(newValue);
                        }}
                    />
                    {/* <p>{reviewMsg} {"...... "} {reviewRating}</p> */}
                </DialogContent>
                <DialogActions>
                    <button
                        type="button"
                        class="btn btn-outline-dark px-3 py-2 my-2"
                        onClick={handleClose}
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="button"
                        class="btn btn-outline-dark px-3 py-2 my-2"
                        onClick={handleReview}
                        disabled={!reviewMsg && !reviewRating}
                    >
                        {t("Add Review")}
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TripCart;
