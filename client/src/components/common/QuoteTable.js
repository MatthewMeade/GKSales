import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuotes, getQuotesByLead } from "../../actions/quoteActions";
import Moment from "react-moment";

import { withRouter } from "react-router-dom";
import Table from "./Table";

// Table of quoets
class QuoteTable extends Component {
  componentDidMount() {
    // If provided a leadID, filter quotes for that lead
    if (this.props.leadID) {
      this.setState({ filterStr: this.props.leadID });
      return this.props.getQuotesByLead(this.props.leadID);
    }

    // Fetch quotes
    this.props.getQuotes();
  }

  // Redirect to clicked quote
  onRowClick = ({ _id }) => {
    this.props.history.push("/quotes/" + _id);
  };

  render() {
    const { quotes, loading } = this.props;

    // Flatten data
    const data = quotes.map(quote => ({
      ...quote,
      leadId: quote.lead._id,
      leadName: quote.lead.name,
      salespersonId: quote.salesperson._id,
      salespersonName: quote.salesperson.name,
    }));

    return (
      <div className="quoteList">
        <Table
          headings={[{ name: "leadName", label: "Lead" }, { name: "consultationDate", label: "Consultation Date" }]}
          sortBy="date"
          sortDir="desc"
          sortMethod="date"
          filter={this.props.filter || ""}
          data={data}
          loading={loading}
          onRowClick={this.onRowClick}
          format={{
            consultationDate: date => <Moment>{date}</Moment>,
          }}
        />{" "}
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
