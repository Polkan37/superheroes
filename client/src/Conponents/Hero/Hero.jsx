import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHero } from "../../redux/heroesSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import "./hero.scss";
import Slider from "../Slider";
import InfoModal from "../InfoModal";

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
    <MDBCol className="mb-3" md="4">
      <MDBCard>
        <Slider images={images} />
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
