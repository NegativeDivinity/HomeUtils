import { CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS } from "../constants/contactConstants";

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