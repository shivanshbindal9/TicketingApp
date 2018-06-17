import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import imgnotes from "./imgnotes";
import allusers from "./allusers";
const ponyApp = combineReducers({
  notes,auth,imgnotes,allusers,
})

export default ponyApp;
