export const noteReducer=(state,action)=>{
    switch (action.type) {
        case "ADD_NOTE":
            return {...state,notesList:[...state.notesList,action.payload]}
            
        case "LOAD_DATA":
            return {...state,notesList:action.payload}   
    
        case "DELETE_NOTE":
                return {...state,notesList:state.notesList.filter(note=>note.id !== action.payload.id)}
        
        case "UPDATE_NOTE":
           return {...state,notesList:[...state.notesList.map(note=>note.id===action.payload.id? action.payload:note)]}; 
         
         case "ADD_TO_PINNED":
            return {...state,pinnedNoteList:[...state.pinnedNoteList,action.payload],notesList:state.notesList.filter(note=> note.id !== action.payload.id)}  
        
        case "REMOVE_FROM_PINNED":
           return {...state,notesList:[...state.notesList,action.payload],pinnedNoteList:state.pinnedNoteList.filter(note=>note.id !== action.payload.id)}  

        case "LOAD_PINNED_DATA":
            return {...state,pinnedNoteList:action.payload}   
            
        default:
            return state;
    }
}