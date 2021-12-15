import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {updateDirection} from '../actions/recipeActions';

const DirectionCard = styled.textarea`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 25%;
    border: solid black 2px;
    border-radius: 10px;
    font-size: 20px;
    color: white;
    background-color: rgb(73, 73, 77);
    resize: none;
    padding: 10px;
    height: ${props => props.height || '100px'};
    outline: none;
`;

const Update = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    background-color: green;
`;

export default function IngredientCards(props) {

    const [task, setTask] = useState('');
    const [height, setHeight] = useState('');

    const {direction} = props;
    const {recipeId} = props;

    const dispatch = useDispatch();

    useEffect(() => {
        setTask(direction.task);
        setHeight(`${direction.task.length / 2}px`);
    }, [direction]);

    const updateHandler = (direction) => {
        dispatch(updateDirection(recipeId, {
            _id: direction._id,
            task
        }));
    }

    return (
        <>
            <DirectionCard
                id = {direction._id}
                autoFocus
                height = {height}
                value = {task}
                onChange = {(e) => setTask(e.target.value)}>
            </DirectionCard>
            <Update onClick = {() => updateHandler(direction)}><GrUpdate fontSize = '30px' /></Update>
        </>
    )
}
