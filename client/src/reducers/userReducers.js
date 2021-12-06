import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCEED,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCEED,
    USER_DETAILS_UPDATE_FAIL,
    USER_DETAILS_UPDATE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCEED,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_ADD_REQUEST,
    USER_ADD_SUCCEED,
    USER_ADD_FAIL,
    USER_ADD_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCEED,
    USER_DELETE_FAIL,
    USER_DELETE_RESET
} from '../constants/userConstants.js';

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCEED:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case USER_DETAILS_RESET:
            return {loading: true};
        default:
            return state;
    }
}

export const userListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCEED:
            return {loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};
        case USER_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_UPDATE_REQUEST:
            return {loading: true};
        case USER_DETAILS_UPDATE_SUCCEED:
            return {loading: false, success: true};
        case USER_DETAILS_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case USER_DETAILS_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const userAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_REQUEST:
            return {loading: true};
        case USER_ADD_SUCCEED:
            return {loading: false, success: true, user: action.payload};
        case USER_ADD_FAIL:
            return {loading: false, error: action.payload};
        case USER_ADD_RESET:
            return {};
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCEED:
            return {loading: false, success: true};
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
}