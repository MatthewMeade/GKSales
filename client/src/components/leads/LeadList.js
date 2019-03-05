import React, { Component } from "react";
import PropTypes from "prop-types";

class LeadList extends Component {
  render() {
    const { leads } = this.props;

    return (
      <div>
        {leads.map(lead => (
          <p key={lead._id}>{lead.name}</p>
        ))}
      </div>
    );
  }
}

LeadList.propTypes = {
  leads: PropTypes.array.isRequired,
};

export default LeadList;
