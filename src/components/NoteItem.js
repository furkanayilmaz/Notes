import React from 'react';
import './UI/NoteItem.css';

const NoteItem = ({ handleDelete, id, note }) => {

	return(
		<div id="wrapper-noteitem">
			<h3 onClick={() => handleDelete(id)} id="noteItem">{note}</h3>
		</div>
	)
};

export default NoteItem;
