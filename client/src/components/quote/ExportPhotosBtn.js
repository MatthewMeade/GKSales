import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import axios from "axios";

class ExportPhotosButton extends Component {
  onClick = e => {
    // Get the file list
    const { photos } = this.props;

    // Request file
    axios
      .post("/api/uploads/export", { photos }, { responseType: "blob" })
      .then(response => {
        // Create a url for the zip file blob
        const blobURL = window.URL.createObjectURL(new Blob([response.data]));

        // Point button at blob url
        this.setState({ blobURL });

        // Click download button
        this.link.click();
      });
  };

  state = {
    blobURL: "",
  };

  render() {
    return (
      <div>
        <button className="btn btn-info" onClick={this.onClick}>
          Export Photos
        </button>

        <a
          style={{ display: "none" }}
          href={this.state.blobURL}
          ref={c => (this.link = c)}
          download="photo_export.zip"
        >
          Download
        </a>
      </div>
    );
  }
}

ExportPhotosButton.propTypes = {
  photos: PropTypes.array,
};

const mapStateToProps = state => ({
  photos: state.quotes.quote.photos,
});

export default connect(mapStateToProps)(ExportPhotosButton);
