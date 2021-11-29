import React from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';

const PageWrapper = styled.button`
    width: 50%;
    margin: 5%;
    padding: 10px;
    cursor: pointer;
    background-color: rgb(73, 73, 77);
    border-radius: 10px;
    outline: none;
    border: none;

    &:hover {
        opacity: .8;
    }
`;

export default function UserCard(props) {

    const {user} = props;
    const navigate = useNavigate();

    return (
       <PageWrapper onClick = {() => navigate(`/userbio/${user._id}`)}>
           <h2>{user.firstName} {user.lastName}</h2>
       </PageWrapper>
    )
}