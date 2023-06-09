import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function Slider({ images }) {
  if (images?.length > 1) {
    return (
      <MDBCarousel showControls showIndicators interval={99999999999}>
        {images.map((image, index) => {
          return (
            <MDBCarouselItem
              key={index}
              className="d-block hero__image"
              itemId={index + 1}
              src={image}
              alt="..."
            />
          );
        })}
      </MDBCarousel>
    );
  } else if(images.length === 1) {
    return (
      <MDBCarousel interval={99999999999}>
        {images.map((image, index) => {
          return (
            <MDBCarouselItem
              key={index}
              className="d-block hero__image"
              itemId={index + 1}
              src={image}
              alt="..."
            />
          );
        })}
      </MDBCarousel>
    );
  }  else {
    return (
      <div>
        <img
          src="https://wwwen.uni.lu/var/storage/images/media/images/lcl_images/no_picture/1416637-1-fre-FR/no_picture.png"
          className="d-block hero__no-image"
          alt="Wild Landscape"
        />
      </div>
    );
  }
}

export default Slider;
