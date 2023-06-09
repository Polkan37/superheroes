import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addHero } from "../../redux/heroesSlice";
import Hero from "../Hero/Hero";
import "./heroList.scss";
import CreateModal from "../CreateModal";

const HeroList = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const heroes = useSelector((state) => {
    return state.heroes;
  });

  useEffect(() => {
    fetch("/api/heroes").then(async (res) => {
      const data = await res.json();
      const result = data.heros;
      setData(result);
      result.map((value) => {
        dispatch(addHero(value));
      });
    });
  }, [dispatch]);

  return (
    <>
      <MDBContainer className="shadow-0">
        <MDBRow>
          {heroes?.length ? (
            heroes.map((hero, index) => <Hero key={index} data={hero} />)
          ) : (
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <CreateModal />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default HeroList;
