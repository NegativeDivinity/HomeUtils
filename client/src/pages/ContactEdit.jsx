import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsContact, updateContact } from '../actions/contactActions';
import { useNavigate, useParams } from 'react-router';
import { CONTACT_DETAILS_RESET, CONTACT_UPDATE_RESET } from '../constants/contactConstants';

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

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [company, setCompany] = useState('');

    const contactDetails = useSelector(state => state.contactDetails);
    const {loading, error, contact} = contactDetails;

    const contactUpdate = useSelector(state => state.contactUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = contactUpdate;

    useEffect(() => {

        if (successUpdate) {
            dispatch({type: CONTACT_UPDATE_RESET});
            dispatch(detailsContact(id));
            navigate('/contact')
        }

        if (!contact || (contact._id !== id)) {
            dispatch({type: CONTACT_DETAILS_RESET});
            dispatch(detailsContact(id));
        } else {
            setName(contact.name);
            setNickName(contact.nickName);
            setPhone(contact.phone);
            setEmail(contact.email);
            setJob(contact.job);
            setCompany(contact.company);
        }
        
    }, [dispatch, id, contact, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateContact({_id: contact._id, name, nickName, phone, email, job, company}));
    }

    return (
        <PageWrapper>
            {loadingUpdate && <LoadingBox />}
            <ContactEditForm onSubmit = {submitHandler}>
                {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant = 'danger'>{error}</MessageBox>
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
                            {successUpdate && <MessageBox>success</MessageBox>}
                        </>
                }
            </ContactEditForm>
            {errorUpdate && <MessageBox variant = 'danger'>{errorUpdate}</MessageBox>}
        </PageWrapper>
    )
}
