import React, {useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {addGrocery, deleteGrocery, listGrocery} from '../actions/groceryActions';
import GroceryCards from '../components/GroceryCards';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GROCERY_ADD_RESET, GROCERY_DELETE_RESET } from '../constants/groceryConstants';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2%;

    h1 {
        font-size: 40px;
        color: white;
        text-align: center;
    }
`;

const GroceryRow = styled.div`
    display: flex;
    margin-bottom: 2%;
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

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function Grocery() {

    const groceryList = useSelector(state => state.groceryList);
    const {loading, error, groceries} = groceryList;

    const groceryAdd = useSelector(state => state.groceryAdd);
    const {success: successAdd, grocery} = groceryAdd;

    const groceryDelete = useSelector(state => state.groceryDelete);
    const {success: successDelete} = groceryDelete;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (successAdd) {
            dispatch({type: GROCERY_ADD_RESET});
            navigate(`/grocery/${grocery._id}`);
        }

        if (successDelete) {
            dispatch({type: GROCERY_DELETE_RESET});
            dispatch(listGrocery());
        }

        dispatch(listGrocery());
    }, [dispatch, navigate, successAdd, successDelete, grocery]);

    const addHandler = () => {
        dispatch(addGrocery());
    }

    const deleteHandler = (grocery) => {
        dispatch(deleteGrocery(grocery._id));
    }

    return (
       <PageWrapper>
           <h1>Grocery List:</h1>
           <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
           {loading ? (
               <LoadingBox />
           ) : error ? (
               <MessageBox variant = 'danger'>{error}</MessageBox>
           ) : (
               <>
                    {groceries.sort((a, b) => a.name.localeCompare(b.name)).map(grocery => (
                        <GroceryRow>
                            <GroceryCards key = {grocery._id} grocery = {grocery} />
                            <Delete onClick = {() => deleteHandler(grocery)}><FaTrash fontSize = '30px' /></Delete>
                        </GroceryRow>
                    ))}
               </>
           )}
       </PageWrapper>
    )
}