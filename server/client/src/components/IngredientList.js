import React from 'react';
import styled from 'styled-components';

const IngredientCard = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid black 2px;
    border-radius: 10px;
    text-decoration: none;
    color: white;
    margin: 10px;
    background-color: rgb(87, 91, 99);
    padding: 0 10px 0 10px;
`;

export default function IngredientList(props) {

    const {ingredients} = props;

    return (
       <>
           {ingredients.map(ingredient => (
                <IngredientCard>
                   <p>{ingredient.name}</p>
                   <p>{ingredient.quantity} {ingredient.metric}</p>
                </IngredientCard>
           ))}
       </>
    )
}