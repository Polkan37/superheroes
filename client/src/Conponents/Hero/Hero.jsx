import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHero } from "../../redux/heroesSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBCol,
  MDBCardImage
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import "./hero.scss";
import InfoModal from "../Modals/InfoModal";

const Hero = ({ data }) => {
  const { id, nickname, images } = data;
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  useSelector((state) => {
    return state.heroes;
  });
  const removeTask = () => {
    dispatch(
      deleteHero({
        id: id,
      })
    );
    fetch("/api/heroes/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };
  const showMore = () => {
    info?.length ? setInfo() : setInfo(<InfoModal show={!info} setShow={setInfo} data={data} />)
  }

  return (
    <MDBCol className="mb-2 hero-card">
      <MDBCard>
        <MDBCardImage className="hero__image " src={images.length ? images[0] : 'https://wwwen.uni.lu/var/storage/images/media/images/lcl_images/no_picture/1416637-1-fre-FR/no_picture.png'} position='top' alt={nickname} />
        <MDBCardBody className="pt-2">
          <MDBCardTitle>{nickname}</MDBCardTitle>
          {info}
          <MDBBtn className="m-2" color="info" onClick={() => showMore()}>
            More Info
          </MDBBtn>
          <MDBBtn
            className="m-2"
            color="danger"
            onClick={() => {
              removeTask();
            }}
          >
            Delete
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Hero;
