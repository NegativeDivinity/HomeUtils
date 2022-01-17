import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function Dashboard() {

    const Wrapper = styled.div`
        text-align: center;
        color: white;
        margin-top: 10%;
    `;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <Wrapper>
            <h1>Welcome, {userInfo.firstName} {userInfo.lastName}</h1>
        </Wrapper>
    )
}
