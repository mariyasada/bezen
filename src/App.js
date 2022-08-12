
import './App.css';
import Notes from './Components/displayNotes/Notes';
import Header from './Components/Header/Header';
import { Toaster } from "react-hot-toast";
import {useState} from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Notes isOpen={isOpen} setIsOpen={setIsOpen}/>
       <Toaster
        position="top-center"
        toastOptions={{ className: "toast-display", duration: 3000 }}
      />    
    </div>
  );
}

export default App;
