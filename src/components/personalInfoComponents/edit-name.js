import { Formik, Field, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";


const EditName = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const token = localStorage.getItem('token')
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
  };
  // useEffect(() => {

  //   if (token) {
  //     dispatch(GetUser())
  //   }
  // }, [initialValues]);

  const { t, i18n } = useTranslation();

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  });
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
        onSubmit={(e) => { onSubmit() }}
        validationSchema={validationSchema}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-6 form-floating mb-3">
              <Field
                name="firstName"
                id="firstName"
                type="text"
                className={`form-control ${formik.touched.firstName && !formik.errors.firstName
                  ? "is-valid"
                  : !formik.touched.firstName
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("First name")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <label
                htmlFor="firstName"
                className={`${!formik.errors.firstName ? "text-dark" : "text-danger"
                  }`}
              >
                {t("First name")}
              </label>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="invalid-feedback">
                  {t(formik.errors.firstName)}
                </div>
              ) : null}{" "}
            </div>
            <div className="col-12 col-lg-6 form-floating mb-3">
              <Field
                name="lastName"
                id="lastName"
                type="text"
                className={`px-3 form-control ${formik.touched.lastName && !formik.errors.lastName
                  ? "is-valid"
                  : !formik.touched.lastName
                    ? ""
                    : "is-invalid"
                  }`}
                placeholder={t("Last name")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <label
                htmlFor="lastName"
                className={` ${!formik.errors.lastName ? "text-dark" : "text-danger"
                  }`}
              >
                {t("Last name")}
              </label>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="invalid-feedback">
                  {t(formik.errors.lastName)}
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

export default EditName;
