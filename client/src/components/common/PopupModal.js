import React, { Component } from "react";

// Toggleable popup modal
class PopupModal extends Component {
  state = { active: false };

  componentWillReceiveProps(nextProps) {
    // Set the state to the provided active prop
    if (nextProps.active !== undefined) {
      this.setState({ active: !!nextProps.active });
    }
  }

  close = () => {
    // Disable
    this.props.onPopupClose();
    this.setState({ active: false });
  };

  render() {
    // Render empty element if inactive
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
