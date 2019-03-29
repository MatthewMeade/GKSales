import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

import "./App.scss";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Dashboard from "./components/dashboard/Dashboard";

import Leads from "./components/leads/Leads";
import Quotes from "./components/quotes/Quotes";

import Lead from "./components/lead/Lead";
import Quote from "./components/quote/Quote";
import NewQuote from "./components/quote/NewQuote";
import EditQuoteDetails from "./components/quote/EditQuoteDetails";
import JobInformationForm from "./components/quote/JobInformationForm";
import FloorForm from "./components/quote/FloorForm";
import PricingForm from "./components/quote/PricingForm";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to Login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/leads" component={Leads} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quotes" component={Quotes} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/leads/:id" component={Lead} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/newQuote" component={NewQuote} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/newQuote/:leadId" component={NewQuote} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quotes/:id" component={Quote} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quotes/:id/details" component={EditQuoteDetails} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quotes/:id/jobInfo" component={JobInformationForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quotes/:id/pricing" component={PricingForm} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/quotes/:id/floorOptions" component={FloorForm} />
              </Switch>
              {/* <Route exact path="/not-found" component={NotFound} />  */}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
