import React, { Component } from "react";

import { connect } from "react-redux";

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
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
