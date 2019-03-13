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
      <div className="container-fluid">
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
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button
              className="btn btn-danger float-right"
              onClick={this.onLogoutClick}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand bg-primary">
        <Link className="navbar-brand mr-0" to="/">
          <img src={Logo} alt="Garage Kings" id="navLogo" />
          <span className="d-none d-md-inline ml-2">Garage Kings Sales</span>
        </Link>

        {isAuthenticated && authLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
