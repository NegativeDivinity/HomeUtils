import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsContact } from '../actions/contactAction';
import { useParams } from 'react-router';

const PageWrapper = styled.div`
    text-align: center;
    margin-top: 2%;
`;

const ContactEditForm = styled.form`
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

export default function ContactEdit() {

    const contactDetails = useSelector(state => state.contactDetails);
    const {loading, error, contact} = contactDetails;

    const dispatch = useDispatch();

    const {id} = useParams();

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [company, setCompany] = useState('');

    useEffect(() => {
        dispatch(detailsContact(id));
    }, [dispatch, id])

    const submitHandler = (e) => {
        e.preventDefault();


    }

    return (
        <>
            {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant = 'danger'>{error}</MessageBox>
                ) : (
                    <PageWrapper>
                        <h1>{contact.name}</h1>
                        <ContactEditForm onSubmit = {submitHandler}>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input 
                                    type="text" 
                                    id = 'name'
                                    value = {name} 
                                    onChange = {(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="nickName">Nickname: </label>
                                <input 
                                    type="text" 
                                    id = 'nickName' 
                                    value = {nickName} 
                                    onChange = {(e) => setNickName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone: </label>
                                <input 
                                    type="text" 
                                    id = 'phone' 
                                    value = {phone} 
                                    onChange = {(e) => setPhone(e.target.value)}
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
                                <label htmlFor="job">Job: </label>
                                <input 
                                    type="text" 
                                    id = 'job' 
                                    value={job} 
                                    onChange = {(e) => setJob(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="company">Company: </label>
                                <input 
                                    type="text" 
                                    id = 'company' 
                                    value={company} 
                                    onChange = {(e) => setCompany(e.target.value)}
                                />
                            </div>
                            <Submit type = 'submit'>Update</Submit>
                        </ContactEditForm>
                    </PageWrapper>
                )}
        </>
    )
}
