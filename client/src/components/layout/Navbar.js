import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

import { Link } from "react-router-dom";

// Navbar used across the application
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    // Nav items to show only if user is authenticated
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
            <button className="btn btn-danger float-right" onClick={this.onLogoutClick}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand bg-primary">
        <Link className="navbar-brand mr-0" to="/dashboard">
          <span className="d-none d-md-inline ml-2">GK Sales</span>
        </Link>

        {/* Only render links if user is authenticated */}
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
