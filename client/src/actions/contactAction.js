import axios from "axios";
import { ADD_CONTACT_FAIL, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, CONTACT_DETAILS_FAIL, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_SUCCESS, CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, DELETE_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS } from "../constants/contactConstants";

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

export const detailsContact = (contactId) => async(dispatch, getState) => {
    dispatch({type: CONTACT_DETAILS_REQUEST, payload: contactId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get(`/contact/${contactId}`);
        dispatch({type: CONTACT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: CONTACT_DETAILS_FAIL, payload: message});
    }
}

export const addContact = () => async(dispatch, getState) => {
    dispatch({type: ADD_CONTACT_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post('/contact', {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: ADD_CONTACT_SUCCESS, payload: data.contact});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: ADD_CONTACT_FAIL, payload: message});
    }
}

export const deleteContact = (contactId) => async(dispatch, getState) => {
    dispatch({type: DELETE_CONTACT_REQUEST, payload: contactId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/contact/${contactId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: DELETE_CONTACT_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: DELETE_CONTACT_FAIL, payload: message});
    }
}