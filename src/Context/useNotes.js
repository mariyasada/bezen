import { createContext, useContext, useReducer, useState,useEffect } from "react";
import { noteReducer } from "./Reducer/NoteReducer";
import { doc, setDoc,collection, addDoc, getDocs, deleteDoc,updateDoc,query,where } from "firebase/firestore";
import { app,db } from "../firebaseConfig";
import toast from "react-hot-toast";


const NoteContext=createContext();
const initialData={
    title:"",
    content:"",
    tagLine:"",
    color:"",
    isPinned:false,
    date:new Date().toLocaleDateString()
};
const initialState={
    notesList:[],
    pinnedNoteList:[]
}
const NoteProvider=({children})=>{
    const[noteData,setNoteData]=useState(initialData);
    const[isEditing,setIsEditing]=useState(false);
    const[state,dispatch]=useReducer(noteReducer,initialState);

    useEffect(()=>{
        getNotes()
        getPinnedNotes()
  },[])

const addNotes=async(noteData)=>{
     try {      
      const noteRef = await addDoc(collection(db, "notes"), noteData);
      noteData.id = noteRef.id;
      await setDoc(noteRef, noteData);
      dispatch({ type: "ADD_NOTE", payload:  noteData  });
      toast("note added",{icon:"✔"});
      
    } catch (e) {
      console.error("Error adding document: ", e);
    } 
}

const getNotes=async()=>{
try {
    const notesQuery=query(collection(db, "notes"),where("isPinned", "==", false)) 
    const allNotesSnapshot=await getDocs(notesQuery); 
    const notes = allNotesSnapshot.docs.map((doc) => doc.data());
    dispatch({ type: "LOAD_DATA", payload: notes });
    } catch (e) {
      console.error("Error while loading a document: ", e);
    } 
}

const deleteNote=async(note)=>{
  try{
      const deleteNoteRef = doc(db, "notes", note.id);
      await deleteDoc(deleteNoteRef);
      dispatch({ type: "DELETE_NOTE", payload:  note });
      toast("note deleted successfully",{icon:"✔"});
  }
  catch (e) {
      console.error("Error while deleting document: ", e);
    } 
}
const editNote=async(noteData)=>{
  const newNoteData={...noteData}
  const noteDataRef=doc(db,"notes",noteData.id);
  try {
      await updateDoc(noteDataRef,newNoteData);
      dispatch({type:"UPDATE_NOTE",payload:noteData})
      toast("note updated",{icon:"✔"});
  }
 catch (e) {
      console.error("Error while updating document: ", e);
    } 
}
const getPinnedNotes=async()=>{
  try{
    const notesQuery=query(collection(db, "notes"),where("isPinned", "==", true)) 
    const allNotesSnapshot=await getDocs(notesQuery); 
    const notes = allNotesSnapshot.docs.map((doc) => doc.data());
    dispatch({ type: "LOAD_PINNED_DATA", payload: notes });
  }
  catch(e)
  {
    console.error("Error while loading document: ", e);
  }
}

const addToPinnedNote=async(noteData)=>{
      try{
        const newNoteData={...noteData,isPinned:true}
        const noteDataRef=doc(db,"notes",noteData.id);  
        await updateDoc(noteDataRef,newNoteData);
        dispatch({type:"UPDATE_NOTE",payload:newNoteData})
        dispatch({type:"ADD_TO_PINNED",payload:newNoteData})
        toast("note pinned",{icon:"✔"});
      }
      catch (e) {
          console.error("Error while adding document: ", e);
        } 
  
}

const removeFromPinnedNotes=async(noteData)=>{
  try{
    const newNoteData={...noteData,isPinned:false}
    const noteDataRef=doc(db,"notes",noteData.id);  
    await updateDoc(noteDataRef,newNoteData);
   dispatch({type:"UPDATE_NOTE",payload:newNoteData});
   dispatch({type:"REMOVE_FROM_PINNED",payload:newNoteData});
   toast("note unpinned",{icon:"✔"});
   
  }
  catch (e) {
      console.error("Error while adding document: ", e);
    } 
}


    return <NoteContext.Provider value={{noteData,setNoteData,state,dispatch,addNotes,deleteNote,editNote,isEditing,setIsEditing,addToPinnedNote,removeFromPinnedNotes}}>{children}</NoteContext.Provider>
}
const useNotes=()=>useContext(NoteContext);

export{useNotes,NoteProvider};