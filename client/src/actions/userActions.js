import axios from 'axios';
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCEED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCEED,
    USER_DETAILS_UPDATE_FAIL
} from '../constants/userConstants.js';

export const signin = (userName, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {userName, password}});

    try {
        const {data} = await axios.post('/users/signin', {userName, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USER_SIGNIN_FAIL, payload: message});
    }
}

export const signout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNOUT});
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get(`/users/${userId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });

        dispatch({type: USER_DETAILS_SUCCEED, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message});
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_UPDATE_REQUEST, payload: user});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put('/users/profile', user, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        
        dispatch({type: USER_DETAILS_UPDATE_SUCCEED, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: USER_DETAILS_UPDATE_FAIL, payload: message});
    }
}