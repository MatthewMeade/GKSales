import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";

import { quoteFormChanged, clearQuote } from "../../../actions/quoteActions";
import { getUsers } from "../../../actions/userActions";
import { getLeads } from "../../../actions/leadActions";
import Spinner from "../../common/Spinner";

class QuoteDetailsForm extends Component {
  componentWillMount() {
    this.props.clearQuote();
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getLeads();

    const { leadId } = this.props.match.params;
    if (leadId) {
      this.props.quoteFormChanged({ prop: "lead", value: leadId });
    }
  }

  buildSelectOptions = options =>
    options
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
      .map(item => ({
        label: `${item.name} (${item.email})`,
        value: item._id,
      }));

  onAssignPress = () => this.props.quoteFormChanged({ prop: "salesperson", value: this.props.user.id });

  render() {
    const { loading, leads, errors, quote, users } = this.props;

    const leadOptions = leads && this.buildSelectOptions(leads);
    const salespersonOptions = users && this.buildSelectOptions(users);

    return (
      <div className="quoteDetailsForm">
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={e => e.preventDefault()}>
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

            <div className="row">
              <div className="col-10">
                <SelectListGroup
                  placeholder="Salesperson"
                  name="salesperson"
                  value={quote.salesperson || ""}
                  onChange={value => this.props.quoteFormChanged({ prop: "salesperson", value })}
                  options={salespersonOptions}
                  error={errors.salesperson}
                  required={true}
                  label="Salesperson"
                />
              </div>

              <div className="col-2 d-flex align-items-center pl-0">
                <span className="btn btn-primary p-2 mt-3  w-100" onClick={this.onAssignPress}>
                  <span className="d-none d-lg-block">
                    <i className="fas fa-user pr-2" />
                    Assign to Me
                  </span>
                  <span className="d-lg-none">
                    <i className="d-none d-sm-inline fas fa-user" /> Me
                  </span>
                </span>
              </div>
            </div>

            <TextFieldGroup
              name="consultationDate"
              type="date"
              value={(quote.consultationDate || "").split("T")[0]}
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
  loading: state.leads.loading || state.users.loading,
  users: state.users.users,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { quoteFormChanged, getLeads, clearQuote, getUsers }
)(withRouter(QuoteDetailsForm));
