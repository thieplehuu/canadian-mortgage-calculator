import { SET_USER } from "../constants/action-type";

export const setUser = (user: any) => {
    return {
        type: SET_USER,
        payload: user,
    };
};