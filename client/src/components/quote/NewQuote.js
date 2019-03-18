import React, { Component } from "react";
import { connect } from "react-redux";

import { newQuote } from "../../actions/quoteActions";

import QuoteDetailsForm from "./QuoteDetailsForm";

class NewQuote extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.newQuote(this.props.history, this.props.quote);
  };

  render() {
    return (
      <div className="newQuotePage">
        <h1>New Quote</h1>
        <QuoteDetailsForm onSubmit={this.onSubmit} quote={this.props.quote} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quote: state.quoteForm,
});

export default connect(
  mapStateToProps,
  { newQuote }
)(NewQuote);
