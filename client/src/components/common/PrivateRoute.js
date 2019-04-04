import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Custom route wrapper ensuring route is only avaliable when authenticated
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
