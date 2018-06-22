const initialState = [];



export default function allusers(state=initialState, action) {

  switch (action.type) {
    case 'FETCH_USERS':
      console.log("reducer");
      return [...action.notes]; 
    
    default:
      return state;
}}
