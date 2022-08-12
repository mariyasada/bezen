import { BsPinFill } from "react-icons/bs";
import "../NoteCard/notecard.css";
import { useNotes } from "../../Context/useNotes";

export const PinnedCard = ({ note }) => {
  const { removeFromPinnedNotes } = useNotes();
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
            <BsPinFill
              title="pinned Notes"
              onClick={() => removeFromPinnedNotes(note)}
            />
          </button>
        </div>
      </div>
      <div className="notes-label-priority md-text">
        <div className="notes-label-name">{note.tagLine}</div>
      </div>
      <div className="note-footer">
        <p className="note-date">{note.date}</p>
      </div>
    </div>
  );
};
