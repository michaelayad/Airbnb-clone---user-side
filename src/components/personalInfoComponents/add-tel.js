import { Formik, Field, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";

const Addphone = () => {
  const { t, i18n } = useTranslation();


  const elementDisable = useSelector(state => state.element)
  const user = useSelector(state => state.user)
  const initialValues = {
    phone: user.phone,
  };
  const validationSchema = yup.object({
    phone: yup.number().required("Phone number is required"),
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

    axiosInstance.patch(`users/${user._id}`, values, config).then((res) => {
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
                name="phone"
                id="phone"
                type="phone"
                className={`form-control ${formik.touched.phone && !formik.errors.phone
                  ? "is-valid"
                  : !formik.touched.phone
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("Phone numbers")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              <label
                htmlFor="phone"
                className={`${!formik.errors.phone ? "text-dark" : "text-danger"
                  }`}
              >
                {t("Phone numbers")}
              </label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="invalid-feedback">{t(formik.errors.phone)}</div>
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

export default Addphone;
