import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {FaTrash} from 'react-icons/fa';
import {RiAddLine} from 'react-icons/ri';

// Component Imports
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router';
import { addDirection, deleteDirection, detailsRecipe, updateDirection } from '../actions/recipeActions';
import { ADD_DIRECTION_RESET, DELETE_DIRECTION_RESET, DIRECTION_UPDATE_RESET } from '../constants/recipeConstants';
import DirectionCards from '../components/DirectionCards';

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



const DirectionRow = styled.div`
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

export default function Directions() {

    const {id} = useParams();

    const recipeDetails = useSelector(state => state.recipeDetails);
    const {loading, error, recipe} = recipeDetails;

    const directionAdd = useSelector(state => state.directionAdd);
    const {success: successAdd} = directionAdd;

    const directionDelete = useSelector(state => state.directionDelete);
    const {success: successDelete} = directionDelete;

    const directionUpdate = useSelector(state => state.directionUpdate);
    const {success: successUpdate} = directionUpdate;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (successAdd) {
            dispatch({type: ADD_DIRECTION_RESET});
        }

        if (successDelete) {
            dispatch({type: DELETE_DIRECTION_RESET});
            dispatch(detailsRecipe(id));
        }

        if (successUpdate) {
            dispatch({type: DIRECTION_UPDATE_RESET});
            dispatch(detailsRecipe(id));
        }

        dispatch(detailsRecipe(id));

    }, [dispatch, navigate, id, successAdd, successDelete, successUpdate]);

    const addHandler = () => {
        dispatch(addDirection(id));
    }

    const deleteHandler = (direction) => {
        dispatch(deleteDirection(id, direction._id));
    }

    

    return (
        <PageWrapper>
            <h1>Directions</h1>
            <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
            {loading ? (<LoadingBox />)
                :
                error ? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                <>
                    {recipe.directions.map((direction) => (
                        <DirectionRow>
                            <DirectionCards direction = {direction} recipeId = {id} />
                            <Delete onClick = {() => deleteHandler(direction)}><FaTrash fontSize = '30px' /></Delete>
                        </DirectionRow>         
                    ))}
                </>
            )}
        </PageWrapper>
    )
}
