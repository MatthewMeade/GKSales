import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import QuoteTable from "../common/QuoteTable";

class Quote extends Component {
  render() {
    return <QuoteTable />;
  }
}

Quote.propTypes = {
  // quotes: PropTypes.array.isRequired,
};

// const mapStateToProps = state => ({
//   quotes: state.quote.quotes,
//   loading: state.quote.loading,
// });

export default withRouter(connect()(Quote));
