import React, { useState } from 'react';
import './UI/CreateNote.css';
import './UI/DeleteNoteButton.css';
const CreateNote = (props) => {
	const [input, setNote] = useState(''); // <- Array Destructuring

	const noteInputHandler = (event) => {
		// <- Arrow Function
		setNote(event.target.value);
	};

	const noteInputAddingHandler = (event) => {
		event.preventDefault();

		const noteData = {
			id: Math.random().toString(), // Generating a random ID for every item <- Warning: Might generate the same number again.
			title: input,
		};

		if(input === ""){
			alert("Please Enter A Note!")
			return;
		}

		if(input !== ""){
			alert("Note Is Saved Successfully!")
		}

		props.onNoteAdd(noteData);
		setNote('');
	};

	const clearNotes = () => {
		props.clearNotes()
	}

	return (
		<div id="fields">
			<input
				type='text'
				id="inputField"
				onChange={noteInputHandler}
				placeholder='Enter Note'
				required
				value={input}
			/>
			<button type='submit' onClick={noteInputAddingHandler} id="buttonAdd">
				Add Note
			</button>

			<button type='submit' onClick={clearNotes} id="buttonClear">
				Clear Notes
			</button>
		</div>
	);
};

export default CreateNote;
