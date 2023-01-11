import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axiosInstance from "../../axios config/axiosInstance";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PayPalCheckoutButtons = (props) => {
    const { details } = props;
    const { unit, startDate, endDate, numberOfDays, totalPrice } = details;
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [payer, setPayer] = useState({});
    const [captureId, setCaptureId] = useState("");

    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const history = useHistory();

    console.log("user : ", user);
    console.log("token : ", token);

    let config = {
        headers: {
            authorization: token,
        },
    };
    useEffect(() => {
        if (success) {
            axiosInstance
                .post(
                    `/reservations/`,
                    {
                        user: user._id,
                        unit: unit.id,
                        date: { start: startDate, end: endDate },
                        numberOfDays,
                        pricePerNight: unit.pricePerNight,
                        totalPrice,
                        paymentId: orderID,
                        payerEmail: payer.email_address,
                        captureId: captureId
                    },
                    config
                )
                .then((res) => {
                    // console.log(res);
                    // reservation-successful
                    history.push(
                        `/reservation-successful`
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [payer]);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: unit.title,
                        amount: {
                            currency_code: "USD",
                            value: totalPrice,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                console.log("data : ", data);

                setOrderID(orderID);
                console.log("orderId : ", orderID);

                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer, purchase_units } = details;
            console.log("details ::: ", details);
            setSuccess(true);
            setCaptureId(purchase_units[0].payments.captures[0].id);
            setPayer(payer);
        });
    };
    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
        console.log("ErrorMessage :", ErrorMessage);
    };
    return (
        <>
            <PayPalButtons
                style={{
                    color: "gold",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill",
                }}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};

export default PayPalCheckoutButtons;
