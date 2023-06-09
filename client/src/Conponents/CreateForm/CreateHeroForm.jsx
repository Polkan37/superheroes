import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addHero } from "../../redux/heroesSlice";
import { MDBInput, MDBRow, MDBBtn, MDBModalBody, MDBModalFooter, MDBTextArea, MDBInputGroup } from 'mdb-react-ui-kit';
import './createHeroForm.scss'
const newHero = {
	nickname: '',
	real_name: '',
	origin_description: '',
	superpowers: '',
	catch_phrase: '',
	images: []
}

const CreateHero = ({ show }) => {
	const [value, setValue] = useState(newHero);
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();

		if (!value.nickname.trim().length) {
			alert("Nickname is required!!");
			return;
		}

		dispatch(
			addHero({
				nickname: value.nickname,
				real_name: value.real_name,
				origin_description: value.origin_description,
				superpowers: value.superpowers,
				catch_phrase: value.catch_phrase,
				images: value.images
			})
		);
		fetch("/api/heroes/", {
			method: "POST",
			body: JSON.stringify(value)
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			});

		setValue(newHero);
		show(false);
	};


	return (
		<>
			<MDBModalBody>

				<MDBRow className='m-2 g-3 align-items-center'>
					<MDBInput label='Nickname*' title="required" type='text' value={value.nickname} onChange={(event) => setValue({ ...value, nickname: event.target.value })} required />
					<MDBInput label='Real name' type='text' value={value.real_name} onChange={(event) => setValue({ ...value, real_name: event.target.value })} />
					<MDBTextArea label='Description' rows={4} value={value.origin_description} onChange={(event) => setValue({ ...value, origin_description: event.target.value })} />
					<MDBInput label='Superpowers' type='text' value={value.superpowers} onChange={(event) => setValue({ ...value, superpowers: event.target.value })} />
					<MDBInput label='Catch phrase' type='text' value={value.catch_phrase} onChange={(event) => setValue({ ...value, catch_phrase: event.target.value })} />


					<MDBInput label='Image URL' type='url' value={value.images} onChange={(event) => setValue({ ...value, images: [event.target.value] })} />
					<MDBInputGroup className='mb-3'>
						<input className='form-control' type='file' />
					</MDBInputGroup>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={() => show(false)}>
					Close
				</MDBBtn>
				<MDBBtn onClick={onSubmit}>Create</MDBBtn>
			</MDBModalFooter>
		</>
	);
};

export default CreateHero;