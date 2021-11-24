import {TODO_ADD_FAIL, TODO_ADD_REQUEST, TODO_ADD_RESET, TODO_ADD_SUCCESS, TODO_DELETE_FAIL, TODO_DELETE_REQUEST, TODO_DELETE_RESET, TODO_DELETE_SUCCESS, TODO_DETAILS_FAIL, TODO_DETAILS_REQUEST, TODO_DETAILS_RESET, TODO_DETAILS_SUCCESS, TODO_LIST_FAIL, TODO_LIST_REQUEST, TODO_LIST_RESET, TODO_LIST_SUCCESS, TODO_UPDATE_TIME_FAIL, TODO_UPDATE_TIME_REQUEST, TODO_UPDATE_TIME_RESET, TODO_UPDATE_TIME_SUCCESS} from '../constants/todoConstants';

export const todoListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case TODO_LIST_REQUEST:
            return {loading: true};
        case TODO_LIST_SUCCESS:
            return {loading: false, items: action.payload};
        case TODO_LIST_FAIL:
            return {loading: false, error: action.payload};
        case TODO_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export const itemAddReducer = (state = {}, action) => {
    switch (action.type) {
        case TODO_ADD_REQUEST:
            return {loading: true};
        case TODO_ADD_SUCCESS:
            return {loading: false, success: true, item: action.payload}
        case TODO_ADD_FAIL:
            return {loading: false, error: action.payload};
        case TODO_ADD_RESET:
            return {};
        default:
            return state;
    }
}

export const itemDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TODO_DELETE_REQUEST:
            return {loading: true};
        case TODO_DELETE_SUCCESS:
            return {loading: false, success: true};
        case TODO_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case TODO_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const itemTimeUpdateReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case TODO_UPDATE_TIME_REQUEST:
            return {loading: true};
        case TODO_UPDATE_TIME_SUCCESS:
            return {loading: false, success: true};
        case TODO_UPDATE_TIME_FAIL:
            return {loading: false, error: action.payload};
        case TODO_UPDATE_TIME_RESET:
            return {};
        default:
            return state;
    }
}

export const itemDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case TODO_DETAILS_REQUEST:
            return {loading: true};
        case TODO_DETAILS_SUCCESS:
            return {loading: false, item: action.payload};
        case TODO_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case TODO_DETAILS_RESET:
            return {};
        default:
            return state;
    }
}