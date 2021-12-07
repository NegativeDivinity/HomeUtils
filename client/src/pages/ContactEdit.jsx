import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsContact, updateContact } from '../actions/contactActions';
import { useNavigate, useParams } from 'react-router';
import {CONTACT_UPDATE_RESET } from '../constants/contactConstants';
import PhoneInput from '../components/PhoneInput';

const PageWrapper = styled.div`
    margin-top: 2%;
    color: white;
`;

const ContactEditForm = styled.form`
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

export default function ContactEdit() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();
    const {cid} = useParams();

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [company, setCompany] = useState('');

    const contactDetails = useSelector(state => state.contactDetails);
    const {loading: loadingDetail, error: errorDetail, contact} = contactDetails;

    const contactUpdate = useSelector(state => state.contactUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = contactUpdate;

    useEffect(() => {

        if (successUpdate) {
            dispatch({type: CONTACT_UPDATE_RESET});
            navigate(`/contacts/${id}`)
        }

        if (!contact) {
            dispatch({type: CONTACT_UPDATE_RESET});
            dispatch(detailsContact(id, cid));
        } else {
            setName(contact.name);
            setNickName(contact.nickName);
            setPhone(contact.phone);
            setEmail(contact.email);
            setJob(contact.job);
            setCompany(contact.company);
        }
        
    }, [dispatch, id, cid, navigate, successUpdate, contact]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateContact(id, {_id: contact._id, name, nickName, phone, email, job, company}));
    }

    return (
        <PageWrapper>
            {loadingUpdate && <LoadingBox />}
            <ContactEditForm onSubmit = {submitHandler}>
                {loadingDetail ? (
                        <LoadingBox />
                    ) : errorDetail ? (
                        <MessageBox variant = 'danger'>{errorDetail}</MessageBox>
                    ) :
                        <>
                            <h1>{contact.name}</h1>
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
                                <PhoneInput phone = {phone} setPhone = {setPhone} />
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
                        </>
                }
            </ContactEditForm>
            {errorUpdate && <MessageBox variant = 'danger'>{errorUpdate}</MessageBox>}
        </PageWrapper>
    )
}
