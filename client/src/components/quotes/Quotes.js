import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter, Link } from "react-router-dom";

import QuoteTable from "../common/QuoteTable";
import CheckboxToggle from "../common/CheckboxToggle";

class Quote extends Component {
  state = { filterStr: "", salespersonFilter: true };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <h3>Quotes</h3>
          </div>

          <div className="col-4 ">
            <CheckboxToggle
              name=""
              value={this.state.salespersonFilter}
              trueLabel="My Quotes"
              falseLabel="All Quotes"
              onChange={value => this.setState({ salespersonFilter: value })}
            />
          </div>

          <div className="col-4  text-right">
            <Link to="/newQuote" className="btn btn-primary">
              New Quote
            </Link>
          </div>
        </div>

        <input
          className="form-control mt-2 mb-3"
          type="text"
          name="search"
          placeholder="Search"
          onChange={e => this.setState({ filterStr: e.target.value })}
          value={this.state.filterStr}
        />

        <QuoteTable filter={[this.state.filterStr, this.state.salespersonFilter ? this.props.salespersonId : ""]} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  salespersonId: state.auth.user.id,
});

export default withRouter(connect(mapStateToProps)(Quote));
