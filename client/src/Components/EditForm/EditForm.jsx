import React from "react";
import { useDispatch } from "react-redux";
import { updateHero } from "../../redux/heroesSlice";
import {
  MDBRow,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { updateData } from "../../helpers/sendData";
import { home } from "../../Constants/homeUrl";
import Slider from "../Slider";

export function EditForm({ heroInfo, setHeroInfo, closeEditor }) {
  const [data, setData] = React.useState({ ...heroInfo });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData(`${home}api/heroes/${heroInfo.id}`, data);

    dispatch(updateHero(data));
    setHeroInfo(data);
    closeEditor();
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        className="carousel__image"
        src={
          data.images.length
            ? `${home}${data.images[0]}`
            : "https://wwwen.uni.lu/var/storage/images/media/images/lcl_images/no_picture/1416637-1-fre-FR/no_picture.png"
        }
        alt=""
      />
      <MDBInputGroup className="mb-3">
        <input
          className="form-control"
          type="file"
          onChange={(event) => {
            setData({
              ...data,
              ...(data.images.length ? { current_link: data.images[0] } : {}),
              image: event.target.files[0],
            });
          }}
          multiple
        />
      </MDBInputGroup>
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
