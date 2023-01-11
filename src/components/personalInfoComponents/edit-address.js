import { Formik, Field, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../axios config/axiosInstance";
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";

const EditAddress = () => {

  const user = useSelector(state => state.user)

  const { t, i18n } = useTranslation();

  const initialValues = {
    country: user.address ? user.address.country : "",
    city: user.address ? user.address.city : "",
  };
  const validationSchema = yup.object({
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
  });


  const dispatch = useDispatch()
  const history = useHistory()
  function onSubmit(values) {

    const token = localStorage.getItem('token')

    console.log(token);
    let config = {
      headers: {
        'Authorization': token
      }
    }
    console.log(user);
    const address = values


    axiosInstance.patch(`users/${user._id}`, { address }, config).then((res) => {
      console.log(res);

      history.push('/account-settings/personal-info')
      dispatch(GetUser())
      dispatch(setElement(0))
    }).catch((err) => {
    })
  };


  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-9 form-floating mb-3">
              <Field
                name="country"
                id="country"
                type="text"
                className={`form-control ${formik.touched.country && !formik.errors.country
                  ? "is-valid"
                  : !formik.touched.country
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("Country/region")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              <label
                htmlFor="country"
                className={`${!formik.errors.country ? "text-dark" : "text-danger"
                  }`}
              >
                {t("Country/region")}
              </label>
              {formik.touched.country && formik.errors.country ? (
                <div className="invalid-feedback">
                  {t(formik.errors.country)}
                </div>
              ) : null}{" "}
            </div>
            <div className="col-12 col-lg-9 form-floating mb-3">
              <Field
                name="city"
                id="city"
                type="text"
                className={`px-3 form-control ${formik.touched.city && !formik.errors.city
                  ? "is-valid"
                  : !formik.touched.city
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("City")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              <label
                htmlFor="city"
                className={` ${!formik.errors.city ? "text-dark" : "text-danger"
                  }`}
              >
                {t("City")}
              </label>
              {formik.touched.city && formik.errors.city ? (
                <div className="invalid-feedback">
                  {t(formik.errors.city)}
                </div>
              ) : null}{" "}
            </div>
          </div>
          <button type="submit" className="btn btn-dark fw-bold mb-4">
            {t("save")}
          </button>
        </form>
      </Formik>{" "}
    </>
  );
};

export default EditAddress;
