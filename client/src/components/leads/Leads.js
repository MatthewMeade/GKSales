import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLeads, refreshLeads } from "../../actions/leadActions";

import { withRouter } from "react-router-dom";
import Table from "../common/Table";

// Leads table page
class Leads extends Component {
  state = { filterStr: "" };

  componentDidMount() {
    this.props.getLeads();
  }

  onDeleteClick = () => {
    this.props.refreshLeads();
  };

  onRowClick = ({ _id }) => {
    this.props.history.push("/leads/" + _id);
  };

  render() {
    const { leads, loading } = this.props;

    return (
      <div className="leadList">
        <div className="row">
          <div className="col-6 col-md-3 order-md-first">
            <h3>Leads</h3>
          </div>
          <div className="col-12 col-md-6 mb-2 order-last order-md-2">
            <input
              className="form-control"
              type="text"
              name="search"
              placeholder="Search"
              onChange={e => this.setState({ filterStr: e.target.value })}
            />
          </div>
          <div className="col-6 col-md-3 text-right order-md-last">
            <button className="btn btn-primary" onClick={this.onDeleteClick}>
              <i className="fas fa-sync pr-2" /> Refresh
            </button>
          </div>
        </div>

        <Table
          headings={[
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "phone", label: "Phone" },
          ]}
          sortBy="date"
          sortDir="desc"
          sortMethod="date"
          filter={this.state.filterStr}
          data={leads}
          loading={loading}
          onRowClick={this.onRowClick}
        />
      </div>
    );
  }
}

Leads.propTypes = {
  leads: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  leads: state.leads.leads,
  loading: state.leads.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    { getLeads, refreshLeads }
  )(Leads)
);
