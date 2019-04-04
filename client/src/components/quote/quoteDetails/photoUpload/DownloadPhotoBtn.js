import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import axios from "axios";

// Fetches an upload from the server and downloads it
class DownloadPhotoButton extends Component {
  state = {
    blob: "",
  };

  onClick = e => {
    const { fileName } = this.props;

    // Fetch Image
    axios.get(`/api/uploads/${fileName}`, { responseType: "blob" }).then(({ data }) => {
      // Create data blob
      const blob = window.URL.createObjectURL(new Blob([data]));
      this.setState({ blob }); // Point link at blob
      this.link.click(); // Simulate click on download link
    });
  };

  render() {
    const { fileName } = this.props;
    return (
      <span>
        <span className="btn btn-primary d-inline-block mr-4" onClick={this.onClick}>
          <i className="fas fa-download" />
        </span>

        <a
          style={{ display: "none" }}
          href={this.state.blob}
          ref={c => (this.link = c)}
          // Remove timestamp from photo name
          download={fileName
            .split("_")
            .slice(1)
            .join()}
        >
          Download
        </a>
      </span>
    );
  }
}

DownloadPhotoButton.propTypes = {
  photos: PropTypes.array,
};

const mapStateToProps = state => ({
  photos: state.quotes.quote.photos,
});

export default connect(mapStateToProps)(DownloadPhotoButton);
