import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import imgnotes from "./imgnotes";

const ponyApp = combineReducers({
  notes,auth,imgnotes,
})

export default ponyApp;
