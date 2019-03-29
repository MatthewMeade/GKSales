import React, { Component } from "react";

class PopupModal extends Component {
  state = { active: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined) {
      this.setState({ active: !!nextProps.active });
    }
  }

  close = () => {
    this.props.onPopupClose();
    this.setState({ active: false });
  };

  render() {
    if (!this.state.active) {
      return <span />;
    }

    return (
      <div className="popupModal">
        <div className="bg" onClick={this.close} />
        <div className="body">
          <div className="closeBtn" onClick={this.close}>
            <i className="far fa-window-close" />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PopupModal;
