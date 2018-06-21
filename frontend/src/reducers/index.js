import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import imgnotes from "./imgnotes";
import allusers from "./allusers";
import publictickets from "./publictickets";

const ponyApp = combineReducers({
  notes,auth,imgnotes,allusers,publictickets,
})

export default ponyApp;
