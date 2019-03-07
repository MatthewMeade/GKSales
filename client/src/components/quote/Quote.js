import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getQuote, updateQuoteDetails } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";

import QuoteDetails from "./QuoteDetails";

class Quote extends Component {
  componentDidMount() {
    this.props.getQuote(this.props.match.params.id);
  }

  render() {
    return (
      <div className="quotePage">
        <QuoteDetails quote={this.props.quote} />
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
