import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountSettingCard from "../../components/account card/account-setting-card";

const AccountSettings = () => {

  const user = useSelector(state => state.user)

  const { t, i18n } = useTranslation();
  var dataDisplay = [
    {
      icon: "bi-person-vcard",
      title: t("personal info"),
      description: t("Provide personal details and how we can reach you"),
    },
    {
      icon: "bi-shield-shaded",
      title: t("Login & security"),
      description: t("Update your password and secure your account"),
    },
    {
      icon: "bi-credit-card",
      title: t("Payments & payouts"),
      description: t(
        "Review payments, payouts, coupons, gift cards, and taxes"
      ),
    },
    {
      icon: "bi-bell",
      title: t("Notifications"),
      description: t(
        "Choose notification preferences and how you want to be contacted"
      ),
    },
    {
      icon: "bi-eye",
      title: t("Privacy & sharing"),
      description: t("Control connected apps, what you share, and who sees it"),
    },
    {
      icon: "bi-sliders",
      title: t("Global preferences"),
      description: t("Set your default language, currency, and timezone"),
    },
    {
      icon: "bi-person-workspace",
      title: t("Travel for work"),
      description: t("Add a work email for business trip benefits"),
    },
    {
      icon: "bi-bar-chart-line",
      title: t("Professional hosting tools"),
      description: t(
        "Get professional tools if you manage several properties on Airbnb"
      ),
    },
    {
      icon: "bi-gift",
      title: t("Referral credit & coupon"),
      description: t("You have $0 referral credits and coupon. Learn more."),
    },
  ];

  return (
    <>
      <div
        className="container p-5"
        dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
      >
        <h2 className="fs-2 fw-bold">{t("account")}</h2>
        <div className="d-flex flex-row">
          <p className="fs-6 fw-bold">{user.firstName} {user.lastName},</p>
          <p className="mx-2">{user.email} . </p>
          <p className="fs-6 fw-bold text-decoration-underline">
            {t("go to profile")}
          </p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 my-3">
          {dataDisplay.map((item, index) => {
            if (index === 0) {
              return (
                <div className="col">
                  <Link
                    to="/account-settings/personal-info"
                    className="text-decoration-none"
                  >
                    <AccountSettingCard
                      className="h-100"
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      key={index}
                    />
                  </Link>
                </div>
              );
            } else {
              return (
                <div className="col">
                  <AccountSettingCard
                    className="h-100"
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    key={index}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
