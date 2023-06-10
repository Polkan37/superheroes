import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { home } from "../Constants/homeUrl";

function Slider({ images }) {
  if (images?.length > 1) {
    return (
      <MDBCarousel showControls showIndicators interval={99999999999}>
        {images.map((image, index) => {
          return (
            <MDBCarouselItem
              key={index}
              className="d-block carousel__image"
              itemId={index + 1}
              src={home + image}
              alt="..."
            />
          );
        })}
      </MDBCarousel>
    );
  }
  if (images.length <= 1) {
    return (
      <MDBCarousel className="d-block" interval={99999999999}>
        <MDBCarouselItem
          className="d-block carousel__image"
          src={
            images.length
              ? `${home}${images[0]}`
              : "https://wwwen.uni.lu/var/storage/images/media/images/lcl_images/no_picture/1416637-1-fre-FR/no_picture.png"
          }
          alt=""
        />
      </MDBCarousel>
    );
  }
}

export default Slider;
