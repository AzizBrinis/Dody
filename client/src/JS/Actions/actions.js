import {
    ISAUTH,
    NOTAUTH,
    TOGGLE_ISDONE,
    TOGGLE_EDIT,
    TOGGLE_SAVE
} from "../ActionsTypes/actionsTypes";
import axios from "axios";

export const isAuth = async () => {
    await axios
        .get("/test")
        .then((res) => { 
        if(res.data.msg == "auth") {
            return {type : ISAUTH}
        } else {
            return {type : NOTAUTH}
        }
        })
        .catch((err) => console.log(err))
};

export const saveOption = (payload) => {
    return {type : TOGGLE_SAVE, payload};
};

export const doneOption = (payload) => {
    return {type : TOGGLE_ISDONE, payload};
};

export const editOption = (payload) => {
    return {type : TOGGLE_EDIT, payload};
};
