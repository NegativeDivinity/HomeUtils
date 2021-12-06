import {
    GROCERY_ADD_FAIL,
    GROCERY_ADD_REQUEST,
    GROCERY_ADD_SUCCEED,
    GROCERY_ADD_RESET,
    GROCERY_DELETE_FAIL,
    GROCERY_DELETE_REQUEST,
    GROCERY_DELETE_SUCCEED,
    GROCERY_DELETE_RESET,
    GROCERY_DETAILS_FAIL,
    GROCERY_DETAILS_REQUEST,
    GROCERY_DETAILS_SUCCEED,
    GROCERY_DETAILS_RESET,
    GROCERY_DETAILS_UPDATE_FAIL,
    GROCERY_DETAILS_UPDATE_REQUEST,
    GROCERY_DETAILS_UPDATE_SUCCEED,
    GROCERY_DETAILS_UPDATE_RESET,
    GROCERY_LIST_FAIL,
    GROCERY_LIST_REQUEST, 
    GROCERY_LIST_SUCCEED,
    GROCERY_LIST_RESET,
} from '../constants/groceryConstants';

export const groceryListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case GROCERY_LIST_REQUEST:
            return {loading: true};
        case GROCERY_LIST_SUCCEED:
            return {loading: false, groceries: action.payload};
        case GROCERY_LIST_FAIL:
            return {loading: false, error: action.payload};
        case GROCERY_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export const groceryDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case GROCERY_DETAILS_REQUEST:
            return {loading: true};
        case GROCERY_DETAILS_SUCCEED:
            return {loading: false, grocery: action.payload};
        case GROCERY_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case GROCERY_DETAILS_RESET:
            return {};
        default:
            return state;
    }
}

export const groceryAddReducer = (state = {}, action) => {
    switch (action.type) {
        case GROCERY_ADD_REQUEST:
            return {loading: true};
        case GROCERY_ADD_SUCCEED:
            return {loading: false, success: true, grocery: action.payload};
        case GROCERY_ADD_FAIL:
            return {loading: false, error: action.payload};
        case GROCERY_ADD_RESET:
            return {};
        default:
            return state;
    }
}

export const groceryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case GROCERY_DETAILS_UPDATE_REQUEST:
            return {loading: true};
        case GROCERY_DETAILS_UPDATE_SUCCEED:
            return {loading: false, success: true, grocery: action.payload};
        case GROCERY_DETAILS_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case GROCERY_DETAILS_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const groceryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case GROCERY_DELETE_REQUEST:
            return {loading: true};
        case GROCERY_DELETE_SUCCEED:
            return {loading: false, success: true};
        case GROCERY_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case GROCERY_DELETE_RESET:
            return {};
        default:
            return state;
    }
}