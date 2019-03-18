import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getQuote, updateQuoteDetails } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";

import QuoteDetails from "./QuoteDetails";
import AddPhotoBtn from "./AddPhotoBtn";
import Photos from "./Photos";
import JobInformation from "./JobInformation";

class Quote extends Component {
  componentDidMount() {
    this.props.getQuote(this.props.match.params.id);
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className="quotePage">
        <h1 className="text-center mb-4">Quote</h1>
        <QuoteDetails quote={this.props.quote} />

        <JobInformation quote={this.props.quote} />

        <Photos />
      </div>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quote: state.quotes.quote,
  loading: state.quotes.loading,
});

export default connect(
  mapStateToProps,
  { getQuote, updateQuoteDetails }
)(Quote);
