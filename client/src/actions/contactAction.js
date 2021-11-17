import axios from "axios";
import { CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS } from "../constants/contactConstants";

export const contactlist = () => async(dispatch) => {
    dispatch({type: CONTACT_LIST_REQUEST});

    try {
        const {data} = await axios.get('/contact/contacts');
        dispatch({type: CONTACT_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: CONTACT_LIST_FAIL, payload: message});
    }
}