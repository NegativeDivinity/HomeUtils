import { ADD_INGREDIENT_FAIL, ADD_INGREDIENT_REQUEST, ADD_INGREDIENT_RESET, ADD_INGREDIENT_SUCCESS, DELETE_INGREDIENT_FAIL, DELETE_INGREDIENT_REQUEST, DELETE_INGREDIENT_RESET, DELETE_INGREDIENT_SUCCESS, INGREDIENT_UPDATE_FAIL, INGREDIENT_UPDATE_REQUEST, INGREDIENT_UPDATE_RESET, INGREDIENT_UPDATE_SUCCESS, RECIPE_ADD_FAIL, RECIPE_ADD_REQUEST, RECIPE_ADD_RESET, RECIPE_ADD_SUCCEED, RECIPE_DELETE_FAIL, RECIPE_DELETE_REQUEST, RECIPE_DELETE_RESET, RECIPE_DELETE_SUCCEED, RECIPE_DETAILS_FAIL, RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_RESET, RECIPE_DETAILS_SUCCEED, RECIPE_DETAILS_UPDATE_FAIL, RECIPE_DETAILS_UPDATE_REQUEST, RECIPE_DETAILS_UPDATE_RESET, RECIPE_DETAILS_UPDATE_SUCCEED, RECIPE_LIST_FAIL, RECIPE_LIST_REQUEST, RECIPE_LIST_RESET, RECIPE_LIST_SUCCEED } from "../constants/recipeConstants";

export const recipeListReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case RECIPE_LIST_REQUEST:
            return {loading: true};
        case RECIPE_LIST_SUCCEED:
            return {loading: false, recipes: action.payload};
        case RECIPE_LIST_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_LIST_RESET:
            return {};
        default:
            return state;
    }
}

export const recipeDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case RECIPE_DETAILS_REQUEST:
            return {loading: true};
        case RECIPE_DETAILS_SUCCEED:
            return {loading: false, recipe: action.payload};
        case RECIPE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_DETAILS_RESET:
            return {};
        default:
            return state;
    }
}

export const recipeAddReducer = (state = {}, action) => {
    switch(action.type) {
        case RECIPE_ADD_REQUEST:
            return {loading: true};
        case RECIPE_ADD_SUCCEED:
            return {loading: false, success: true, recipe: action.payload};
        case RECIPE_ADD_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_ADD_RESET:
            return {};
        default:
            return state;
    }
}

export const recipeUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case RECIPE_DETAILS_UPDATE_REQUEST:
            return {loading: true};
        case RECIPE_DETAILS_UPDATE_SUCCEED:
            return {loading: false, success: true, recipe: action.payload};
        case RECIPE_DETAILS_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_DETAILS_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const recipeDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case RECIPE_DELETE_REQUEST:
            return {loading: true};
        case RECIPE_DELETE_SUCCEED:
            return {loading: false, success: true};
        case RECIPE_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case RECIPE_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const ingredientAddReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_INGREDIENT_REQUEST:
            return {loading: true};
        case ADD_INGREDIENT_SUCCESS:
            return {loading: false, success: true, ingredient: action.payload};
        case ADD_INGREDIENT_FAIL:
            return {loading: false, error: action.payload};
        case ADD_INGREDIENT_RESET:
            return {};
        default:
            return state;
    }
}

export const ingredientUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case INGREDIENT_UPDATE_REQUEST:
            return {loading: true};
        case INGREDIENT_UPDATE_SUCCESS:
            return {loading: false, success: true, ingredient: action.payload};
        case INGREDIENT_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case INGREDIENT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const ingredientDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_INGREDIENT_REQUEST:
            return {loading: true};
        case DELETE_INGREDIENT_SUCCESS:
            return {loading: false, success: true};
        case DELETE_INGREDIENT_FAIL:
            return {loading: false, error: action.payload};
        case DELETE_INGREDIENT_RESET:
            return {};
        default:
            return state;
    }
}

