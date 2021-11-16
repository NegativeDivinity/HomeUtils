import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_UPDATE_RESET } from "../constants/userConstants";

const PageWrapper = styled.div`
    text-align: center;
    margin-top: 2%;
    height: 86vh;
    
    h1 {
        font-size: 40px;
        color: white;
    }
`;

const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 0 0 30%;
    width: 40%;
    border: solid black 3px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);

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

const Notify = styled.div`
    width: 40%;
    margin-left: 31%;
`;

export default function Profile() {
    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({type: USER_DETAILS_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUserName(user.userName);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!')
        } else {
            dispatch(updateUser({userId: user._id, firstName, lastName, userName, email, password}));
        }
    }

    return (
        <PageWrapper key = 'profilePage'>
            <h1>Profile</h1>
            <Notify>
                {errorUpdate && <MessageBox variant = 'danger'>{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant = 'success'>Profile Updated Successfully</MessageBox>}
            </Notify>
            <ProfileForm onSubmit = {submitHandler}>
                {loading ? 
                    ( <LoadingBox /> ) : 
                    error ? (<MessageBox variant = 'danger'>{error}</MessageBox>
                    ) : (
                    
                    <React.Fragment>
                        {loadingUpdate && <LoadingBox />}
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
                                type="text" 
                                id = 'email' 
                                value = {email} 
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">New Password: </label>
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
                    </React.Fragment>
                )}
            </ProfileForm>
        </PageWrapper>
    )
}
