import { SET_USER } from "../constants/action-type";

export const userReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;