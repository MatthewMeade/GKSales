import React, { Component } from "react";
import { connect } from "react-redux";

import { updateQuoteDetails, getQuote, quoteFormChanged } from "../../actions/quoteActions";

import QuoteDetailsForm from "./QuoteDetailsForm";

class EditQuoteDetails extends Component {
  componentDidMount() {
    this.props.getQuote(this.props.match.params.id);
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

  onSubmit = e => {
    e.preventDefault();
    this.props.updateQuoteDetails(this.props.match.params.id, this.props.quoteForm, this.props.history);
  };

  render() {
    return (
      <div className="newQuotePage">
        <h1>Edit Quote Details</h1>
        <QuoteDetailsForm onSubmit={this.onSubmit} quote={this.props.quoteForm} />
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
