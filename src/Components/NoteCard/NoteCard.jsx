import { BsPin, BsPinFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useState } from "react";
import "./notecard.css";
import { useNotes } from "../../Context/useNotes";

export const NoteCard = ({ note, setIsOpen, isOpen }) => {
  const {
    deleteNote,
    isEditing,
    setIsEditing,
    setNoteData,
    addToPinnedNote,
    removeFromPinnedNotes,
  } = useNotes();

  const editNoteHandler = (note) => {
    setIsEditing(true);
    setIsOpen(!isOpen);
    setNoteData(note);
  };
  return (
    <div
      className="card notes-card card-with-dismiss"
      style={{ backgroundColor: note.color }}
    >
      <div className="card-header">
        <div className="card-left">
          <h5 className="card-title lg-text flex-center">{note.title}</h5>
          <p className="card-text">{note.content}</p>
        </div>
        <div className="card-right">
          <button className="close-icon transparent">
            {note.isPinned ? (
              <BsPinFill
                title="pinned Notes"
                onClick={() => removeFromPinnedNotes(note)}
              />
            ) : (
              <BsPin
                title="UnPinned Notes"
                onClick={() => addToPinnedNote(note)}
              />
            )}
          </button>
        </div>
      </div>
      <div className="notes-label-priority md-text">
        <div className="notes-label-name">{note.tagLine}</div>
      </div>
      <div className="note-footer">
        <p className="note-date">{note.date}</p>
        <div className="note-action-btns">
          <button className="action-btn" onClick={() => editNoteHandler(note)}>
            <MdOutlineModeEditOutline />
          </button>
          <button
            className="action-btn"
            title="delete"
            onClick={() => deleteNote(note)}
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
