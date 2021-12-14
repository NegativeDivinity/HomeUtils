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
    
    h1 {
        font-size: 40px;
        color: white;
    }
`;

const Forms = styled.div`
    display: flex;
    margin-left: 10%;
`;

const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 35%;
    margin-left: 5%;
    border: solid black 3px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);
    
    h3 {
        color: white;
        font-size: 25px;
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
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [birthday, setBirthday] = useState('');
    const [medicalWarning, setMedicalWarning] = useState('');
    const [favMovie, setFavMovie] = useState('');
    const [favSong, setFavSong] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {

        if (successUpdate) {
            dispatch({type: USER_DETAILS_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        }

        if (!user) {
            dispatch({type: USER_DETAILS_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUserName(user.userName);
            setEmail(user.email);
            setCompany(user.company);
            setJobTitle(user.jobTitle);
            setBirthday(user.birthday);
            setMedicalWarning(user.medicalWarning);
            setFavMovie(user.favMovie);
            setFavSong(user.favSong);
        }
    }, [dispatch, userInfo._id, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!')
        } else {
            dispatch(updateUser({userId: 
                user._id, 
                firstName, 
                lastName, 
                userName, 
                email, 
                password,
                company,
                jobTitle,
                birthday,
                medicalWarning,
                favMovie,
                favSong
            }));
        }
    }

    return (
        <PageWrapper key = 'profilePage'>
            <h1>Profile</h1>
            <Notify>
                {errorUpdate && <MessageBox variant = 'danger'>{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant = 'success'>Profile Updated Successfully</MessageBox>}
            </Notify>
            <Forms>
                {loading ? ( 
                    <LoadingBox /> 
                ) : error ? (
                    <MessageBox variant = 'danger'>{error}</MessageBox>
                ) : (
                    <>
                        <ProfileForm onSubmit = {submitHandler}>
                            {loadingUpdate && <LoadingBox />}
                            <h3>User Form</h3>
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
                        </ProfileForm>
                        <ProfileForm onSubmit = {submitHandler}>
                            {loadingUpdate && <LoadingBox />}
                            <h3>Bio Form</h3>
                            <div>
                                <label htmlFor="company">Company: </label>
                                <input 
                                    type="text" 
                                    id = 'company'
                                    value = {company} 
                                    onChange = {(e) => setCompany(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="jobTitle">Job Title: </label>
                                <input 
                                    type="text" 
                                    id = 'jobTitle' 
                                    value = {jobTitle} 
                                    onChange = {(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="birthday">Birthday: </label>
                                <input 
                                    type="date" 
                                    id = 'birthday' 
                                    value = {birthday} 
                                    onChange = {(e) => setBirthday(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="medicalWarning">Medical Warning: </label>
                                <input 
                                    type="text" 
                                    id = 'medicalWarning' 
                                    value = {medicalWarning} 
                                    onChange = {(e) => setMedicalWarning(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="favMovie">Favorite Movie: </label>
                                <input 
                                    type="text" 
                                    id = 'favMovie' 
                                    value={favMovie} 
                                    onChange = {(e) => setFavMovie(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="favSong">Favorite Song: </label>
                                <input 
                                    type="text" 
                                    id = 'favSong' 
                                    value={favSong} 
                                    onChange = {(e) => setFavSong(e.target.value)}
                                />
                            </div>
                            <Submit type = 'submit'>Update</Submit>
                        </ProfileForm>
                    </>
                )}
            </Forms>
        </PageWrapper>
    )
}
