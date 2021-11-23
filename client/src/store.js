import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { contactAddReducer, contactDeleteReducer, contactDetailsReducer, contactListReducer, contactUpdateReducer } from './reducers/contactReducer';
import { itemAddReducer, itemDeleteReducer, itemDetailsReducer, todoListReducer } from './reducers/todoReducers';
import { userDetailsReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

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
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;