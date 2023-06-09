import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function Slider({ images }) {
  if (images?.length) {
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
  } else {
    return (
      <div>
        <img
          src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
          className="d-block hero__image"
          alt="Wild Landscape"
        />
      </div>
    );
  }
}

export default Slider;
