import axios from 'axios';
import {
    GROCERY_ADD_FAIL,
    GROCERY_ADD_REQUEST,
    GROCERY_ADD_SUCCEED,
    GROCERY_DELETE_FAIL,
    GROCERY_DELETE_REQUEST,
    GROCERY_DELETE_SUCCEED,
    GROCERY_DETAILS_FAIL,
    GROCERY_DETAILS_REQUEST,
    GROCERY_DETAILS_SUCCEED,
    GROCERY_DETAILS_UPDATE_FAIL,
    GROCERY_DETAILS_UPDATE_REQUEST,
    GROCERY_DETAILS_UPDATE_SUCCEED,
    GROCERY_LIST_FAIL,
    GROCERY_LIST_REQUEST, GROCERY_LIST_SUCCEED,
} from '../constants/groceryConstants';

export const listGrocery = () => async (dispatch) => {
    dispatch({type: GROCERY_LIST_REQUEST});

    try {
        const {data} = await axios.get('/grocery');
        dispatch({type: GROCERY_LIST_SUCCEED, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: GROCERY_LIST_FAIL, payload: message});
    }
}

export const detailsGrocery = (groceryId) => async (dispatch, getState) => {
    dispatch({type: GROCERY_DETAILS_REQUEST, payload: groceryId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get(`/grocery/${groceryId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: GROCERY_DETAILS_SUCCEED, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: GROCERY_DETAILS_FAIL, payload: message});
    }
}

export const addGrocery = () => async (dispatch, getState) => {
    dispatch({type: GROCERY_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post('/grocery', {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: GROCERY_ADD_SUCCEED, payload: data.grocery});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: GROCERY_ADD_FAIL, payload: message});
    }
}

export const updateGrocery = (grocery) => async (dispatch, getState) => {
    dispatch({type: GROCERY_DETAILS_UPDATE_REQUEST, payload: grocery});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(`/grocery/${grocery._id}`, grocery, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: GROCERY_DETAILS_UPDATE_SUCCEED, payload: data.grocery});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: GROCERY_DETAILS_UPDATE_FAIL, payload: message});
    }
}

export const deleteGrocery = (groceryId) => async (dispatch, getState) => {
    dispatch({type: GROCERY_DELETE_REQUEST, payload: groceryId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/grocery/${groceryId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: GROCERY_DELETE_SUCCEED});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: GROCERY_DELETE_FAIL, payload: message});
    }
}