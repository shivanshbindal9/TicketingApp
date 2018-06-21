const initialState = [];



export default function publictickets(state=initialState, action) {

  switch (action.type) {
    case 'FETCH_PUBLICTICKETS':
      return [...state, ...action.notes]; 
    

    default:
      return state;
}}


