import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const GroceryCard = styled.button`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 25%;
    border: solid black 2px;
    border-radius: 10px;
    font-size: 20px;
    text-decoration: none;
    color: white;
    background-color: rgb(73, 73, 77); 
    cursor: pointer;

    p {
        padding: 0 30px 0 30px;
    }
`;

export default function GroceryCards(props) {

    const {grocery} = props;
    const navigate = useNavigate();

    return (
       <GroceryCard onClick = {() => navigate(`/grocery/${grocery._id}`)}>
           <p>{grocery.name}</p>
           <p>{grocery.quantity}</p>
       </GroceryCard>
    )
}