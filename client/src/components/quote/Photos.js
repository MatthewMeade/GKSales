import React, { Component } from "react";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import AddPhotoBtn from "./AddPhotoBtn";
import ExportPhotosBtn from "./ExportPhotosBtn";
import DeletePhotoBtn from "./DeletePhotoBtn";

class Photos extends Component {
  onFileNameClicked = index => {
    this.setState({ curFileSlide: index });
    this.slider.slickGoTo(index);
  };

  onSlideChanged = index => {
    this.setState({ curFileSlide: index });
  };

  state = {
    curFileSlide: 0,
  };

  render() {
    const { photos = [] } = this.props;

    const carouselContent = photos.map(photo => (
      <div key={photo} className="carouselItemContainer">
        <img src={`/api/uploads/${photo}`} />
        <div className="carouselItemContent">
          <h5>{photo.split("_")[1]}</h5>
        </div>
      </div>
    ));

    const fileListItems = photos.map((photo, i) => (
      <div key={photo} className="row mb-3 fileRow" onClick={this.onFileNameClicked.bind(this, i)}>
        <div className="col text-left fileListItem">
          <h5 className={this.state.curFileSlide == i ? "active" : ""}>{photo}</h5>
        </div>

        <div className="col text-right">
          <DeletePhotoBtn fileName={photo} />
        </div>
      </div>
    ));

    return (
      <div className="uploadCarousel">
        <div className="uploadCarouselHead clearfix">
          <h3>Photos</h3>
          <div className="uploadCarouselControls">
            <ExportPhotosBtn />
            <AddPhotoBtn />
          </div>
        </div>

        <div className="row">
          {photos.length ? (
            <div className="col-lg-6 pl-4 pr-4">
              <Slider
                ref={c => (this.slider = c)}
                className="clearifx"
                dots={true}
                infinite={true}
                adaptiveHeight={true}
                initialSlide={this.state.curFileSlide}
                arrows={false}
                afterChange={this.onSlideChanged}
              >
                {carouselContent}
              </Slider>
            </div>
          ) : (
            <h4 className="p-5">No Photos</h4>
          )}

          <div className="col-lg-6 fileList">{fileListItems}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.quotes.quote.photos,
});

export default connect(mapStateToProps)(Photos);