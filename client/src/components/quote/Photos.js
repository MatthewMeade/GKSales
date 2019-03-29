import React, { Component } from "react";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import AddPhotoBtn from "./AddPhotoBtn";
import ExportPhotosBtn from "./ExportPhotosBtn";
import DeletePhotoBtn from "./DeletePhotoBtn";
import SecureImage from "../common/SecureImage";
import DownloadPhotoBtn from "./DownloadPhotoBtn";
import PopupModal from "../common/PopupModal";

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
    popupContent: null,
  };

  popupImage = photo => {
    console.log("CLICKED");
    this.setState({
      popupContent: (
        <span className="popupSecureImage">
          <SecureImage src={`/api/uploads/${photo}`} alt="Carousel Item" />
        </span>
      ),
    });
    console.log(this.state);
  };

  onPopupClose = () => {
    this.setState({ popupContent: null });
  };

  render() {
    console.log("RENDERING", this.state);
    const { photos = [] } = this.props;
    const carouselContent = photos.map(photo => (
      <div key={photo} className="carouselItemContainer">
        <SecureImage src={`/api/uploads/${photo}`} alt="Carousel Item" />
        <div className="carouselItemContent">
          <h5>{photo.split("_")[1]}</h5>
        </div>
      </div>
    ));

    const fileListItems = photos.map((photo, i) => (
      <div key={photo} className="row mb-3 fileRow" onClick={this.onFileNameClicked.bind(this, i)}>
        <div className="col text-left fileListItem">
          <h5 className={this.state.curFileSlide === i ? "active" : ""}>
            {photo
              .split("_")
              .slice(1)
              .join()}
          </h5>
        </div>

        <div className="col text-right">
          <span className="btn btn-primary mr-4" onClick={() => this.popupImage(photo)}>
            <i className="fas fa-expand-arrows-alt " />
          </span>
          <DownloadPhotoBtn fileName={photo} />
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
        <div className="row p-3">
          {photos.length ? (
            <div className="col-lg-6 pl-4 pr-4">
              <Slider
                ref={c => (this.slider = c)}
                className="clearifx"
                dots={true}
                infinite={true}
                adaptiveHeight={false}
                initialSlide={this.state.curFileSlide}
                arrows={false}
                afterChange={this.onSlideChanged}
              >
                {carouselContent}
              </Slider>
            </div>
          ) : (
            <h4 className="p-5 noPhotosMsg">No Photos Attached</h4>
          )}

          <div className="col-lg-6 fileList">{fileListItems}</div>
        </div>
        <PopupModal active={this.state.popupContent !== null} onPopupClose={this.onPopupClose}>
          {this.state.popupContent}
        </PopupModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.quotes.quote.photos,
});

export default connect(mapStateToProps)(Photos);
