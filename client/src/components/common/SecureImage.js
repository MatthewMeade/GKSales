import React, { Component } from "react";
import axios from "axios";

import Spinner from "./Spinner";

// Weapper around an img tag for images behind jwt authentication
// HTML img tag doesn't send jwt
class SecureImage extends Component {
  state = {
    blob: null, // Photo data
  };

  componentDidMount() {
    // Do nothing if the image has already been fetched
    if (this.state.blob) {
      return;
    }

    // Get url of photo
    const { src } = this.props;

    // Create cancel token
    this.source = axios.CancelToken.source();

    // Fetch the image over http
    // Axios request includes jwt
    axios
      .get(src, { responseType: "blob", cancelToken: this.source.token })
      .then(({ data }) => {
        // Create data blob and a URL pointing at it
        const blob = window.URL.createObjectURL(new Blob([data]));
        this.setState({ blob }); // Save the image in state
      })
      .catch(e => {}); // Throws error when request is cancelled
  }

  componentWillUnmount() {
    // Cancel so setState isn't called if component unmounted
    this.source.cancel();
  }

  render() {
    const { blob, loading } = this.state;
    const { alt } = this.props;

    // Render a spinner if the blob hasn't returned yet
    if (!blob || loading) {
      return (
        <span className="h-100">
          <Spinner />
        </span>
      );
    }

    return <img src={blob} alt={alt} />;
  }
}

export default SecureImage;
