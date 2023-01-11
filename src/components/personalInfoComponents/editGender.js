import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../axios config/axiosInstance';
import { useHistory } from 'react-router-dom';
import { GetUser } from "../../store/actions/getUser";
import { setElement } from "../../store/actions/setElement";


const EditGender = () => {

  const user = useSelector(state => state.user)

  const { t, i18n } = useTranslation();
  const [gender, setGender] = useState(user.gender);
  const handleChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const dispatch = useDispatch()
  const history = useHistory()


  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    console.log(token);
    let config = {
      headers: {
        'Authorization': token
      }
    }
    console.log(user);

    axiosInstance.patch(`users/${user._id}`, { gender }, config).then((res) => {
      console.log(res);

      history.push('/account-settings/personal-info')
      dispatch(GetUser())
      dispatch(setElement(0))
    }).catch((err) => {
    })

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <select
            value={gender}
            className="form-select"
            id="floatingSelect"
            onChange={handleChange}
            aria-label="Default select example"
          >
            <option value="Not specified">{t("Not specified")}</option>
            <option value="Male">{t("Male")}</option>
            <option value="Female">{t("Female")}</option>

          </select>
          <label htmlFor="floatingSelect">{t("Gender")}</label>
          <input
            type="submit"
            value={t("save")}
            className="btn btn-dark fw-bold my-4"
          />
        </div>
      </form>
    </>
  );
};

export default EditGender;
