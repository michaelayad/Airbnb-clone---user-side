import { useTranslation } from "react-i18next";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import PersonalInfoRightCard from "../../components/personalInfoComponents/personal-info-rigth-card";
import { useState } from "react";
import EditName from "../../components/personalInfoComponents/edit-name";
import EditGender from "../../components/personalInfoComponents/editGender";
import EditEmail from "../../components/personalInfoComponents/edit-email";
import EditAddress from "../../components/personalInfoComponents/edit-address";
import AddTel from "../../components/personalInfoComponents/add-tel";
import { useDispatch, useSelector } from "react-redux";
import { setElement } from "../../store/actions/setElement";
const PersonalInfo = () => {
  const dispatch = useDispatch();
  const elementDisable = useSelector((state) => state.element);

  const user = useSelector((state) => state.user);

  const { t, i18n } = useTranslation();

  // const [elementDisable, setElementDisable] = useState(0);

  const handleClick = (elementNum) => (event) => {
    dispatch(setElement(elementDisable === 0 ? elementNum : 0));
  };
  return (
    <>
      <div
        className="container p-5"
        dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
      >
        <Breadcrumbs
          separator={
            i18n.language === "en" ? (
              <NavigateNextIcon fontSize="small" />
            ) : (
              <NavigateBeforeIcon fontSize="small" />
            )
          }
          aria-label="breadcrumb"
        >
          <Link
            to="/account-settings"
            className="text-dark link-underLine-hover"
          >
            {t("account")}
          </Link>
          <Typography color="text.primary">{t("personal info")}</Typography>
        </Breadcrumbs>
        <h2 className="fw-bold py-2">{t("personal info")}</h2>
        <div className="row my-3 gy-3">
          <div
            className={`col-12 col-lg-8 ${
              i18n.language === "en" ? "pe-5" : "ps-5"
            }`}
          >
            <div
              className={`w-100 ${
                elementDisable === 0 || elementDisable === 1
                  ? ""
                  : "element-disabled-wrap"
              }`}
            >
              <div
                className={`w-100 d-flex justify-content-between ${
                  elementDisable === 0 || elementDisable === 1
                    ? ""
                    : "element-disabled"
                }`}
              >
                <div>
                  <p className="mb-0 pb-0">{t("Legal name")} </p>
                  <p className="text-secondary">
                    {elementDisable !== 1
                      ? `${user.firstName} ${user.lastName}`
                      : t(
                          "This is the name on your travel document, which could be a license or a passport."
                        )}
                  </p>
                </div>
                <a
                  href
                  onClick={handleClick(1)}
                  type="button"
                  className="text-dark link-underLine-hover"
                >
                  {elementDisable !== 1 ? t("edit") : t("Cancel")}
                </a>
              </div>
              {elementDisable === 1 ? <EditName /> : <></>}
            </div>
            <Divider style={{ background: "#757575" }} />
            <div
              className={`w-100 ${
                elementDisable === 0 || elementDisable === 2
                  ? ""
                  : "element-disabled-wrap"
              }`}
            >
              <div
                className={`w-100 d-flex justify-content-between pt-4 ${
                  elementDisable === 0 || elementDisable === 2
                    ? ""
                    : "element-disabled"
                }`}
              >
                <div>
                  <p className="mb-0 pb-0">{t("Gender")} </p>
                  <p className="text-secondary">
                    {elementDisable === 2
                      ? ""
                      : user.gender
                      ? user.gender
                      : t("Not specified")}
                  </p>
                </div>
                <a
                  href
                  onClick={handleClick(2)}
                  type="button"
                  className="text-dark link-underLine-hover"
                >
                  {elementDisable !== 2 ? t("edit") : t("Cancel")}
                </a>
              </div>
              {elementDisable === 2 ? <EditGender /> : <></>}
            </div>
            <Divider style={{ background: "#757575" }} />
            <div
              className={`w-100  ${
                elementDisable === 0 || elementDisable === 3
                  ? ""
                  : "element-disabled-wrap"
              }`}
            >
              <div
                className={`w-100 d-flex justify-content-between pt-4 ${
                  elementDisable === 0 || elementDisable === 3
                    ? ""
                    : "element-disabled"
                }`}
              >
                <div>
                  <p className="mb-0 pb-0">{t("Email address")} </p>
                  <p className="text-secondary">
                    {elementDisable !== 3
                      ? `${user.email}`
                      : t("Use an address you’ll always have access to.")}
                  </p>
                </div>
                <a
                  href
                  onClick={handleClick(3)}
                  type="button"
                  className="text-dark link-underLine-hover"
                >
                  {elementDisable !== 3 ? t("edit") : t("Cancel")}
                </a>
              </div>
              {elementDisable === 3 ? <EditEmail /> : <></>}
            </div>
            <Divider style={{ background: "#757575" }} />
            <div
              className={`w-100   ${
                elementDisable === 0 || elementDisable === 4
                  ? ""
                  : "element-disabled-wrap"
              }`}
            >
              <div
                className={`d-flex justify-content-between pt-4 ${
                  elementDisable === 0 || elementDisable === 4
                    ? ""
                    : "element-disabled"
                }`}
              >
                <div>
                  <p className="mb-0 pb-0">{t("Phone numbers")} </p>
                  <p className="text-secondary">
                    {elementDisable !== 4
                      ? user.phone
                        ? user.phone
                        : t("Not specified")
                      : t(
                          "Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they re used"
                        )}
                  </p>
                </div>

                <a
                  href
                  onClick={handleClick(4)}
                  type="button"
                  className="text-dark link-underLine-hover"
                >
                  {elementDisable !== 4
                    ? !user.phone
                      ? t("Add")
                      : t("Edit")
                    : t("Cancel")}
                </a>
              </div>
              {elementDisable === 4 ? <AddTel /> : <></>}
            </div>
            <Divider style={{ background: "#757575" }} />
            <div
              className={`w-100  ${
                elementDisable === 0 || elementDisable === 5
                  ? ""
                  : "element-disabled-wrap"
              }`}
            >
              <div
                className={`d-flex justify-content-between pt-4 ${
                  elementDisable === 0 || elementDisable === 5
                    ? ""
                    : "element-disabled"
                }`}
              >
                <div>
                  <p className="mb-0 pb-0">{t("Address")} </p>
                  <p className="text-secondary">
                    {elementDisable !== 5
                      ? user.address
                        ? `${user.address.city}, ${user.address.country}`
                        : t("Not specified")
                      : t(
                          "Use a permanent address where you can receive mail."
                        )}
                  </p>
                </div>
                <a
                  href
                  onClick={handleClick(5)}
                  type="button"
                  className="text-dark link-underLine-hover"
                >
                  {elementDisable !== 5 ? t("edit") : t("Cancel")}
                </a>
              </div>
              {elementDisable === 5 ? <EditAddress /> : <></>}
            </div>
            <Divider style={{ background: "#757575" }} />
          </div>
          <div className="d-none d-lg-block col-lg-4 ">
            <PersonalInfoRightCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
