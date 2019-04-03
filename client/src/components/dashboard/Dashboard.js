import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getQuotes } from "../../actions/quoteActions";
import UpcomingQuotes from "./UpcomingQuotes";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuotes();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h3>Welcome back, {user.name}!</h3>

        <Link to="/newQuote" className="btn btn-primary mt-2 mb-5">
          <i className="fas fa-plus-circle pr-2" /> New Quote
        </Link>

        <UpcomingQuotes {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  quotes: state.quotes.quotes,
  loading: state.quotes.loading,
});

export default connect(
  mapStateToProps,
  { getQuotes }
)(Dashboard);
