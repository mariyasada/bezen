import React, { useEffect, useState } from "react";
import { useNotes } from "../../Context/useNotes";
import { NoteCard } from "../NoteCard/NoteCard";
import { PinnedCard } from "../PinnedCard/PinnedCard";
import "./notes.css";

const Notes = ({ isOpen, setIsOpen }) => {
  const { state, dispatch } = useNotes();
  const { notesList, pinnedNoteList } = state;
  const notesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (notesList.length > 0) {
      setTotalPages(Math.ceil(notesList.length / notesPerPage));
      // setCurrentPage(1);
    }
  }, [notesList]);

  const endIndex = notesPerPage * currentPage; //6*1
  const startIndex = endIndex - notesPerPage;
  const paginatedNotes = notesList?.slice(startIndex, endIndex);

  return (
    <div className="All-Notes-container flex-center flex-column">
      {pinnedNoteList.length > 0 && (
        <div className="pinned-notes-container flex-center flex-column">
          <h1 className="xlg-text">Pinned Notes</h1>
          <div className="grid-3">
            {pinnedNoteList.map((note) => {
              return <PinnedCard note={note} key={note.id} />;
            })}
          </div>
        </div>
      )}
      <div className="my-notes-container flex-center flex-column">
        <h1 className="xlg-text">My Notes</h1>
        <div className="grid-3">
          {paginatedNotes.map((note) => {
            return (
              <NoteCard
                note={note}
                key={note.id}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            );
          })}
        </div>
        {totalPages > 1 ? (
          <div className="paginate-container">
            <button
              className={`btn-paginate ${
                currentPage === 1 ? "disabled-cursor" : "cursor"
              }`}
              onClick={() =>
                currentPage !== 1 &&
                setCurrentPage((currentPage) => currentPage - 1)
              }
            >
              Prev
            </button>
            {[...Array(totalPages)].map((page, index) => (
              <button
                key={index}
                className={`btn-paginate ${
                  currentPage === index + 1 ? "primary-btn" : "secondary-btn"
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`btn-paginate ${
                currentPage === totalPages ? "disabled-cursor" : "cursor"
              }`}
              onClick={() =>
                currentPage !== totalPages && setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Notes;
