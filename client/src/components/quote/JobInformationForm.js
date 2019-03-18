import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuote, jobFormChanged } from "../../actions/quoteActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import CheckBoxGroup from "../common/CheckboxGroup";

import { updateQuoteDetails } from "../../actions/quoteActions";

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
    this.props.getQuote(this.props.match.params.id);
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
    this.props.updateQuoteDetails(this.props.quote._id, { job: this.state }, this.props.history);
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
        <h3>Edit Job Information</h3>

        <form onSubmit={this.onSubmit}>
          <h4>Square Footage</h4>
          <TextFieldGroup
            type="number"
            placeholder="0"
            name="squareFootage"
            value={squareFootage}
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
            <CheckBoxGroup
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
            <CheckBoxGroup
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
          <input type="submit" value="Save" className="btn btn-primary btn-block mt-4" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quote: state.quotes.quote,
  errors: state.errors,
});

const mapDispatchToProps = { getQuote, updateQuoteDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobInformationForm);
