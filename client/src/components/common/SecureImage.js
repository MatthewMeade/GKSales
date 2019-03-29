import React, { Component } from "react";
import axios from "axios";

import Spinner from "./Spinner";

class SecureImage extends Component {
  state = {
    blob: null,
  };

  componentDidMount() {
    if (this.state.blob) {
      return;
    }

    const { src } = this.props;

    this.source = axios.CancelToken.source();

    axios
      .get(src, { responseType: "blob", cancelToken: this.source.token })
      .then(({ data }) => {
        const blob = window.URL.createObjectURL(new Blob([data]));
        this.setState({ blob });
      })
      .catch(e => {}); // Throws error when request is cancelled
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    const { blob, loading } = this.state;
    const { alt } = this.props;

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
