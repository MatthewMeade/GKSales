import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Leads from "../leads/Leads";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    // const { profile, loading } = this.props.profile;

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        {/* <h2>Welcome Back {user.name}</h2> */}
        <Leads />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
