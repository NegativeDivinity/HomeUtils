import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {FaTrash} from 'react-icons/fa';
import {RiAddLine} from 'react-icons/ri';

// Component Imports
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router';
import { addIngredient, deleteIngredient, detailsRecipe } from '../actions/recipeActions';
import { ADD_INGREDIENT_RESET, DELETE_INGREDIENT_RESET, INGREDIENT_UPDATE_RESET } from '../constants/recipeConstants';
import IngredientCards from '../components/IngredientCards';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2%;

    h1 {
        font-size: 40px;
        color: white;
        text-align: center;
    }

    h3 {
        color: white;
        margin-left: 25%;
        font-size: 30px;
    }
    
`;

const Add = styled.button`
    width: 10%;
    margin: 0 0 1% 25%;
    border: solid black 2px;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    background-color: green;
    padding: 5px;

    &:hover .add {
        transform: scale(1.1);
        transition: transform ease-in-out 1s;
    }
`;

const IngredientRow = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function Ingredients() {

    const {id} = useParams();

    const recipeDetails = useSelector(state => state.recipeDetails);
    const {loading, error, recipe} = recipeDetails;

    const ingredientAdd = useSelector(state => state.ingredientAdd);
    const {success: successAdd} = ingredientAdd;

    const ingredientDelete = useSelector(state => state.ingredientDelete);
    const {success: successDelete} = ingredientDelete;

    const ingredientUpdate = useSelector(state => state.ingredientUpdate);
    const {success: successUpdate} = ingredientUpdate;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (successAdd) {
            dispatch({type: ADD_INGREDIENT_RESET});
            dispatch(detailsRecipe(id));
        }

        if (successDelete) {
            dispatch({type: DELETE_INGREDIENT_RESET});
            dispatch(detailsRecipe(id));
        }

        if (successUpdate) {
            dispatch({type: INGREDIENT_UPDATE_RESET});
            dispatch(detailsRecipe(id));
        }

        dispatch(detailsRecipe(id));
    }, [dispatch, navigate, id, successAdd, successDelete, successUpdate]);

    const addHandler = () => {
        dispatch(addIngredient(id));
    }

    const deleteHandler = (ingredient) => {
        dispatch(deleteIngredient(id, ingredient._id));
        console.log(id, ingredient._id);
    }

    return (
        <PageWrapper>
            <h1>Ingredients</h1>
            <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
            {loading ? (<LoadingBox />)
                :
            error ? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                <>
                    {recipe.ingredients.map(ingredient => (
                        <IngredientRow>
                            <IngredientCards key = {ingredient._id} ingredient = {ingredient} recipeId = {id}/>
                            <Delete onClick = {() => deleteHandler(ingredient)}><FaTrash fontSize = '30px' /></Delete>
                        </IngredientRow>
                    ))}
                </>
            )}
        </PageWrapper>
    )
}
