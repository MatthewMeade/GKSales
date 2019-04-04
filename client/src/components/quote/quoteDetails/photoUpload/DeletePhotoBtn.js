import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePhoto } from "../../../../actions/quoteActions";

import PropTypes from "prop-types";

// Deletes an associated photo on click
class DeletePhotoBtn extends Component {
  onClick = e => {
    e.preventDefault();

    this.props.deletePhoto(this.props.quoteID, this.props.fileName);
    e.value = null;
  };

  render() {
    return (
      <button className="btn btn-danger" onClick={this.onClick}>
        <i className="fas fa-trash-alt" />
      </button>
    );
  }
}

DeletePhotoBtn.propTypes = {
  quoteID: PropTypes.string,
  fileName: PropTypes.string,
};

const mapStateToProps = state => ({
  quoteID: state.quotes.quote._id,
});

export default connect(
  mapStateToProps,
  { deletePhoto }
)(DeletePhotoBtn);
