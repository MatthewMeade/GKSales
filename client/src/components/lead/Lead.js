import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Spinner from "../common/Spinner";

import { getLead } from "../../actions/leadActions";

import { newQuote } from "../../actions/quoteActions";

import QuoteTable from "../common/QuoteTable";

class Lead extends Component {
  componentDidMount() {
    this.props.getLead(this.props.match.params.id);
  }

  onNewQuoteClick = () => {
    this.props.newQuote(this.props.match.params.id, this.props.history);
  };

  render() {
    const { loading, lead } = this.props;

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        // TODO: Refactor
        <div>
          <div className="row">
            <div className="col-lg">
              <h1 className="mb-2">Lead: {lead.name}</h1>
            </div>
            <div className="col-lg text-lg-right">
              <button className="btn btn-primary mt-2 mb-sm-5" onClick={this.onNewQuoteClick}>
                New Quote for {lead.name}
              </button>
            </div>
          </div>
          <div className="row leadDetails">
            {lead.email && (
              <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
                <a href={`mailto:${lead.email}`}>
                  <i className="far fa-envelope mr-1" />
                  <strong>Email:</strong> {lead.email}
                </a>
              </div>
            )}

            {lead.phone && (
              <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
                <a href={`phone:${lead.phone}`}>
                  <i className="fas fa-phone mr-1" />
                  <strong>Phone: </strong>
                  {lead.phone}
                </a>
              </div>
            )}

            {lead.zip && (
              <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
                <i className="fas fa-map-marked-alt mr-1" />
                <strong>Zip: </strong>
                {lead.zip}
              </div>
            )}

            {lead.source && (
              <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
                <i className="far fa-address-book mr-1" />
                <strong>Source: </strong>
                {lead.source}
              </div>
            )}
          </div>

          <div className="leadNotes mt-5 mb-5">
            <h5>Notes</h5>
            {lead.notes}
          </div>

          <QuoteTable leadID={lead._id} />
        </div>
      );
    }

    return (
      <div className="leadPage">
        {content}
        {/* <code>{JSON.stringify(lead)}</code> */}
      </div>
    );
  }
}

Lead.propTypes = {
  lead: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lead: state.leads.lead,
  loading: state.leads.loading,
});

export default connect(
  mapStateToProps,
  { getLead, newQuote }
)(withRouter(Lead));
