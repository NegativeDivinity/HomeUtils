import React, { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addItem, deleteItem, listTodo, updateItemTime } from '../actions/todoActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import TodoItemCard from '../components/todoItemCard';
import { GiCheckMark } from 'react-icons/gi';
import { TODO_ADD_RESET, TODO_DELETE_RESET } from '../constants/todoConstants';
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 2%;

    h1 {
        font-size: 40px;
        color: white;
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

const ItemRow = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

const Done = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: green;
    cursor: pointer;
    outline: none;
`;

const Priority = styled.button`
    border: solid black 2px;
    margin-left: 25%;
    border-radius: 10px;
    background-color: green;
    cursor: pointer;
    outline: none;
`;

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function GroupToDo() {

    const todoList = useSelector(state => state.todoList);
    const {loading, error, items} = todoList;

    const itemAdd = useSelector(state => state.itemAdd);
    const {loading: loadingItem, error: errorItem, success: successCreate, item: createdItem} = itemAdd;

    const itemDelete = useSelector(state => state.itemDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = itemDelete;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (successCreate) {
            dispatch({type: TODO_ADD_RESET});
            navigate(`/grouptodo/${createdItem._id}/edit`);
        }

        if (successDelete) {
            dispatch({type: TODO_DELETE_RESET});
        }

        dispatch(listTodo());
    }, [dispatch, navigate, successCreate, successDelete, createdItem])

    const addHandler = () => {
        dispatch(addItem())
    }

    const deleteHandler = (item) => {
        dispatch(deleteItem(item._id));
    }

    const updateTimeHandler = (item) => {
        dispatch(updateItemTime(item._id));
    }

    return (
        <PageWrapper>
            <h1>Group To-Do-List</h1>
            <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant = 'danger'></MessageBox>
            ) : (
                <>
                    {items.map((item) => (
                        <ItemRow>
                            <Priority><GiCheckMark fontSize = '30px' /></Priority>
                            <TodoItemCard key = {item._id} item = {item} time = {item.itemTime} />
                            <Done onClick = {() => updateTimeHandler(item)}><GiCheckMark fontSize = '30px' /></Done>
                            <Delete onClick = {() => deleteHandler(item)}><FaTrash fontSize = '30px' /></Delete>
                        </ItemRow>
                    ))}
                </>
            )}
        </PageWrapper>
    )
}
