import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { getQuote, updateQuoteDetails } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";

class QuoteDetailsForm extends Component {
  state = { errors: {}, consultationDate: new Date().toISOString(), address: "", notes: "" };

  componentDidMount() {
    this.props.getQuote(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.quote) {
      const { quote } = nextProps;
      console.log(quote);
      this.setState({
        consultationDate: quote.consultationDate || "",
        address: quote.address || "",
        notes: quote.notes || "",
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { consultationDate, address, notes } = this.state;
    this.props.updateQuoteDetails(this.props.match.params.id, { consultationDate, address, notes }, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="quoteDetailsForm">
        <h1>Edit Quote Details</h1>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="consultationDate"
              type="date"
              value={this.state.consultationDate.split("T")[0]}
              onChange={this.onChange}
              error={errors.handle}
              info="The date a sales person will visit the location"
              label="Consultation Date"
            />

            <TextAreaFieldGroup
              name="address"
              label="Address"
              placeholder="123 Main St."
              value={this.state.address}
              onChange={this.onChange}
              error={errors.handle}
              info="Address of the garage"
              rows={4}
            />

            <TextAreaFieldGroup
              name="notes"
              label="Notes"
              value={this.state.notes}
              onChange={this.onChange}
              error={errors.handle}
              info="Notes regarding this quotes"
              rows={10}
            />

            <input type="submit" value="Save" className="btn btn-primary btn-block mt-4" />
          </form>
        )}
      </div>
    );
  }
}

QuoteDetailsForm.propTypes = {
  quote: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quote: state.quotes.quote,
  errors: state.errors,
  loading: state.quotes.loading,
});

export default connect(
  mapStateToProps,
  { getQuote, updateQuoteDetails }
)(withRouter(QuoteDetailsForm));
