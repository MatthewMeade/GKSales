import React, { Component } from "react";
import { connect } from "react-redux";
import { addPhoto } from "../../../../actions/quoteActions";

import PropTypes from "prop-types";

class AddPhotoBtn extends Component {
  onChange = e => {
    e.preventDefault();

    this.props.addPhoto(this.props.quoteID, e.target.files[0]);
    e.value = null;
  };

  render() {
    return (
      <div>
        <label className="btn btn-primary">
          Add Photo
          <input type="file" name="photo" style={{ display: "none" }} onChange={this.onChange} />
        </label>
      </div>
    );
  }
}

AddPhotoBtn.propTypes = {
  quoteID: PropTypes.string,
};

const mapStateToProps = state => ({
  quoteID: state.quotes.quote._id,
});

export default connect(
  mapStateToProps,
  { addPhoto }
)(AddPhotoBtn);
