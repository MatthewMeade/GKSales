import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { newQuote } from "../../actions/quoteActions";

import QuoteDetailsForm from "./QuoteDetailsForm";
import QuoteFormSaveBtns from "./QuoteFormSaveBtns";

class NewQuote extends Component {
  onSaveBtnPressed = redirectLocation => {
    this.props.newQuote(this.props.history, this.props.quote, redirectLocation);
  };

  render() {
    return (
      <div className="newQuotePage">
        <Link className="btn btn-primary mb-4" to={`/quotes/`}>
          <i className="fas fa-backspace pr-2" />
          Cancel
        </Link>
        <h1>New Quote</h1>
        <QuoteDetailsForm quote={this.props.quote} />
        <QuoteFormSaveBtns onSaveBtnPressed={this.onSaveBtnPressed} currentPage="details" />
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
