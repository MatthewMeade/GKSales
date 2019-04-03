import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getQuote, updateQuoteDetails } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";

import QuoteDetails from "./quoteDetails/QuoteDetails";
import Photos from "./quoteDetails/photoUpload/Photos";
import JobInformation from "./quoteDetails/JobInformation";
import FloorInfo from "./quoteDetails/FloorInfo";
import PricingInfo from "./quoteDetails/PricingInfo";

class Quote extends Component {
  componentWillMount() {
    this.props.getQuote(this.props.match.params.id, this.props.history);
  }

  render() {
    const { quote, loading } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div className="quotePage">
        <h1 className="text-center mb-4">Quote</h1>
        <QuoteDetails quote={quote} />

        <FloorInfo quote={quote} />

        <JobInformation quote={quote} />

        <PricingInfo quote={quote} />

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
