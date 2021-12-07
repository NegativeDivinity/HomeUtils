import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { contactAddReducer, contactDeleteReducer, contactDetailsReducer, contactListReducer, contactUpdateReducer } from './reducers/contactReducer';
import { groceryAddReducer, groceryDeleteReducer, groceryDetailsReducer, groceryListReducer, groceryUpdateReducer } from './reducers/groceryReducer';
import { ingredientAddReducer, ingredientDeleteReducer, ingredientUpdateReducer, recipeAddReducer, recipeDeleteReducer, recipeDetailsReducer, recipeListReducer, recipeUpdateReducer } from './reducers/recipeReducers';
import { itemAddReducer, itemDeleteReducer, itemDetailsReducer, itemTimeUpdateReducer, itemUpdateReducer, todoListReducer } from './reducers/todoReducers';
import { userAddReducer, userDeleteReducer, userDetailsReducer, userListReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

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
    userAdd: userAddReducer,
    userDelete: userDeleteReducer,
    groceryList: groceryListReducer,
    groceryDetails: groceryDetailsReducer,
    groceryAdd: groceryAddReducer,
    groceryUpdate: groceryUpdateReducer,
    groceryDelete: groceryDeleteReducer,
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    recipeAdd: recipeAddReducer,
    recipeUpdate: recipeUpdateReducer,
    recipeDelete: recipeDeleteReducer,
    ingredientAdd: ingredientAddReducer,
    ingredientUpdate: ingredientUpdateReducer,
    ingredientDelete: ingredientDeleteReducer,
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;