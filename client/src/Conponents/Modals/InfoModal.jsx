import React, { useState } from "react";
import {
  MDBRow,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Slider from "../Slider";
import { EditForm } from "../EditForm/EditForm";

function InfoModal({ show, setShow, data }) {
  const { id, nickname, real_name, origin_description, superpowers, catch_phrase, images } = data
  const [heroInfo, setHeroInfo] = useState({ ...data})
  const [aboutBody, setAboutBody] = useState(showInfo());
  const [staticModal, setStaticModal] = useState(show);

  const toggleShow = () => {
    setStaticModal(!staticModal);
    setShow(!show)
  };
  const handleEditClick = () => {
    setAboutBody(<EditForm heroInfo={heroInfo} setHeroInfo={setHeroInfo} />)
  }

  function showInfo() {

    return (
      <>
        <Slider images={images} />
        <div className="mt-2">
          <p>
            <span className="fw-bolder">Real name: <br /></span>
            {real_name.length ? real_name : 'no such info'}
          </p>
          <p>
            <span className="fw-bolder">Description: <br /></span>
            {origin_description.length ? origin_description : 'no such info'}
          </p>
          <p>
            <span className="fw-bolder">superpowers: <br /></span>
            {superpowers.length ? superpowers : 'no such info'}
          </p>
          <p>
            <span className="fw-bolder">Catch phrase: <br /></span>
            {catch_phrase.length ? catch_phrase : 'no such info'}
          </p>
        </div>
      </>
    )
  }


return (
  <>
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={staticModal}
      setShow={setStaticModal}
    >
      <MDBModalDialog size='lg' centered>
        <MDBModalContent className="bg-light p-2 text-dark">
          <MDBModalHeader>
            <MDBModalTitle><h4>{nickname}</h4></MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody className="info text-start">

            {aboutBody}

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
);
}

export default InfoModal;


