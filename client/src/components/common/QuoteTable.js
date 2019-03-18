import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getQuotes, getQuotesByLead } from "../../actions/quoteActions";
import Moment from "react-moment";

import { withRouter } from "react-router-dom";

class QuoteTable extends Component {
  componentDidMount() {
    if (this.props.leadID) {
      return this.props.getQuotesByLead(this.props.leadID);
    }
    this.props.getQuotes();
  }

  onRowClick = id => {
    this.props.history.push("/quotes/" + id);
  };

  render() {
    const { quotes, loading } = this.props;
    let quoteContent;

    if (loading) {
      quoteContent = (
        <tr>
          <td colSpan="4">
            <Spinner className="spinner" />
          </td>
        </tr>
      );
    } else if (quotes.length === 0) {
      quoteContent = (
        <tr>
          <td colSpan="4">No Quotes</td>
        </tr>
      );
    } else {
      console.log(quotes);
      quoteContent = quotes.map(quote => (
        // Can't wrap tr in Link, using onRowClick instead
        <tr key={quote._id} onClick={this.onRowClick.bind(this, quote._id)}>
          <td>{quote.lead.name}</td>
          <td>
            <Moment format="MMM Do YYYY">{quote.consultationDate}</Moment>
          </td>
        </tr>
      ));
    }

    return (
      <div className="quoteList">
        <table className="table table-striped table-light table-hover">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Consultation Date</th>
            </tr>
          </thead>
          <tbody>{quoteContent}</tbody>
        </table>
      </div>
    );
  }
}

QuoteTable.propTypes = {
  quotes: PropTypes.array.isRequired,
  leadID: PropTypes.string,
};

const mapStateToProps = state => ({
  quotes: state.quotes.quotes,
  loading: state.quotes.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    { getQuotes, getQuotesByLead }
  )(QuoteTable)
);
