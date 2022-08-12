import React from "react";
import "./header.css";
import { FaPlus } from "react-icons/fa";
import NoteModal from "../AddNoteModal/NoteModal";

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <nav className="Header-container flex-center ">
      <div className="heading-in-note-page flex-center">
        <span className="name-of-app">
          <em>Zen Notes </em>
        </span>

        <button
          className="btn-add flex-center ml-4 gap"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus />
          Note
        </button>
      </div>
      {isOpen && <NoteModal setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Header;
