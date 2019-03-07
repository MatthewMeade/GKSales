import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getLeads, refreshLeads } from "../../actions/leadActions";

import { withRouter } from "react-router-dom";

class Leads extends Component {
  componentDidMount() {
    this.props.getLeads();
  }

  onDeleteClick = () => {
    this.props.refreshLeads();
  };

  onRowClick = id => {
    this.props.history.push("/lead/" + id);
  };

  render() {
    const { leads, loading } = this.props;
    console.log(leads);
    let leadsContent;

    console.log("PROPS");
    console.log(this.props);

    if (!leads || loading) {
      leadsContent = (
        <tr>
          <td colSpan="4">
            <Spinner className="spinner" />
          </td>
        </tr>
      );
    } else {
      leadsContent = leads.map(lead => (
        // Can't wrap tr in Link, using onRowClick instead
        <tr key={lead._id} onClick={this.onRowClick.bind(this, lead._id)}>
          <td>{lead.name}</td>
          <td>{lead.email}</td>
          <td>{lead.phone}</td>
        </tr>
      ));
    }

    return (
      <div className="leadList">
        <div className="row">
          <div className="col">
            <h3>Leads</h3>
          </div>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={this.onDeleteClick}>
              Refresh
            </button>
          </div>
        </div>
        <table className="table table-striped table-light table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{leadsContent}</tbody>
        </table>
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
