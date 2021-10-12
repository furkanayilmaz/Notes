import NoteItem from './NoteItem';

const NoteList = ({ data, handleDelete }) => {

	return (
		<>
			{
			data.map((note) => {
				const { id, title } = note;
				return (
					<NoteItem
						key={id}
						note={title}
						id={id}
						handleDelete={handleDelete}
					></NoteItem>
				);
			})}
		</>
	);
};

export default NoteList;
