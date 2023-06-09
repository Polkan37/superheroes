import React from 'react'
import { MDBRow, MDBInput, MDBTextArea, MDBInputGroup } from "mdb-react-ui-kit";
import Slider from "../Slider";

export function EditForm({ heroInfo, setHeroInfo }) {
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = heroInfo

    return (
        <>
            <MDBInput className='form-control' type='file'>
                <img src={images[0]} />
            </MDBInput>
            <MDBRow className='m-2 g-3 align-items-center'>
                <MDBInput label='nickname' type='text' value={nickname} required />
                <MDBInput label='real name' type='text' value={real_name} />
                <MDBTextArea label='description' rows={4} value={origin_description} />
                <MDBInput label='superpowers' type='text' value={superpowers} />
                <MDBInput label='catch phrase' type='text' value={catch_phrase} />
            </MDBRow>
        </>
    )
}
