import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstants';

const PageWrapper = styled.div`
    margin-top: 2%;
    color: white;
`;

const UserEditForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 0 1% 30%;
    width: 40%;
    border: solid black 3px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);

    h1 {
        text-align: center;
    }

    div {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        color: white;
        font-size: 20px;

        input {
            padding: 5px;
            width: 50%;
            border-radius: 10px;
            outline: none;
            border: none;
        }
    }
`;

const Submit = styled.button`
    width: 80%;
    margin: 2% 0 0 10%;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export default function UserEdit() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const userDetails = useSelector(state => state.userDetails);
    const {loading: loadingDetail, error: errorDetail, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {success} = userUpdate;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {

        if (success) {
            dispatch({type: USER_DETAILS_UPDATE_RESET});
            navigate('/users');
        }

        if (!user || (user._id !== id || success)) {
            dispatch(detailsUser(id));
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUserName(user.userName);
            setEmail(user.email);
        }

    }, [dispatch, user, id, navigate, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!')
        } else {
            dispatch(updateUser({_id: 
                id, 
                firstName, 
                lastName, 
                userName, 
                email, 
                password,
            }));
        }
    }

    return (
       <PageWrapper>
           <UserEditForm onSubmit = {submitHandler}>
                {loadingDetail ? (
                        <LoadingBox />
                    ) : errorDetail ? (
                        <MessageBox variant = 'danger'>{errorDetail}</MessageBox>
                    ) :
                        <>
                            <h1>{user.name}</h1>
                            <div>
                                <label htmlFor="firstName">First Name: </label>
                                <input 
                                    type="text" 
                                    id = 'firstName'
                                    value = {firstName} 
                                    onChange = {(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name: </label>
                                <input 
                                    type="text" 
                                    id = 'lastName' 
                                    value = {lastName} 
                                    onChange = {(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="userName">Username: </label>
                                <input 
                                    type="text" 
                                    id = 'userName' 
                                    value = {userName} 
                                    onChange = {(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email: </label>
                                <input 
                                    type="email" 
                                    id = 'email' 
                                    value = {email} 
                                    onChange = {(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password: </label>
                                <input 
                                    type="password" 
                                    id = 'password' 
                                    value={password} 
                                    onChange = {(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <input 
                                    type="password" 
                                    id = 'confirmPassword' 
                                    value={confirmPassword} 
                                    onChange = {(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <Submit type = 'submit'>Update</Submit>
                        </>
                }
            </UserEditForm>
       </PageWrapper>
    )
}