import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Leads from "../leads/Leads";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h3>Welcome back, {user.name}!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
