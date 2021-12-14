import React, {useState} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {GrUpdate} from 'react-icons/gr';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDirection, updateIngredient } from "../actions/recipeActions";
import { useSelector } from "react-redux";

const IngredientCard = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin-left: 25%;
    border: solid black 2px;
    border-radius: 10px;
    font-size: 20px;
    text-decoration: none;
    color: white;
    background-color: rgb(73, 73, 77); 
    cursor: pointer;
    padding: 0 30px 0 30px;

    input {
        background-color: rgb(73, 73, 77); 
        outline: none;
        height: 60%;
        font-size: 30px;
        color: white;
        padding: 5px;
        border: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    div {
        display: flex;
        width: 20%;
        height: 100%;
        justify-content: right;
        align-items: center;
    }
`;

const Number = styled.input`
    width: 40%;
    margin-right: 10%;

    -webkit-outer-spin-button,
    -webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

const MetricI = styled.select`
    width: 60%;
    height: 70%;
    outline: none;
    border: none;
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

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [metric, setMetric] = useState('');

    const {ingredient} = props;
    const {recipeId} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        setName(ingredient.name);
        setQuantity(ingredient.quantity);
        setMetric(ingredient.metric);
    }, [ingredient])

    const updateHandler = (ingredient) => {
        dispatch(updateIngredient(recipeId, {
            _id: ingredient._id,
            name,
            quantity,
            metric,
        }))
    }

    return (
        <>
            <IngredientCard key = {ingredient._id} >
                <input 
                    type="text" 
                    id = 'name'
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
                <div>
                    <Number
                        type = 'number'
                        id = 'quantity'
                        value = {quantity}
                        onChange = {(e) => setQuantity(e.target.value)}
                    />
                    <MetricI
                        id = 'metric'
                        value = {metric}
                        onChange = {(e) => setMetric(e.target.value)}
                    >
                        <option value="box">Box</option>
                        <option value="cup">Cups</option>
                        <option value="tbsp">Tbsp</option>
                        <option value="tsp">Tsp</option>
                    </MetricI>
                </div>
            </IngredientCard>
            <Update onClick = {() => updateHandler(ingredient)}><GrUpdate fontSize = '30px' /></Update>
        </>
    )
}
