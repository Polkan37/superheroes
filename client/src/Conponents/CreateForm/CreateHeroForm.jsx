import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addHero } from "../../redux/heroesSlice";
import './createHeroForm.scss'

const AddTodo = () => {
	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();

		if(!value.trim().length)
		{
			alert("Enter a text before adding !!");
			setValue("");
			return;
		}

		dispatch(
			addHero({
				hero: value
			})
		);

		setValue("");
	};

	return (
		<div className="add-form">
			<input
				type="text"
				className="add-form__input"
				placeholder="Add hero"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button className="add-form__button" onClick={onSubmit}>
				Add
			</button>
		</div>
	);
};

export default AddTodo;