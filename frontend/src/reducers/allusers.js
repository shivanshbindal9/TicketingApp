const initialState = [];



export default function allusers(state = initialState, action) {
  let noteList1 = state.slice();

  switch (action.type) {
    case 'FETCH_USERS':
      return [...action.notes];

    case 'UPDATE_USERS':
      console.log("reducer for new users fetch");
      let noteToUpdate = noteList1[action.index]
      noteToUpdate.is_superuser = action.note.is_superuser;
      noteList1.splice(action.index, 1, noteToUpdate);
      return noteList1;

    default:
      return state;
  }
}
