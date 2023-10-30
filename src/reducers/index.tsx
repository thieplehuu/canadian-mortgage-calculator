import { combineReducers } from "redux";

import user from "./user";

const allReducers = combineReducers({
    user,
    // add more reducers here
});

export default allReducers

