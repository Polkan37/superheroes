import React from 'react';
import { useDispatch } from "react-redux";
import { deleteHero } from "../../redux/heroesSlice";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import './hero.scss'

const Hero = ({ data }) => {
console.log('data: ', data);
    const { id, nickname, images } = data
    console.log('img: ', images);
    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(
            deleteHero({
                id: id
            })
        )
    }

    return (
        <MDBCol className='mb-3' md='4'>
            <MDBCard>
                <MDBCardImage className='img-fluid hero__image' src={images?.length ? images[0] : 'https://mdbootstrap.com/img/new/standard/nature/184.webp'} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>{nickname}</MDBCardTitle>

                    <MDBBtn className='mx-2' color='info'>More Info</MDBBtn>
                    <MDBBtn className='mx-2' color='danger' onClick={() => {
                        removeTask();
                    }}>Delete</MDBBtn>
                </MDBCardBody>
            </MDBCard>

        </MDBCol>
    );
};

export default Hero;