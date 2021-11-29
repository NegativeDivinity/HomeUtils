import React from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';

const PageWrapper = styled.div`
    margin-left: 5%;
`;

export default function UserCard(props) {

    const {user} = props;
    const navigate = useNavigate();

    return (
       <PageWrapper onClick = {() => navigate(`/userbio/${user._id}`)}>
           <h1>{user.firstName} {user.lastName}</h1>
       </PageWrapper>
    )
}