import { SET_CONFIRM } from "../constants/action-type";

export const userReducer = (state = 0, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case SET_CONFIRM:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;