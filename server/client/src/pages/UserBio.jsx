import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import UserCard from '../components/UserCard';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;

    h1 {
        font-size: 40px;
        margin-top: 5%;
    }
`;

const CardWrapper = styled.div`
    display: flex;
    width: 80%;
    margin-left: 10%;
`;

export default function UserBio() {

    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch])

    return (
        <PageWrapper>
            <h1>User Bios</h1>
            <CardWrapper>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant = 'danger'>{error}</MessageBox>
                ) : (
                    <>
                        {users.map(user => (
                            <UserCard key = {user._id} user = {user} />
                        ))}
                    </>
                )}
            </CardWrapper>
        </PageWrapper>
    )
}
