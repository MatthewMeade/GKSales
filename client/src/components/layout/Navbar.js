import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

import { Link } from "react-router-dom";

import Logo from "../../img/logo.png";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item ml-3">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item ml-3">
          <Link className="nav-link" to="/leads">
            Leads
          </Link>
        </li>
        <li className="nav-item ml-3">
          <Link className="nav-link" to="/quotes">
            Quotes
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand bg-primary">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Garage Kings" id="navLogo" />
          Garage King Sales
        </Link>

        {isAuthenticated && authLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
