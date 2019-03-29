import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import Slider from "react-slick";

import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { updateQuoteDetails, getQuote } from "../../actions/quoteActions";
import Spinner from "../common/Spinner";

import MarbleImg from "../../img/MarbleExample.JPG";
import FlakeImg from "../../img/FlakeExample.JPG";
import EpoxyImg from "../../img/EpoxyExample.JPG";
import QuoteFormSaveBtns from "./QuoteFormSaveBtns";

class FloorForm extends Component {
  state = {
    floorType: "",
    baseColor: "",
    colorsFlake: "",
    colorComment: "",
    showFloorCarousel: "",
  };

  componentWillMount() {
    this.props.getQuote(this.props.match.params.id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.quote.floor) {
      this.setState({ ...nextProps.quote.floor });
    }
  }

  onChange = (value, name) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  onSaveBtnPressed = redirectLocation => {
    this.props.updateQuoteDetails(this.props.quote._id, { floor: this.state }, this.props.history, redirectLocation);
  };

  render() {
    const { floorType, baseColor, colorsFlake, colorComment } = this.state;
    const { errors } = this.props;

    const floorTypes = [
      {
        name: "flake",
        label: "Signature Polyaspartic Flake Floor",
        imgUrl: FlakeImg,
      },
      {
        name: "epoxy",
        label: "Solid Epoxy Floor",
        imgUrl: EpoxyImg,
      },
      {
        name: "marbled",
        label: "Decorative Marbled Epoxy Floor",
        imgUrl: MarbleImg,
      },
    ];

    const floorTypeCarouselContent = floorTypes.map(floor => {
      return (
        <div className="carouselItemContainer" key={floor.name}>
          <img src={floor.imgUrl} alt="Floor" />
          <div className="carouselItemContent">
            <h5>{floor.label}</h5>

            {this.state.floorType !== floor.name ? (
              <p className="btn btn-primary" onClick={() => this.setState({ floorType: floor.name })}>
                Select This Floor
              </p>
            ) : (
              <p className="btn btn-success" onClick={() => this.setState({ floorType: floor.name })}>
                Currently Selected Floor
              </p>
            )}
          </div>
        </div>
      );
    });

    const floorTypeSelectOptions = floorTypes.map(floor => ({
      label: floor.label,
      value: floor.name,
    }));

    let floorTypeSlider = null;

    if (this.state.showFloorCarousel) {
      floorTypeSlider = (
        <Slider infinite={true} adaptiveHeight={true} afterChange={this.onSlideChanged} className="floorFormCarousel">
          {floorTypeCarouselContent}
        </Slider>
      );
    }

    return (
      <div className="floorForm">
        <Link className="btn btn-primary mb-4" to={`/quotes/${this.props.quote._id}`}>
          <i className="fas fa-backspace pr-3" />
          Cancel
        </Link>

        <h3 className="mb-4">
          Floor Options{" "}
          <span
            className="carouselToggle btn btn-outline-dark"
            onClick={() =>
              this.setState({
                showFloorCarousel: !this.state.showFloorCarousel,
              })
            }
          >
            Hide / Show Images
          </span>
        </h3>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={e => e.preventDefault()}>
            {floorTypeSlider}

            <SelectListGroup
              name="floorType"
              label="Floor Type"
              value={floorType || ""}
              onChange={this.onChange}
              options={floorTypeSelectOptions}
              error={errors.floorType}
            />

            <SelectListGroup
              name="baseColor"
              label="Base Color"
              value={baseColor || ""}
              onChange={this.onChange}
              options={[
                { label: "Red", value: "red" },
                { label: "Orange", value: "orange" },
                { label: "Yellow", value: "yellow" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
                { label: "Violet", value: "violet" },
              ]}
              error={errors.baseColor}
            />

            <SelectListGroup
              name="colorsFlake"
              label="Flake Color"
              value={colorsFlake || ""}
              onChange={this.onChange}
              options={[
                { label: "Red", value: "red" },
                { label: "Orange", value: "orange" },
                { label: "Yellow", value: "yellow" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
                { label: "Violet", value: "violet" },
              ]}
              error={errors.colorsFlake}
            />

            <TextAreaFieldGroup
              name="colorComment"
              label="Comments"
              value={colorComment}
              onChange={this.onChange}
              error={errors.colorComment}
              rows={4}
            />

            <QuoteFormSaveBtns onSaveBtnPressed={this.onSaveBtnPressed} currentPage="floorOptions" />
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  quote: state.quotes.quote,
  errors: state.errors,
  loading: state.quotes.loading,
});

const mapDispatchToProps = { getQuote, updateQuoteDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloorForm);
