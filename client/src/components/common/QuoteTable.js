import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getQuotes, getQuotesByLead } from "../../actions/quoteActions";
import Moment from "react-moment";

import { withRouter } from "react-router-dom";
import Table from "./Table";

class QuoteTable extends Component {
  componentDidMount() {
    if (this.props.leadID) {
      this.setState({ filterStr: this.props.leadID });
      return this.props.getQuotesByLead(this.props.leadID);
    }

    this.props.getQuotes();
  }

  onRowClick = ({ _id }) => {
    this.props.history.push("/quotes/" + _id);
  };

  render() {
    const { quotes, loading } = this.props;

    const data = quotes.map(quote => ({
      ...quote,
      leadId: quote.lead.id,
      leadName: quote.lead.name,
      salespersonId: quote.salesperson.id,
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
            consultationDate: date => <Moment format="YYYY MMMM DD">{date}</Moment>,
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
