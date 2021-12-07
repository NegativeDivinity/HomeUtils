import axios from 'axios';
import {
    RECIPE_LIST_REQUEST,
    RECIPE_LIST_SUCCESS,
    RECIPE_LIST_FAIL,
    RECIPE_DETAILS_SUCCEED,
    RECIPE_DETAILS_FAIL,
    RECIPE_DETAILS_REQUEST,
    RECIPE_ADD_REQUEST,
    RECIPE_ADD_SUCCEED,
    RECIPE_ADD_FAIL,
    RECIPE_DETAILS_UPDATE_REQUEST,
    RECIPE_DETAILS_UPDATE_SUCCEED,
    RECIPE_DETAILS_UPDATE_FAIL,
    RECIPE_DELETE_REQUEST,
    RECIPE_DELETE_FAIL,
    RECIPE_DELETE_SUCCEED,
    ADD_INGREDIENT_REQUEST,
    ADD_INGREDIENT_SUCCESS,
    ADD_INGREDIENT_FAIL,
    INGREDIENT_UPDATE_REQUEST,
    INGREDIENT_UPDATE_SUCCESS,
    INGREDIENT_UPDATE_FAIL,
    DELETE_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_FAIL,

} from '../constants/recipeConstants';

export const listRecipe = () => async (dispatch) => {
    dispatch({type: RECIPE_LIST_REQUEST});

    try {
        const {data} = await axios.get('/recipe');
        dispatch({type: RECIPE_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RECIPE_LIST_FAIL, payload: message});
    }
}

export const detailsRecipe = (recipeId) => async (dispatch, getState) => {
    dispatch({type: RECIPE_DETAILS_REQUEST, payload: recipeId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get(`/recipe/${recipeId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: RECIPE_DETAILS_SUCCEED, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RECIPE_DETAILS_FAIL, payload: message});
    }
}

export const addRecipe = () => async (dispatch, getState) => {
    dispatch({type: RECIPE_ADD_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post('/recipe', {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: RECIPE_ADD_SUCCEED, payload: data.recipe});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RECIPE_ADD_FAIL, payload: message});
    }
}

export const updateRecipe = (recipe) => async (dispatch, getState) => {
    dispatch({type: RECIPE_DETAILS_UPDATE_REQUEST, payload: recipe});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(`/recipe/${recipe._id}`, recipe, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: RECIPE_DETAILS_UPDATE_SUCCEED, payload: data.recipe});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RECIPE_DETAILS_UPDATE_FAIL, payload: message});
    }
}

export const deleteRecipe = (recipeId) => async (dispatch, getState) => {
    dispatch({type: RECIPE_DELETE_REQUEST, payload: recipeId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/recipe/${recipeId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: RECIPE_DELETE_SUCCEED});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: RECIPE_DELETE_FAIL, payload: message});
    }
}

export const addIngredient = (recipeId) => async (dispatch, getState) => {
    dispatch({type: ADD_INGREDIENT_REQUEST, payload: recipeId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.post(`/recipe/${recipeId}`, {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: ADD_INGREDIENT_SUCCESS, payload: data.ingredient});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: ADD_INGREDIENT_FAIL, payload: message});
    }
}

export const updateIngredient = (recipeId, ingredient) => async (dispatch, getState) => {
    dispatch({type: INGREDIENT_UPDATE_REQUEST, payload: {recipeId, ingredient}});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(`/recipe/${recipeId}/${ingredient._id}`, ingredient, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: INGREDIENT_UPDATE_SUCCESS, payload: data.ingredient});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: INGREDIENT_UPDATE_FAIL, payload: message});
    }
}

export const deleteIngredient = (recipeId, ingredient) => async (dispatch, getState) => {
    dispatch({type: DELETE_INGREDIENT_REQUEST, payload: {recipeId, ingredient}});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(`/recipe/${recipeId}/${ingredientId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: DELETE_INGREDIENT_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: DELETE_INGREDIENT_FAIL, payload: message});
    }
}