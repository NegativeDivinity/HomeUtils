import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
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

    return (
       <PageWrapper>
           <p>{grocery.name}</p>
           <p>{grocery.quantity}</p>
       </PageWrapper>
    )
}