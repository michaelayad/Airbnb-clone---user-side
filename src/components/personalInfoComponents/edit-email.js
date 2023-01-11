import { Formik, Field, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axiosInstance from "../../axios config/axiosInstance";
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";

const EditEmail = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const initialValues = {
    email: user.email,
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("Email address is invalid"),
  });

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
            <div className="col-12 form-floating mb-3">
              <Field
                name="email"
                id="email"
                type="text"
                className={`form-control ${formik.touched.email && !formik.errors.email
                  ? "is-valid"
                  : !formik.touched.email
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("Email address")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label
                htmlFor="email"
                className={`${!formik.errors.email ? "text-dark" : "text-danger"
                  }`}
              >
                {t("Email address")}
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{t(formik.errors.email)}</div>
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

export default EditEmail;
