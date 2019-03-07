import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { getQuote, updateQuoteDetails } from "../../actions/quoteActions";
import { getLeads } from "../../actions/leadActions";
import Spinner from "../common/Spinner";

class QuoteDetailsForm extends Component {
  state = { errors: {}, consultationDate: new Date().toISOString(), address: "", notes: "", lead: "" };

  componentDidMount() {
    this.props.getQuote(this.props.match.params.id);
    this.props.getLeads();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.quote) {
      const { quote } = nextProps;

      if (!quote.lead) {
        return;
      }
      this.setState({
        consultationDate: quote.consultationDate || "",
        address: quote.address || "",
        notes: quote.notes || "",
        lead: quote.lead._id || "",
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { consultationDate, address, notes, lead } = this.state;
    this.props.updateQuoteDetails(
      this.props.match.params.id,
      { consultationDate, address, notes, lead },
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    const { quotesLoading, leadsLoading, leads } = this.props;

    const leadOptions =
      leads &&
      leads
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(lead => ({ label: `${lead.name} (${lead.email})`, value: lead._id }));
    console.log(leads);
    return (
      <div className="quoteDetailsForm">
        <h1>Edit Quote Details</h1>

        {quotesLoading || leadsLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmit}>
            <SelectListGroup
              placeholder="Status"
              name="lead"
              value={this.state.lead}
              onChange={this.onChange}
              options={leadOptions}
              error={errors.status}
              info="Give us an idea of where you are at in your career"
            />

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
              info="Notes regarding this quote"
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
  leads: state.leads.leads,
  errors: state.errors,
  quotesLoading: state.quotes.loading,
  leadsLoading: state.leads.loading,
});

export default connect(
  mapStateToProps,
  { getQuote, updateQuoteDetails, getLeads }
)(withRouter(QuoteDetailsForm));
