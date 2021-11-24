import axios from 'axios';
import { TODO_LIST_FAIL, TODO_LIST_REQUEST, TODO_LIST_SUCCESS, TODO_DETAILS_REQUEST, TODO_DETAILS_SUCCESS, TODO_ADD_REQUEST, TODO_ADD_SUCCESS, TODO_DETAILS_FAIL, TODO_ADD_FAIL, TODO_DELETE_REQUEST, TODO_DELETE_FAIL, TODO_DELETE_SUCCESS, TODO_UPDATE_TIME_REQUEST, TODO_UPDATE_TIME_SUCCESS, TODO_UPDATE_TIME_FAIL, TODO_UPDATE_REQUEST, TODO_UPDATE_FAIL, TODO_UPDATE_SUCCESS } from '../constants/todoConstants';

export const listTodo = () => async(dispatch, getState) => {
    dispatch({type: TODO_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get('/grouptodo', {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: TODO_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_LIST_FAIL, payload: message});
    }
}

export const addItem = () => async(dispatch, getState) => {
    dispatch({type: TODO_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post('/grouptodo', {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: TODO_ADD_SUCCESS, payload: data.item});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_ADD_FAIL, payload: message});
    }
}

export const deleteItem = (itemId) => async(dispatch, getState) => {
    dispatch({type: TODO_DELETE_REQUEST, payload: itemId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/grouptodo/${itemId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: TODO_DELETE_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_DELETE_FAIL, payload: message});
    }
}

export const updateItemTime = (item) => async(dispatch, getState) => {
    dispatch({type: TODO_UPDATE_TIME_REQUEST, payload: item});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(`/grouptodo/${item._id}`, item, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: TODO_UPDATE_TIME_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_UPDATE_TIME_FAIL, payload: message});
    }
}

export const detailsItem = (itemId) => async(dispatch) => {
    dispatch({type: TODO_DETAILS_REQUEST, payload: itemId});

    try {
        const {data} = await axios.get(`/grouptodo/${itemId}`);
        dispatch({type: TODO_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_DETAILS_FAIL, payload: message});
    }
}

export const updateItem = (item) => async(dispatch, getState) => {
    dispatch({type: TODO_UPDATE_REQUEST, payload: item});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(`/grouptodo/${item._id}/edit`, item, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: TODO_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: TODO_UPDATE_FAIL, payload: message});
    }
}