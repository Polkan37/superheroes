import React, { useEffect, useMemo, useState } from "react";
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import Hero from '../Hero/Hero';
import { getHeroes } from "../../Api/getHeroes";
import './heroList.scss'

const HeroList = () => {
    const [data, setData] = useState([])
    
    console.log('data: ', data);

	const heroes = useSelector((state)=>{
		return state.heroes;
	});

    useEffect(() => {
        fetch("/api/heroes").then(
            async res => {
                const data = await res.json()
            setData( data.heros)
        }
        )
    }, [])
  
    return (
        <MDBContainer className="shadow-0">
          <MDBRow>
			{data?.length ? [...data, ...heroes].map((hero, index) => (
				<Hero key={index} data={hero} />
			)): ''}
            </MDBRow>
          </MDBContainer>
    );
    
}

export default HeroList;