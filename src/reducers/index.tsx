import { combineReducers } from "redux";

import user from "./user";
import firebase from "./firebase";

const allReducers = combineReducers({
    user,
    firebase,
    // add more reducers here
});

export default allReducers

