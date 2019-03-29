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

    axios.get(src, { responseType: "blob" }).then(({ data }) => {
      const blob = window.URL.createObjectURL(new Blob([data]));
      this.setState({ blob });
    });
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
