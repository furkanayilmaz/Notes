// React Spinners Library -> https://www.npmjs.com/package/react-spinners
import React, { useState, useEffect } from "react";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import BarLoader from 'react-spinners/BarLoader'
import '../src/components/UI/LoaderSpinner.css'

const App = () => {
  const [notes, setNotes] = useState([], () => {
    const localData = localStorage.getItem("notes");
    return localData ? JSON.parse(localData) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 8000)
  }, [])
  

  const addNoteHandler = (notes) => {
    // <--- Arrow Function
    setNotes((prevNotes) => {
      const newNotes = [notes, ...prevNotes];
      localStorage.setItem("notes", JSON.stringify(newNotes));

      return newNotes;
    });
  };

  useEffect(() => {
    const n = JSON.parse(localStorage.getItem("notes"));
    if(n == null){
      alert("No Notes Found!")
      return;
    }
    setNotes(n);
  }, []);

  const printAmountOfNotes = () => {
    for(let i = 0; i < notes.length; i++){
      console.log(i)
      
    }
  }

  printAmountOfNotes()

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    return setNotes(updatedNotes);
  };

  const clearEnteredNotes = () => {
    if (window.confirm("Clear All Notes ?")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="App">
      {
        loading ? 

        <BarLoader
        size={1500}
        color={"#0DAEFF"}
        loading={loading}
        />

        :

        <div>
          <CreateNote onNoteAdd={addNoteHandler} clearNotes={clearEnteredNotes}/>
          <NoteList data={notes} handleDelete={handleDelete} />
        </div>
      }
    </div>

    
  );
  
};

export default App;