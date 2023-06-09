import React, { useState } from "react";
import {
  MDBCard,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import CreateForm from './CreateForm/CreateHeroForm';

function CreateModal() {
  const [staticModal, setStaticModal] = useState(false);
  const [modalContent, setModalContent] = useState('...');

  const toggleShow = () => {
    setStaticModal(!staticModal);
    setModalContent(<CreateForm show={setStaticModal} />)
  };

  return (
    <>
      <MDBCol
        className="add-item-button"
        md="4"
        onClick={toggleShow}
        color="Secondary"
      />

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create new hero</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            {modalContent}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default CreateModal;
