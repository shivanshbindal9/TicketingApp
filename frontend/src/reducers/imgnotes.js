const initialState = [];



export default function imgnotes(state=initialState, action) {
  let noteList1 = state.slice();

  switch (action.type) {
    case 'FETCH_IMGNOTES':
      return [...state, ...action.notes]; 
    
    case 'DELETE_IMGNOTE':
      noteList1.splice(action.index, 1);
      return noteList1;
    
    case 'UPDATE_IMGNOTE':
      let noteToUpdate = noteList1[action.index]
      noteToUpdate.statusi = action.note.statusi;
      noteList1.splice(action.index, 1, noteToUpdate);
      return noteList1;

    default:
      return state;
}}
