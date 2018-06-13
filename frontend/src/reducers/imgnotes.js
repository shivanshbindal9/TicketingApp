const initialState = [];



export default function imgnotes(state=initialState, action) {
  

  switch (action.type) {
    case 'FETCH_IMGNOTES':
      return [...state, ...action.notes]; 
    
    default:
      return state;
}}
