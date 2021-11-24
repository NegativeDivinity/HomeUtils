import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { contactAddReducer, contactDeleteReducer, contactDetailsReducer, contactListReducer, contactUpdateReducer } from './reducers/contactReducer';
import { itemAddReducer, itemDeleteReducer, itemDetailsReducer, itemTimeUpdateReducer, itemUpdateReducer, todoListReducer } from './reducers/todoReducers';
import { userDetailsReducer, userListReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    contactList: contactListReducer,
    contactAdd: contactAddReducer,
    contactDelete: contactDeleteReducer,
    contactDetails: contactDetailsReducer,
    contactUpdate: contactUpdateReducer,
    todoList: todoListReducer,
    itemAdd: itemAddReducer,
    itemDetails: itemDetailsReducer,
    itemDelete: itemDeleteReducer,
    itemTimeUpdate: itemTimeUpdateReducer,
    itemUpdate: itemUpdateReducer,
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;