import { ADD_CONTACT_FAIL, ADD_CONTACT_REQUEST, ADD_CONTACT_RESET, ADD_CONTACT_SUCCESS, CONTACT_DETAILS_FAIL, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_RESET, CONTACT_DETAILS_SUCCESS, CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_UPDATE_FAIL, CONTACT_UPDATE_REQUEST, CONTACT_UPDATE_RESET, CONTACT_UPDATE_SUCCESS, DELETE_CONTACT_FAIL, DELETE_CONTACT_REQUEST, DELETE_CONTACT_RESET, DELETE_CONTACT_SUCCESS } from "../constants/contactConstants";

export const contactListReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case CONTACT_LIST_REQUEST:
            return {loading: true};
        case CONTACT_LIST_SUCCESS:
            return {loading: false, contacts: action.payload};
        case CONTACT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const contactDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case CONTACT_DETAILS_REQUEST:
            return {loading: true};
        case CONTACT_DETAILS_SUCCESS:
            return {loading: false, contact: action.payload};
        case CONTACT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case CONTACT_DETAILS_RESET:
            return {loading: true};
        default:
            return state;
    }
}

export const contactUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case CONTACT_UPDATE_REQUEST:
            return {loading: true};
        case CONTACT_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case CONTACT_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case CONTACT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const contactAddReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_CONTACT_REQUEST:
            return {loading: true};
        case ADD_CONTACT_SUCCESS:
            return {loading: false, success: true, contact: action.payload};
        case ADD_CONTACT_FAIL:
            return {loading: false, error: action.payload};
        case ADD_CONTACT_RESET:
            return {};
        default:
            return state;
    }
}

export const contactDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_CONTACT_REQUEST:
            return {loading: true};
        case DELETE_CONTACT_SUCCESS:
            return {loading: false, success: true};
        case DELETE_CONTACT_FAIL:
            return {loading: false, error: action.payload};
        case DELETE_CONTACT_RESET:
            return {};
        default:
            return state;
    }
}