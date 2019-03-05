import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getLeads } from "../../actions/leadActions";

class Leads extends Component {
  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    const { leads, loading } = this.props;
    let leadsContent;

    console.log(loading);

    if (!leads || loading) {
      leadsContent = (
        <tr>
          <td colspan="4">
            <Spinner className="spinner" />
          </td>
        </tr>
      );
    } else {
      leadsContent = leads.map(lead => (
        <tr key={lead._id}>
          <td>{lead.name}</td>
          <td>{lead.email}</td>
          <td>{lead.phone}</td>
          <td>{lead.zip}</td>
        </tr>
      ));
    }

    return (
      <div className="leadList">
        <h3>Leads</h3>
        <table className="table table-striped table-light">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Zip</th>
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
  leads: state.leadList.leads,
  loading: state.leadList.loading,
});

export default connect(
  mapStateToProps,
  { getLeads }
)(Leads);
