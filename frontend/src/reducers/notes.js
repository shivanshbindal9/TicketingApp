const initialState = [];



export default function notes(state=initialState, action) {
  let noteList = state.slice();

  switch (action.type) {
    case 'FETCH_NOTES':
      return [...action.notes];    

    case 'ADD_NOTE':
      return [...state,  action.note];

    case 'UPDATE_NOTE':
      let noteToUpdate = noteList[action.index]
      noteToUpdate.text = action.note.text;
      noteToUpdate.title = action.note.title;
      noteToUpdate.domain = action.note.domain;
      noteToUpdate.category = action.note.category;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;

    case 'DELETE_NOTE':
      noteList.splice(action.index, 1);
      return noteList;

    default:
      return state;
  }
}
