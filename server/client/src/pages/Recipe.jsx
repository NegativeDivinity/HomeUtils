import React, {useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { addRecipe, deleteRecipe, listRecipe } from '../actions/recipeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import RecipeCards from '../components/RecipeCards';
import { RECIPE_ADD_RESET, RECIPE_DELETE_RESET } from '../constants/recipeConstants';

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

const RecipeRow = styled.div`
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

export default function Recipe() {

    const recipeList = useSelector(state => state.recipeList);
    const {loading, error, recipes} = recipeList;

    const recipeAdd = useSelector(state => state.recipeAdd);
    const {success: successAdd, recipe} = recipeAdd;

    const recipeDelete = useSelector(state => state.recipeDelete);
    const {success: successDelete} = recipeDelete;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (successAdd) {
            dispatch({type: RECIPE_ADD_RESET});
            navigate(`/recipe/${recipe._id}`);
        }

        if (successDelete) {
            dispatch({type: RECIPE_DELETE_RESET});
            dispatch(listRecipe());
        }

        dispatch(listRecipe());
    }, [dispatch, successAdd, recipe, successDelete, navigate]);

    const addHandler = () => {
        dispatch(addRecipe());
    }

    const deleteHandler = (recipe) => {
        dispatch(deleteRecipe(recipe._id));
    }

    return (
       <PageWrapper>
           <h1>Recipes</h1>
            <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
            {loading ? (<LoadingBox />)
                :
            error ? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                <>
                    {recipes.filter(recipe => recipe.name !== 'Default name').sort((a, b) => a.name.localeCompare(b.name)).map(recipe => (
                        <RecipeRow>
                            <RecipeCards key = {recipe._id} recipe = {recipe} />
                            <Delete onClick = {() => deleteHandler(recipe)}><FaTrash fontSize = '30px' /></Delete>
                        </RecipeRow>
                    ))}
                </>
            )}
       </PageWrapper>
    )
}