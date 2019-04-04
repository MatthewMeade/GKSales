import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getQuote } from "../../../actions/quoteActions";
import InputFieldGroup from "../../common/InputFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import Checkbox from "../../common/Checkbox";

import { updateQuoteDetails } from "../../../actions/quoteActions";
import Spinner from "../../common/Spinner";
import QuoteFormSaveBtns from "./QuoteFormSaveBtns";

class JobInformationForm extends Component {
  state = {
    squareFootage: "0",
    concreteHardness: "0",
    hardnessComments: "",
    cracking: false,
    crackingComments: "",
    verticalSurface: false,
    verticalSurfaceComments: "",
    conditions: "",
  };

  componentWillMount() {
    this.props.getQuote(this.props.match.params.id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.quote.job) {
      this.setState({ ...nextProps.quote.job });
    }
  }

  onChange = (value, name) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  onSaveBtnPressed = redirectLocation => {
    this.props.updateQuoteDetails(this.props.quote._id, { job: this.state }, this.props.history, redirectLocation);
  };

  render() {
    const {
      squareFootage,
      concreteHardness,
      hardnessComments,
      cracking,
      crackingComments,
      verticalSurface,
      verticalSurfaceComments,
      conditions,
    } = this.state;

    const { errors } = this.props;

    return (
      <div className="jobInformationForm">
        <Link className="btn btn-primary mb-4" to={`/quotes/${this.props.quote._id}`}>
          <i className="fas fa-backspace pr-3" />
          Cancel
        </Link>

        <h3>Edit Job Information</h3>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={e => e.preventDefault()}>
            <h4>Square Footage</h4>
            <InputFieldGroup
              type="number"
              placeholder="0"
              name="squareFootage"
              value={squareFootage}
              min={0}
              onChange={this.onChange}
              error={errors.squareFootage}
            />

            <h4>Concrete Hardness</h4>
            <SelectListGroup
              name="concreteHardness"
              value={concreteHardness}
              onChange={this.onChange}
              options={[{ label: 0, value: 0 }, { label: 1, value: 1 }, { label: 2, value: 2 }]}
              error={errors.concreteHardness}
            />

            <TextAreaFieldGroup
              name="hardnessComments"
              label="Hardness Comments"
              value={hardnessComments}
              onChange={this.onChange}
              error={errors.hardnessComments}
              rows={4}
            />

            <h4>
              <Checkbox
                name="cracking"
                label="Cracking?"
                value={cracking}
                onChange={this.onChange}
                error={errors.cracking}
              />
            </h4>
            <TextAreaFieldGroup
              name="crackingComments"
              label="Cracking Comments"
              value={crackingComments}
              onChange={this.onChange}
              error={errors.crackingComments}
              rows={4}
            />

            <h4>
              <Checkbox
                name="verticalSurface"
                label="Vertical Surface?"
                value={verticalSurface}
                onChange={this.onChange}
                error={errors.verticalSurface}
              />
            </h4>
            <TextAreaFieldGroup
              name="verticalSurfaceComments"
              label="Vertical Surface Comments"
              value={verticalSurfaceComments}
              onChange={this.onChange}
              error={errors.verticalSurfaceComments}
              rows={4}
            />

            <h4>Current Garage Floor Conditions</h4>
            <TextAreaFieldGroup
              name="conditions"
              value={conditions}
              onChange={this.onChange}
              error={errors.conditions}
              rows={4}
            />
            <QuoteFormSaveBtns onSaveBtnPressed={this.onSaveBtnPressed} currentPage="jobInfo" />
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quote: state.quotes.quote,
  loading: state.quotes.loading,
  errors: state.errors,
});

const mapDispatchToProps = { getQuote, updateQuoteDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobInformationForm);
