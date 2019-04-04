import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Logo from "../../img/logo.png";

// Landing Page with log in or sign up
class Landing extends Component {
  componentDidMount() {
    // Redirect to dashboard if user is authenticated
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src={Logo} alt="Garage Kings" className="logo" />
            <h1 className="display-4 mb-4">Sales App</h1>
            <p>Sign in or Register as a new salesperson</p>
            <hr />
            <Link to="/login" className="btn btn-lg btn-primary mr-2">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-lg btn-light">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
