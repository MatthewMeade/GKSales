import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { updateQuoteDetails, getQuote, quoteFormChanged } from "../../../actions/quoteActions";

import QuoteDetailsForm from "./QuoteDetailsForm";
import QuoteFormSaveBtns from "./QuoteFormSaveBtns";

class EditQuoteDetails extends Component {
  componentDidMount() {
    this.props.getQuote(this.props.match.params.id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.quote).length !== 0 && this.props.quoteForm.lead === "") {
      const { quote } = nextProps;
      this.props.quoteFormChanged({ prop: "lead", value: quote.lead._id });
      this.props.quoteFormChanged({
        prop: "consultationDate",
        value: quote.consultationDate,
      });
      this.props.quoteFormChanged({ prop: "address", value: quote.address });
      this.props.quoteFormChanged({ prop: "notes", value: quote.notes });
      this.props.quoteFormChanged({ prop: "salesperson", value: quote.salesperson._id });
    }
  }

  onSaveBtnPressed = redirectLocation => {
    this.props.updateQuoteDetails(
      this.props.match.params.id,
      this.props.quoteForm,
      this.props.history,
      redirectLocation
    );
  };

  render() {
    return (
      <div className="newQuotePage">
        <Link className="btn btn-primary mb-4" to={`/quotes/${this.props.quote._id}`}>
          <i className="fas fa-backspace pr-3" />
          Cancel
        </Link>

        <h1>Edit Quote Details</h1>
        <QuoteDetailsForm onSubmit={this.onSubmit} quote={this.props.quoteForm} />

        <QuoteFormSaveBtns onSaveBtnPressed={this.onSaveBtnPressed} currentPage="details" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quoteForm: state.quoteForm,
  quote: state.quotes.quote,
});

export default connect(
  mapStateToProps,
  { getQuote, updateQuoteDetails, quoteFormChanged }
)(EditQuoteDetails);
