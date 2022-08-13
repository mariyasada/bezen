import React from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNotes } from "../../Context/useNotes";
import "./Modal.css";

const NoteModal = ({ setIsOpen }) => {
  const { noteData, setNoteData, addNotes, isEditing, setIsEditing, editNote } =
    useNotes();

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNoteData((prevData) => ({ ...prevData, [name]: value }));
  };
  const clickHandler = (e) => {
    e.preventDefault();
    if (
      noteData.title === "" ||
      noteData.content === "" ||
      noteData.tagLine === ""
    ) {
      toast("please fill all the fields", { icon: "✔" });
    } else if (noteData && isEditing) {
      editNote({ ...noteData, date: new Date().toLocaleDateString() });
      setIsEditing(!isEditing);
      setIsOpen(false);
      setNoteData({ title: "", content: "", tagLine: "" });
    } else {
      addNotes(noteData);
      setIsOpen(false);
      setNoteData({ title: "", content: "", tagLine: "" });
    }
  };

  const cancelHandler = () => {
    setIsOpen(false);
    setNoteData({ title: "", content: "", tagLine: "" });
  };
  return (
    <div className="modal-background">
      <div className="modal-container create-note-modal">
        <header className="modal-header flex-center">
          <h3>{isEditing ? "Edit Note" : "Create Note"}</h3>
          <button className="close-icon" onClick={cancelHandler}>
            <IoClose />
          </button>
        </header>
        <form className="add-note-container">
          <input
            type="text"
            className="note-title"
            placeholder="Enter Title.."
            name="title"
            onChange={changeHandler}
            value={noteData.title}
          />
          <textarea
            id="note-desc"
            cols="10"
            rows="10"
            className="note-content"
            placeholder="Enter Content.."
            name="content"
            onChange={changeHandler}
            value={noteData.content}
          />
          <div className="add-note-footer">
            <div className="note-select">
              <label htmlFor="note-label" className="label md-text">
                Tagline:
              </label>
              <input
                type="text"
                className="note-tagline"
                placeholder="Enter Tag..."
                name="tagLine"
                onChange={changeHandler}
                value={noteData.tagLine}
              />
              <label htmlFor="note-label" className="label md-text">
                Color:
              </label>
              <select
                id="note-label"
                className="note-tagline"
                name="color"
                value={noteData.color}
                onChange={changeHandler}
              >
                <option value="">None</option>
                {[
                  "blueviolet",
                  "burlywood",
                  "cornsilk",
                  "lightblue",
                  "lightgreen",
                  "yellow",
                  "pink",
                ].map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                className="btn-add create-note-btn"
                onClick={clickHandler}
              >
                {isEditing ? "Update Note" : "Create Note"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
