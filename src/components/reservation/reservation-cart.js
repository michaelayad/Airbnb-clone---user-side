import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import image from "../../assets/05.webp";

const ReservationCart = (props) => {
    const { t, i18n } = useTranslation();
    let { unit, numberOfDays, startDate, endDate } = props;
    console.log(numberOfDays, "sssssssssss")
    return (
        <div>
            {" "}
            <div className="col-12 row">
                <div className="col-4">
                    <img alt="image1" src={unit.images[0]} />
                </div>
                <div className="col-8 d-flex flex-column justify-content-between px-2">
                    <div className="m-0 p-0">
                        <p className="text-secondary m-0 p-0" style={{ fontSize: "14px" }}>
                            {unit.placeType}
                        </p>
                        <p className="m-0 p-0" style={{ fontSize: "14px" }}>
                            {`${unit.title} - ${unit.location.state},${unit.location.country}`}
                        </p>
                    </div>
                    <div className="d-flex flex-row m-0 p-0">
                        <i
                            className="bi bi-star-fill m-0 p-0"
                            style={{ fontSize: "14px" }}
                        ></i>
                        <p className="mx-2 fw-bold" style={{ fontSize: "14px" }}>
                            {" "}
                            {unit.rate || t("New")} .{" "}
                        </p>
                        <p className="text-secondary" style={{ fontSize: "14px" }}>
                            {unit.numberOfRates
                                ? `${unit.numberOfRates} ${t("reviews . ")}`
                                : ""}                        </p>
                    </div>
                </div>
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <div className="d-flex flex-row m-0 p-0">
                <p >{t("Your booking is protected by")}</p>
                <img src="https://a0.muscache.com/pictures/aircover/aircover-logo/original/56683a2f-f11b-43f6-8af7-a1b3861b2c85.svg" alt="aircover" style={{ height: "17px" }} className="px-2" />
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <h4 className="fw-bold">{t("Price details")}</h4>
            <div className="d-flex flex-row justify-content-between m-0 p-0">
                <p className="m-0 p-0">{`$${unit.pricePerNight} x ${numberOfDays} ${t("nights")}`}</p>
                <p className="m-0 p-0">{`$${unit.pricePerNight * numberOfDays}`}</p>
            </div>
            <Divider style={{ background: "#757575" }} className="my-3" />
            <div className="d-flex flex-row justify-content-between m-0 p-0">
                <p className="m-0 p-0 fw-bold fs-6">{`${t("Total")} (USD)`}</p>
                <p className="m-0 p-0 fw-bold fs-6">{`$${unit.pricePerNight * numberOfDays}`}</p>
            </div>
        </div>
    );
};

export default ReservationCart;
