import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { quoteFormChanged, clearQuote } from "../../actions/quoteActions";
import { getLeads } from "../../actions/leadActions";
import Spinner from "../common/Spinner";

class QuoteDetailsForm extends Component {
  componentWillMount() {
    this.props.clearQuote();
  }

  componentDidMount() {
    this.props.getLeads();

    const { leadId } = this.props.match.params;
    if (leadId) {
      this.props.quoteFormChanged({ prop: "lead", value: leadId });
    }
  }

  render() {
    const { loading, leads, errors, quote } = this.props;

    const leadOptions =
      leads &&
      leads
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(lead => ({
          label: `${lead.name} (${lead.email})`,
          value: lead._id,
        }));

    return (
      <div className="quoteDetailsForm">
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.props.onSubmit}>
            <SelectListGroup
              placeholder="Lead"
              name="lead"
              value={quote.lead}
              onChange={value => this.props.quoteFormChanged({ prop: "lead", value })}
              options={leadOptions}
              error={errors.lead}
              required={true}
              label="Lead"
            />

            <TextFieldGroup
              name="consultationDate"
              type="date"
              value={quote.consultationDate.split("T")[0]}
              onChange={value => this.props.quoteFormChanged({ prop: "consultationDate", value })}
              error={errors.consultationDate}
              label="Consultation Date"
            />

            <TextAreaFieldGroup
              name="address"
              label="Address"
              placeholder="123 Main St."
              value={quote.address}
              onChange={value => this.props.quoteFormChanged({ prop: "address", value })}
              error={errors.handle}
              rows={4}
            />

            <TextAreaFieldGroup
              name="notes"
              label="Notes"
              value={quote.notes}
              onChange={value => this.props.quoteFormChanged({ prop: "notes", value })}
              error={errors.handle}
              rows={10}
            />

            <input type="submit" value="Save" className="btn btn-primary btn-block mt-4" />
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // quote: state.quoteForm,
  leads: state.leads.leads,
  errors: state.errors,
  loading: state.leads.loading,
});

export default connect(
  mapStateToProps,
  { quoteFormChanged, getLeads, clearQuote }
)(withRouter(QuoteDetailsForm));
