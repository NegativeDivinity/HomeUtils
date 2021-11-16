import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SignWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
`;

const SignForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 40%;
    padding: 20px;
    align-items: center;
    font-size: 20px;
    border: 5px solid rgb(0, 0, 0, 0.15);
    border-radius: 5px;

    div {
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 60%;
        padding-bottom: 20px;

        label {
            padding-bottom: 5px;
            font-style: italic;
        }

        input {
            height: 25px;
            padding: 5px;
            border: 2px solid rgb(0, 0, 0, 0.1);
            border-bottom: 2px solid rgb(0, 0, 0);
            outline: none;
            border-radius: 5px;
            font-size: 20px;
            font-style: italic;
        }
    }

    button {
        width: 40%;
        margin-top: 20px;
        padding: 5px;
        background-color: white;
        border-radius: 5px;
        border: 2px solid rgb(0, 0, 0, 0.2);
        border-bottom: 2px solid rgb(0, 0, 0);
        cursor: pointer;
    }

    button:hover {
        border: 2px solid rgb(0, 0, 0, 0.6);
    }
`;

export default function SigninPage() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(signin(userName, password));
    }

    return (
        <SignWrapper>
            {loading && <LoadingBox />}
            {error && <MessageBox variant = 'danger'>{error}</MessageBox>}
            <SignForm onSubmit = {submitHandler}>
                <h2>Sign In</h2>
                <div>
                    <label htmlFor="userName">Username: </label>
                    <input type="text" id = 'userName' required onChange = {(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id = 'password' required onChange = {(e) => setPassword(e.target.value)} />
                </div>
                <button type = 'submit'>Submit</button>
            </SignForm>
        </SignWrapper>
    )
}