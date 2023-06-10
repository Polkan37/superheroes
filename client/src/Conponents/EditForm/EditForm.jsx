import React from "react";
import { MDBRow, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import Slider from "../Slider";

export function EditForm({ heroInfo, setHeroInfo }) {
  const [data, setData] = React.useState({...heroInfo});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // take data to submit
    console.log("saving", data.id);
    setHeroInfo(data)
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput className="form-control" type="file">
        <img src={data.images[0]} alt={data.nickname} />
      </MDBInput>
      <MDBRow className="m-2 g-3 align-items-center">
        <MDBInput
          label="nickname"
          name="nickname"
          type="text"
          value={data.nickname}
          onChange={handleChange}
          required
        />
        <MDBInput
          label="real name"
          name="real_name"
          type="text"
          value={data.real_name}
          onChange={handleChange}
        />
        <MDBTextArea
          label="description"
          name="origin_description"
          rows={4}
          value={data.origin_description}
          onChange={handleChange}
        />
        <MDBInput
          label="superpowers"
          name="superpowers"
          type="text"
          value={data.superpowers}
          onChange={handleChange}
        />
        <MDBInput
          label="catch phrase"
          name="catch_phrase"
          type="text"
          value={data.catch_phrase}
          onChange={handleChange}
        />
      </MDBRow>

      <MDBBtn className="me-1" color="success" type="submit">
        Save
      </MDBBtn>
    </form>
  );
}
