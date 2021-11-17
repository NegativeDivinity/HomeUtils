import axios from "axios";
import { CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS } from "../constants/contactConstants";

export const listContact = () => async(dispatch, getState) => {
    dispatch({type: CONTACT_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get('/contact', {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: CONTACT_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: CONTACT_LIST_FAIL, payload: message});
    }
}