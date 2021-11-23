import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Timer from '../components/Timer';

const ItemCard = styled.button`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 1%;
    border: solid black 2px;
    border-radius: 10px;
    font-size: 20px;
    text-decoration: none;
    color: white;
    background-color: rgb(73, 73, 77); 
    cursor: pointer;

    p {
        padding: 0 30px 0 30px;

        input {
            background-color: rgb(73, 73, 77);
            color: white;
            border: none;
            outline: none;
        }
    }
`;

export default function TodoItemCard(props) {

    const {item} = props;
    const {time} = props;
    const navigate = useNavigate();

    return (
        <ItemCard key = {item._id} onClick = {() => navigate(`/grouptodo/${item._id}/edit`)}>
            <p>{item.title}</p>
            <Timer time = {time} />
        </ItemCard>
    )
}
