// import SignUp from './sign-up/sign-up';
import SignUp from "./components/sign-up/signup";
import Login from "./components/login/login";
// import { Navbar } from 'react-bootstrap';
import { LoginProvider } from "./contexts/loginModel";
import { useEffect, useRef, useState } from "react";
import { SignupProvider } from "./contexts/singupModel";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "./store/actions/getUser";
import { AuthProvider } from "./contexts/auth";
import Home from "./pages/home/home";
import AccountSettings from "./pages/account-settings/account-settings";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PersonalInfo from "./pages/personal-info/Personal-info";
import Unit from "./pages/unit/unit";
import "./pages/unit/unit.scss";
import "./pages/reservation-sucee/res-suc-style.scss";
import { FilterProvider } from "./contexts/filtersModel";
import Filters from "./components/filters/filters";
import Reservation from "./pages/reservation/reservation";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserTrips from "./pages/user-trips/user-trips";
import Host from "./pages/host/host";
import { GetCat } from "./store/actions/getUnits";
import ReservationSuccessful from "./pages/reservation-sucee/reservation-success";
import { SearchProvider } from "./contexts/searchModal";
import Header from'./components/header/Header'
import TripCancelled from "./pages/reservation-sucee/trip-cancel";
import ReviewSuccessful from "./pages/reservation-sucee/review-succeful";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showsignup, setShowsignup] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const [ showSearch, setShowSearch ] = useState(false)

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);

  const lang = localStorage.getItem('lang')
  !lang ? localStorage.setItem('lang', 'en') : console.log(33)

  useEffect(() => {
    console.log(showLogin);

    if (token) {
      dispatch(GetUser());
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      setAuth(true);
    }
  });



  return (
    <div>
      <Router>
        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
        >
          <AuthProvider value={{ isAuth, setAuth }}>
            <LoginProvider value={{ showLogin, setShowLogin }}>
              <SignupProvider value={{ showsignup, setShowsignup }}>
                <FilterProvider value={{ showFilters, setShowFilters }}>
                <SearchProvider value={{ showSearch, setShowSearch }}>
                <Header />
                  <SignUp />
                  <Login />
                  <Filters />
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/unit-details/:unitId" exact component={Unit} />
                    <Route path="/reservation-successful" exact component={ReservationSuccessful} />
                    <Route path="/Trip-Cancelled" exact component={TripCancelled} />
                    <Route path="/review-successful" exact component={ReviewSuccessful} />

                    
                    {isAuth ? (
                      <Route
                        path="/account-settings"
                        exact
                        component={AccountSettings}
                      />
                    ) : <Redirect to='/' />}
                    {isAuth ? (
                      <Route
                        path="/account-settings/personal-info"
                        exact
                        component={PersonalInfo}
                      />
                    ) : <Redirect to='/' />}
                    {isAuth ? (
                      <Route
                        path="/trips"
                        exact
                        component={UserTrips}
                      />
                    ) : <Redirect to='/' />}
                    {isAuth ? (
                      <Route path="/reservation/:unitId" exact component={Reservation} />
                    ) : <Redirect to='/' />}


                    {isAuth ? (
                      <Route
                        path="/host"
                        exact
                        component={Host}
                      />
                    ) : <Redirect to='/' />}

                  </Switch>
                  </SearchProvider>
                </FilterProvider>
              </SignupProvider>
            </LoginProvider>
          </AuthProvider>
        </PayPalScriptProvider>
      </Router>
    </div>
  );
}


export default App;
