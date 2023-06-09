import React from "react";
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

const Hero = ({ data }) => {
  const { id, nickname, images } = data;
  const dispatch = useDispatch();

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
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <MDBCol className="mb-3" md="4">
      <MDBCard>
        <Slider images={images}/>
        <MDBCardBody className="pt-2">
          <MDBCardTitle>{nickname}</MDBCardTitle>

          <MDBBtn className="m-2" color="info">
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
