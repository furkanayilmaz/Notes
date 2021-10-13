// React Spinners Library -> https://www.npmjs.com/package/react-spinners
// React CSS Library -> https://www.npmjs.com/package/@emotion/react
// https://www.telerik.com/blogs/how-to-show-and-hide-elements-in-react
// https://cogoport.github.io/cogo-toast/

import React, { useState, useEffect } from "react";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import BarLoader from 'react-spinners/BarLoader'
import { css } from '@emotion/react'
import cogoToast from "cogo-toast";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: #ffffff;
  width: 250px;
  height: 10px;
`;


const App = () => {
  const [notes, setNotes] = useState([], () => {
    const localData = localStorage.getItem("notes");
    return localData ? JSON.parse(localData) : [];
  });

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#524297")
  let [text, setText] = useState(false);

  useEffect(() => {
    setLoading(true);
    setText(true)
    setTimeout(() =>{
      setLoading(false);
      setText(false)
    }, 1500);
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
      //alert("No Notes Found!")
      cogoToast.warn("No Notes Found!", { position: 'top-right', heading: 'Information' });

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

  const onErrorNote = () => {
    cogoToast.error("Enter Note!", { position: 'top-right', heading: 'Error!' });
  }

  const onSuccessNote = () => {
    cogoToast.success("Success!", { position: 'top-right', heading: 'Success!' });
  }

  return (
    <div className="App">
      <div>
        <h2 style={{
          textAlign: 'center',
          fontSize: 50,
          color: 'gold',
          display: text ? "block" : "none"
        }}>Loading...</h2>
      </div>
      {
        loading ? 

        <BarLoader color={color} loading={loading} css={override} speedMultiplier={1.5} size={999} />

        

        :

        <div>
          <CreateNote onNoteAdd={addNoteHandler} clearNotes={clearEnteredNotes} onErrorNote={onErrorNote} onSuccessNote={onSuccessNote}/>
          <NoteList data={notes} handleDelete={handleDelete} />
        </div>
      }
    </div>

    
  );
  
};

export default App;