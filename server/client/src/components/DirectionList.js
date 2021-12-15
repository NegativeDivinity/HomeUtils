import React from 'react';
import styled from 'styled-components';

const DirectionCard = styled.div`
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

    const {directions} = props;

    return (
       <>
           {directions.map(direction => (
                <DirectionCard>
                   <p>{direction.task}</p>
                </DirectionCard>
           ))}
       </>
    )
}