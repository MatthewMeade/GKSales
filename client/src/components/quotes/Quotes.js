import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import QuoteTable from "../common/QuoteTable";
import CheckboxToggle from "../common/CheckboxToggle";

class Quote extends Component {
  state = { filterStr: "", salespersonFilter: true };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6 col-md-3 order-md-first">
            <h3>Quotes</h3>
          </div>

          <div className="col-12 col-md-5 mb-2 order-last order-md-2">
            <input
              className="form-control"
              type="text"
              name="search"
              placeholder="Search"
              onChange={e => this.setState({ filterStr: e.target.value })}
              value={this.state.filterStr}
            />
          </div>

          <div className="col-6 col-md-4 text-right order-md-last">
            <CheckboxToggle
              name=""
              value={this.state.salespersonFilter}
              trueLabel="My Quotes"
              falseLabel="All Quotes"
              onChange={value => this.setState({ salespersonFilter: value })}
            />
          </div>
        </div>
        <QuoteTable filter={[this.state.filterStr, this.state.salespersonFilter ? this.props.salespersonId : ""]} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  salespersonId: state.auth.user.id,
});

export default withRouter(connect(mapStateToProps)(Quote));
