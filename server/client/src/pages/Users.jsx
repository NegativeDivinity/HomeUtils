import React, {useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import {useNavigate} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addUser, listUser, deleteUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import UserCards from '../components/UserCards';
import {USER_ADD_RESET, USER_DELETE_RESET} from '../constants/userConstants';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2%;

    h1 {
        font-size: 40px;
        color: white;
        text-align: center;
    }
`;

const UserRow = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

const Add = styled.button`
    width: 10%;
    margin: 0 0 1% 25%;
    border: solid black 2px;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    background-color: green;
    padding: 5px;

    &:hover .add {
        transform: scale(1.1);
        transition: transform ease-in-out 1s;
    }
`;

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function Users() {

    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;

    const userAdd = useSelector(state => state.userAdd);
    const {success, user} = userAdd;

    const userDelete = useSelector(state => state.userDelete);
    const {success: successDelete} = userDelete;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            dispatch({type: USER_ADD_RESET});
            navigate(`/users/${user._id}`);
        }

        if (successDelete) {
            dispatch({type: USER_DELETE_RESET});
            dispatch(listUser());
        }

        dispatch(listUser());
    }, [dispatch, success, user, navigate, successDelete]);

    const addHandler = () => {
        dispatch(addUser());
    }

    const deleteHandler = (user) => {
        dispatch(deleteUser(user._id));
    }

    return (
       <PageWrapper>
           <h1>Users:</h1>
           <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
           {loading ? (
               <LoadingBox />
           ) : error ? (
               <MessageBox variant = 'danger'>{error}</MessageBox>
           ) : (
               <>
                    {users.sort((a, b) => a.firstName.localeCompare(b.firstName)).map(user => (
                        <UserRow>
                            <UserCards key = {user._id} user = {user} />
                            <Delete onClick = {() => deleteHandler(user)}><FaTrash fontSize = '30px' /></Delete>
                        </UserRow>
                    ))}
               </>
           )}
       </PageWrapper>
    )
}