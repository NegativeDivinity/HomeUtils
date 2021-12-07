import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { detailsRecipe, updateRecipe } from '../actions/recipeActions';
import IngredientList from '../components/IngredientList';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { RECIPE_DETAILS_RESET, RECIPE_DETAILS_UPDATE_RESET } from '../constants/recipeConstants';

const PageWrapper = styled.div`
    margin-top: 2%;
    color: white;
`;

const RecipeEditForm = styled.form`
    splay: flex;
    flex-direction: column;
    margin: 0 0 1% 30%;
    width: 40%;
    border: solid black 3px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);

    h1 {
        text-align: center;
    }

    div {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        color: white;
        font-size: 20px;

        input {
            padding: 5px;
            width: 50%;
            border-radius: 10px;
            outline: none;
            border: none;
        }
    }
`;

const Submit = styled.button`
    width: 80%;
    margin: 2% 0 0 10%;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export default function GroceryEdit() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const recipeDetails = useSelector(state => state.recipeDetails);
    const {loading: loadingDetail, error: errorDetail, recipe} = recipeDetails;

    const recipeUpdate = useSelector(state => state.recipeUpdate);
    const {success} = recipeUpdate;

    const [name, setName] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {

        if (success) {
            
            navigate('/recipe');
        }

        if (!recipe || (recipe._id !== id || success)) {
            dispatch({type: RECIPE_DETAILS_UPDATE_RESET});
            dispatch(detailsRecipe(id));
        } else {
            setName(recipe.name);
            setType(recipe.type);
        }

        

    }, [dispatch, id, navigate, success, recipe]);

    const submitHandler = (e) => {
        e.preventDefault();
            
        dispatch(updateRecipe({
            _id: id, 
            name, 
            type,
        }));
    }

    const back = () => {
        dispatch({type: RECIPE_DETAILS_RESET});
        navigate('/recipe');
    }

    return (
       <PageWrapper>
           <RecipeEditForm onSubmit = {submitHandler}>
                {loadingDetail ? (
                        <LoadingBox />
                    ) : errorDetail ? (
                        <MessageBox variant = 'danger'>{errorDetail}</MessageBox>
                    ) :
                        <>
                            <h1>{recipe.name}</h1>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input 
                                    type="text" 
                                    id = 'name'
                                    value = {name} 
                                    onChange = {(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="type">Type: </label>
                                <input 
                                    type="text" 
                                    id = 'type' 
                                    value = {type} 
                                    onChange = {(e) => setType(e.target.value)}
                                />
                            </div>
                            <IngredientList recipe = {recipe}/>
                            <Submit type = 'submit'>Update</Submit>
                        </>
                }
            </RecipeEditForm>
       </PageWrapper>
    )
}