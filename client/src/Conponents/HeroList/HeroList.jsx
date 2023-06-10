import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addHero } from "../../redux/heroesSlice";
import Hero from "../Hero/Hero";
import "./heroList.scss";
import Pagination from "../Pagination/Pagination";
const HeroList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const heroes = useSelector((state) => {
    return state.heroes;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = heroes.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(heroes.length / recordsPerPage);

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
      <MDBContainer className="shadow-0 text-center">
        <MDBRow>
          {currentRecords?.length ? (
            currentRecords.map((hero, index) => (
              <Hero key={index} data={hero} />
            ))
          ) : (
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </MDBRow>
        <MDBRow className="d-flex justify-content-center mt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default HeroList;
