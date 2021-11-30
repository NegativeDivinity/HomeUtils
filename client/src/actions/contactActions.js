import axios from "axios";
import { ADD_CONTACT_FAIL, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, CONTACT_DETAILS_FAIL, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_SUCCESS, CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_UPDATE_FAIL, CONTACT_UPDATE_REQUEST, CONTACT_UPDATE_SUCCESS, DELETE_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS } from "../constants/contactConstants";

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

export const detailsContact = (userId, contactId) => async(dispatch) => {
    dispatch({type: CONTACT_DETAILS_REQUEST, payload: {userId, contactId}});

    try {
        const {data} = await axios.get(`/users/${userId}/contact/${contactId}`);
        dispatch({type: CONTACT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: CONTACT_DETAILS_FAIL, payload: message});
    }
}

export const updateContact = (contact) => async(dispatch, getState) => {
    dispatch({type: CONTACT_UPDATE_REQUEST, payload: contact});
    const {userSignin: {userInfo}} = getState();
    
    try {
        const {data} = await axios.put(`/contact/${contact._id}`, contact, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });

        dispatch({type: CONTACT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CONTACT_UPDATE_FAIL, error: message});
    }
}

export const addContact = (userId) => async(dispatch, getState) => {
    dispatch({type: ADD_CONTACT_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post(`/users/${userId}/contacts`, {}, {
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

export const editContact = (userId, contact) => async(dispatch, getState) => {
    dispatch({type: ADD_CONTACT_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post(`/users/${userId}/contact`, contact, {
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

export const deleteContact = (userId, contactId) => async(dispatch, getState) => {
    dispatch({type: DELETE_CONTACT_REQUEST, payload: contactId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/users/${userId}/contact/${contactId}`, {
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