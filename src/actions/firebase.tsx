import { SET_CONFIRM } from "../constants/action-type";

export const setConfirm = (confirm: any) => {
    return {
        type: SET_CONFIRM,
        payload: confirm,
    };
};