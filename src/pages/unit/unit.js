import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import Rating from '@mui/material/Rating';
import "./datePicker-style/datepicker.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../axios config/axiosInstance";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Unit = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [unit, setUnit] = useState({});
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [reservetionPosition, setReservetionPosition] = useState(0);
  const ref = useRef("");
  const [width, setWidth] = useState(0);
  // console.log(params)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get(`/units/${params.unitId}?lang=${i18n.language}`)
      .then((res) => {
        console.log(res.data);
        setUnit(res.data);
        axiosInstance
          .get(`/review/${params.unitId}`)
          .then((res) => {
            console.log(res.data);
            setReviews(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i18n.language]);

  useEffect(() => {
    setWidth(ref?.current?.offsetWidth);
    if (!isLoading) {
      setStartDate(
        new Date(unit.date.start) >= new Date()
          ? new Date(unit.date.start)
          : new Date()
      );
      setEndDate(
        new Date(unit.date.end) >= new Date()
          ? new Date(unit.date.end)
          : new Date()
      );
      setGuests(unit.guestsNumber);
    }
    console.log(width);
    function handleResize() {
      setWidth(ref?.current?.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
  }, [isLoading]);
  window.addEventListener("scroll", function (event) {
    // console.log(this.scrollY);
    if (this.scrollY < 460) {
      setReservetionPosition(1);
    } else if (this.scrollY >= 460) {
      setReservetionPosition(2);
    } else {
      setReservetionPosition(0);
    }
  });
  // useLayoutEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  // }, []);
  const handleReserve = () => {
    if (user && token) {
      history.push(
        `/reservation/${unit.id}?startDate=${new Date(
          startDate
        ).toLocaleDateString("en-US")}&endDate=${new Date(
          endDate
        ).toLocaleDateString("en-US")}&guests=${guests}`
      );
    } else {
      setOpenAlert(true);
    }
  };
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const numberOfDays = () => {
    if (startDate && endDate) {
      const Difference_In_Time = endDate.getTime() - startDate.getTime();
      return Difference_In_Time / (1000 * 3600 * 24);
    }
    return 0;
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
          {/* ------ title   &  gallery ------------------- */}
          <div className="d-flex flex-column">
            {/* -------- Unit title & rate & reviews & location */}
            <div>
              <div className="d-flex flex-row">
                <h3 className="fw-bold">{unit.title}</h3>
                {!unit?.available ? (
                  <p
                    className="mx-3 bg-danger text-white px-2 rounded-3 py-1 mt-1"
                    style={{ height: "35px" }}
                  >
                    {t("UnAvailable")}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <i className="bi bi-star-fill"></i>
                  <h6 className="mt-1 mx-2 fw-bold">
                    {" "}
                    {unit.avgRating === 1
                      ? t("New") : unit.avgRating
                    } {" "}
                  </h6>
                  <a
                    className="text-dark fw-semibold"
                    href="/"
                    style={{ fontSize: "15px" }}
                  >
                    {unit.numberOfRates
                      ? `${unit.numberOfRates} ${t("reviews . ")}`
                      : ""}
                  </a>
                  <a
                    className="text-dark fw-semibold"
                    href="/"
                    style={{ fontSize: "15px" }}
                  >
                    {`${unit["location"]?.state} , ${unit["location"]?.country} `}
                  </a>
                </div>
                <div className="d-none d-sm-flex flex-row ">
                  <button
                    type="button"
                    className="btn btn-light"
                    style={{ backgroundColor: "white" }}
                  >
                    <i className="bi bi-upload mx-2"></i> {t("Share")}
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    style={{ backgroundColor: "white" }}
                  >
                    <i className="bi bi-heart mx-2"></i> {t("Save")}
                  </button>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------ */}
            {/* ---------------- images gallery----------------- */}
            <div className="unit-gallery">
              {unit.images.map((image, index) => {
                if (index <= 4) {
                  return <img alt="" src={image} className="" key={index} />;
                }
              })}
            </div>
            {/* ------------------------------------------------ */}
          </div>
          {/* ---------------------------------------------- */}
          {/* ------ details & reservation component  ----- */}
          <div className="row mx-0 px-0 my-4">
            {/* -------------Unit detail ------------------- */}
            <div
              className={`col-12 col-md-8 ${i18n.language === "en" ? "pe-4" : "ps-4"
                }`}
            >
              {/* ------------unit type & hoster */}
              <div className="d-flex justify-content-between">
                <div className="">
                  <h4 className="fw-bold">
                    {" "}
                    {`${unit.unitType || ""} ${t("hosted by")} ${unit?.host?.firstName ? unit.host.firstName : ""
                      } ${unit?.host?.lastName ? unit.host.lastName : ""}`}
                  </h4>
                  <p>
                    {" "}
                    {`${unit.guestsNumber || ""} ${t("guests")} . ${unit.bedrooms || "0"
                      } ${t("bedrooms")} . ${unit.beds || "0"} ${t("beds")} . ${unit.bathrooms || "0"
                      } ${t("bathrooms")}`}
                  </p>
                </div>
                <div>
                  <Avatar alt="" src="" sx={{ width: 56, height: 56 }}>
                    {unit?.host?.firstName[0]
                      ? unit?.host?.firstName[0].toUpperCase()
                      : null}
                  </Avatar>
                </div>
              </div>
              <Divider style={{ background: "#757575" }} className="my-3" />

              {/* ------------ AirCover --------------------- */}
              <div className="d-flex flex-column py-3">
                <img
                  src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                  alt="aircover"
                  style={{ width: "25%" }}
                />
                <p className="mt-3">
                  {t(
                    "Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in."
                  )}
                </p>
                <p className="fw-bold text-decoration-underline">
                  {" "}
                  {t("Learn more")}
                </p>
              </div>
              <Divider style={{ background: "#757575" }} className="my-3" />
              {/* ------------ unit description ------------ */}
              <div className="py-3">
                <p className="unit-description">{unit.description || ""}</p>
                <p className="fw-bold text-decoration-underline">
                  {" "}
                  {t("Show more")}
                </p>
              </div>
              <Divider style={{ background: "#757575" }} className="my-3" />
              {/* -----------What this place offers--------- */}
              <div className="py-3">
                <h4 className="fw-bold">{t("What this place offers")}</h4>
                <div className="row row-cols-1 row-cols-md-2 my-3">
                  {unit.advantages
                    ? unit.advantages.map((offer, index) => {
                      return (
                        <div
                          className="col d-flex flex-row align-content-center"
                          key={index}
                        >
                          <i
                            className={`${offer.icon || ""} fs-3 m-0 p-0`}
                          ></i>
                          <p className="mx-3 pt-2">{offer.title || ""}</p>
                        </div>
                      );
                    })
                    : null}
                </div>
                <button
                  type="button"
                  className="btn btn-outline-dark px-4 py-3"
                >
                  {t("Show all amenities")}
                </button>
              </div>
              <Divider style={{ background: "#757575" }} className="my-3" />
              {/* ---------- travel date ------------------ */}
              <div className="py-3">
                <h4 className="fw-bold pt-2">{t("Select checkout date")}</h4>
                <p className="text-secondary">
                  {t("Add your travel dates for exact pricing")}
                </p>
                <DatePicker
                  selected={startDate}
                  minDate={
                    new Date(unit.date.start) >= new Date()
                      ? new Date(unit.date.start)
                      : new Date()
                  }
                  maxDate={
                    new Date(unit.date.end) >= new Date()
                      ? new Date(unit.date.end)
                      : new Date()
                  }
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  inline
                  disabled={!unit.available}
                />
              </div>
              <Divider style={{ background: "#757575" }} className="mb-3" />
              {reviews.length > 0 ? (
                <div className="py-3">
                  <div className="d-flex flex">
                    <i className="bi bi-star-fill"></i>
                    <h5 className="mt-1 mx-2 fw-bold">
                      {" "}
                      {unit.avgRating === 1
                        ? t("New") : unit.avgRating
                      }{" "}
                      .{" "}
                    </h5>
                    <h5 className="mt-1 mx-2 fw-bold">
                      {unit.numberOfRates
                        ? `${unit.numberOfRates} ${t("reviews . ")}`
                        : ""}
                    </h5>
                  </div>
                  {reviews ? (
                    reviews.map((review, index) => {
                      return (
                        <>
                          <div className="col-12 py-3">
                            <div className="d-flex flex-row">
                              <Avatar
                                alt=""
                                src=""
                                sx={{ width: 56, height: 56 }}
                              >
                                {review?.user?.firstName[0]
                                  ? review?.user?.firstName[0].toUpperCase()
                                  : null}
                              </Avatar>
                              <div className="d-flex flex-column px-3 align-content-center">
                                <h5 className="fw-bold">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h5>
                                <p className="text-secondary">{`${new Date(review?.createdAt).toLocaleDateString("en-US")}`}</p>
                              </div>
                              <Rating name="read-only" value={review?.rating || 1} readOnly />
                            </div>
                            <p>{`${review?.review}`}</p>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* ------------------------------------------------- */}
            {/* -------------Unit reservation ------------------- */}
            <div
              className={`col-12 col-md-4 d-lg-flex flex-column ${reservetionPosition === 1 ? "justify-content-start" : ""
                }  my-4 py-3`}
              ref={ref}
            >
              <div
                className={` p-3 border  shadow-lg rounded-3  ${reservetionPosition === 2 ? " reservation-box" : ""
                  }`}
                style={{ width: `${width >= 300 ? width - 20 : width}px` }}
              >
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row">
                    <h5 className="fw-bold">{`$ ${unit.pricePerNight}  `}</h5>
                    <p className="mx-1">{t("night")}</p>
                  </div>
                  <div className="d-flex flex-row">
                    <i
                      className="bi bi-star-fill"
                      style={{ fontSize: "13px" }}
                    ></i>
                    <h6
                      className="mt-1 mx-2 fw-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {" "}
                      {unit.rate || t("New")} .{" "}
                    </h6>
                    <a
                      className="text-dark fw-semibold text-secondary"
                      href="/"
                      style={{ fontSize: "13px" }}
                    >
                      {`${unit.numberOfRates
                        ? `${unit.numberOfRates} ${t("reviews . ")}`
                        : ""
                        }`}
                    </a>
                  </div>
                </div>
                {/* <div className="justify-content-center">
                  <ButtonGroup size="large" aria-label="large button group" fullWidth className="reservation-button-group">
                    <Button key="one">One</Button>
                    <Button key="two">Two</Button>
                  </ButtonGroup>totalPrice
                </div> */}
                <div
                  className="btn-group-vertical w-100 mt-2 mb-3"
                  role="group"
                  aria-label="Vertical button group"
                >
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn reservation-button-group reservation-button-group-up"
                    >
                      <p
                        className="fw-bold p-0 m-0"
                        style={{ fontSize: "14px" }}
                      >
                        {t("CHECK-IN")}
                      </p>
                      <p className="p-0 m-0" style={{ fontSize: "15px" }}>
                        {startDate ? startDate.toLocaleDateString("en-US") : ""}
                      </p>
                    </button>
                    <button
                      type="button"
                      className="btn reservation-button-group reservation-button-group-up"
                    >
                      <p
                        className="fw-bold p-0 m-0"
                        style={{ fontSize: "14px" }}
                      >
                        {t("CHECK-OUT")}
                      </p>
                      <p className="p-0 m-0" style={{ fontSize: "15px" }}>
                        {endDate ? endDate.toLocaleDateString("en-US") : ""}
                        {/* toLocaleDateString('en-US') */}
                      </p>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn reservation-button-group reservation-button-group-down"
                  >
                    <div className="row">
                      <div className="col-6">
                        <p
                          className="fw-bold p-0 m-0"
                          style={{ fontSize: "14px" }}
                        >
                          {t("guests")}
                        </p>
                        <p className="p-0 m-0" style={{ fontSize: "15px" }}>
                          {guests}
                        </p>
                      </div>
                      <div className="col-6 d-flex flex-row justify-content-end align-content-center">
                        {guests <= unit.guestsNumber && guests > 1 ? (
                          <button
                            className="mt-1 fw-bold rounded-circle border border-secondary  "
                            onClick={() => {
                              setGuests(guests - 1);
                            }}
                            style={{
                              width: "32px",
                              fontSize: "20px",
                              height: "32px",
                            }}
                          >
                            -
                          </button>
                        ) : (
                          <></>
                        )}
                        {guests < unit.guestsNumber && guests >= 1 ? (
                          <button
                            className="mt-1 fw-bold rounded-circle border border-secondary p-0 ms-3"
                            onClick={() => {
                              setGuests(guests + 1);
                            }}
                            style={{
                              width: "32px",
                              fontSize: "20px",
                              height: "32px",
                            }}
                          >
                            +
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
                <button
                  className={`reserve-btn-grad ${!startDate ||
                    !endDate ||
                    !unit.available ||
                    new Date(startDate) >= new Date(endDate) ||
                    numberOfDays() % 1 !== 0
                    ? "reserve-btn-grad-disabled"
                    : ""
                    }`}
                  onClick={handleReserve}
                  disabled={
                    !startDate ||
                    !endDate ||
                    !unit.available ||
                    new Date(startDate) >= new Date(endDate) ||
                    numberOfDays() % 1 !== 0
                  }
                >
                  {t("Reserve")}
                </button>
                <div
                  className={`w-100 my-3 ${startDate &&
                    endDate &&
                    new Date(startDate) < new Date(endDate) &&
                    numberOfDays() % 1 === 0 &&
                    unit.available
                    ? ""
                    : "d-none"
                    }`}
                >
                  <h5 className="fw-bold">{t("Price details")}</h5>
                  <div className="d-flex flex-row justify-content-between m-0 p-0">
                    <p className="m-0 p-0">{`$${unit.pricePerNight
                      } x ${numberOfDays()} ${t("nights")}`}</p>
                    <p className="m-0 p-0">{`$${unit.pricePerNight * numberOfDays()
                      }`}</p>
                  </div>
                  <Divider style={{ background: "#757575" }} className="my-3" />
                  <div className="d-flex flex-row justify-content-between m-0 p-0">
                    <p className="m-0 p-0 fw-bold fs-6">{`${t(
                      "Total"
                    )} (USD)`}</p>
                    <p className="m-0 p-0 fw-bold fs-6">{`$${unit.pricePerNight * numberOfDays()
                      }`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider style={{ background: "#757575" }} className="mb-3" />

          <Snackbar
            open={openAlert}
            autoHideDuration={5000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} variant="filled" severity="error">
              {t("You cannot reserve , please login")}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default Unit;
