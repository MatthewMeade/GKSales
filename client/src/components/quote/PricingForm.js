import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { updateQuoteDetails, getQuote } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";
import InputSlider from "../common/InputSlider";

import FloorInfo from "./FloorInfo";
import JobInfo from "./JobInformation";
import AdditionalCostInput from "./AdditionalCostInput";
import CheckboxToggle from "../common/CheckboxToggle";
import CheckBoxGroup from "../common/CheckboxGroup";

class PricingForm extends Component {
  state = {
    pricePerSqft: 5,
    additionalCosts: [],
    depositPaid: false,
    jobPaid: false,
  };

  componentWillMount() {
    this.props.getQuote(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.quote.pricing) {
      this.setState({ ...nextProps.quote.pricing });
    }
  }

  onChange = (value, name) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateQuoteDetails(this.props.quote._id, { pricing: this.state }, this.props.history);
  };

  renderAdditionalCostInputs = () => {
    const inputs = this.state.additionalCosts.map(cost => (
      <AdditionalCostInput
        key={cost.id}
        costObj={cost}
        onChange={this.onAdditionalCostChanged}
        onDelPress={this.onDeleteAdditionalCost}
      />
    ));

    if (inputs.length === 0) {
      return (
        <h5 className="text-center" onClick={this.addAdditionalCost}>
          Click "Add Cost" to add additional costs
        </h5>
      );
    }

    return inputs;
  };

  onAdditionalCostChanged = (id, prop, value) => {
    const costs = [...this.state.additionalCosts].map(obj => {
      if (obj.id === id) {
        obj[prop] = value;
      }

      return obj;
    });

    this.setState({ additionalCosts: costs });
  };

  addAdditionalCost = () => {
    const costs = [...this.state.additionalCosts];

    costs.push({
      id: costs.length,
      name: "",
      price: 0,
      isPerSqft: false,
    });

    this.setState({ additionalCosts: costs });
  };

  sumAdditionalCost = () => {
    return this.state.additionalCosts.reduce(
      (p, c) => p + parseFloat(c.isPerSqft ? c.price * this.props.quote.job.squareFootage : c.price),
      0
    );
  };

  onDeleteAdditionalCost = id => {
    const costs = [...this.state.additionalCosts].filter(c => c.id !== id);

    this.setState({ additionalCosts: costs });
  };

  render() {
    const { pricePerSqft, depositPaid, jobPaid } = this.state;
    const { quote } = this.props;
    const sqft = (quote.job && quote.job.squareFootage) || 0;

    return (
      <div className="pricingForm">
        <div className="row">
          <div className="col-md">
            <h3 className="mb-4">Quote Pricing</h3>
          </div>

          <div className="col-md text-md-right">
            <h3>Current Total: ${(this.sumAdditionalCost() + sqft * pricePerSqft).toFixed(2)}</h3>
          </div>
        </div>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmit}>
            <h4 className="row mb-5">
              <div className="col-md-3 text-left">
                <CheckBoxGroup
                  name="depositPaid"
                  label="Deposit Paid"
                  labelPos="right"
                  value={depositPaid}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 text-left">
                <CheckBoxGroup
                  name="jobPaid"
                  label="Job Paid"
                  labelPos="right"
                  value={jobPaid}
                  onChange={this.onChange}
                />
              </div>
            </h4>

            <JobInfo quote={this.props.quote} hideBtn={true} hideNotes={true} />

            <FloorInfo quote={this.props.quote} hideBtn={true} hideNotes={true} />

            <div className="row mb-4">
              <div className="col-md-6">
                <h4>Price Per Square Foot {`$${pricePerSqft.toFixed(2)}`}</h4>
              </div>
              <div className="col-md-6 text-md-right">
                <h4>Total Area Price: {`$${(pricePerSqft * sqft).toFixed(2)}`}</h4>
              </div>
            </div>

            <InputSlider
              min={0}
              max={10}
              step={0.1}
              value={pricePerSqft}
              label={`Price Per Square Foot: $${pricePerSqft.toFixed(2)}`}
              onChange={this.onChange}
              name="pricePerSqft"
              formatLabel={value => `$${value.toFixed(2)}`}
            />

            <div className="row">
              <div className="col">
                <h3>Additional Costs: ${this.sumAdditionalCost().toFixed(2)}</h3>
              </div>
              <div className="col text-right">
                <p className="btn btn-primary" onClick={this.addAdditionalCost}>
                  Add Cost
                </p>
              </div>
            </div>

            <div className="row addCostHeading d-sm-none d-md-flex text-center">
              <div className="col-md-4">Name</div>
              <div className="col-md-4">Per Sqft / Flat Price</div>
              <div className="col-md-3">Price</div>
            </div>

            {this.renderAdditionalCostInputs()}

            <input type="submit" value="Save" className="btn btn-primary btn-block mt-4 saveBtn" />
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  quote: state.quotes.quote,
  errors: state.errors,
  loading: state.quotes.loading,
});

const mapDispatchToProps = { getQuote, updateQuoteDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PricingForm);
