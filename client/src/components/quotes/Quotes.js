import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";

import QuoteTable from "../common/QuoteTable";

class Quote extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>Quotes</h3>
          </div>

          <div className="col text-right">
            <Link to="/newQuote" className="btn btn-primary">
              New Quote
            </Link>
          </div>
        </div>
        <QuoteTable />
      </div>
    );
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
