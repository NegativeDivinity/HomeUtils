import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addContact, deleteContact } from '../actions/contactActions';
import {FaTrash} from 'react-icons/fa';
import {RiAddLine} from 'react-icons/ri';

// Component Imports
import ContactCards from '../components/ContactCards';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router';
import { ADD_CONTACT_RESET, DELETE_CONTACT_RESET } from '../constants/contactConstants';
import { detailsUser } from '../actions/userActions';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2%;

    h1 {
        font-size: 40px;
        color: white;
        text-align: center;
    }

    h3 {
        color: white;
        margin-left: 25%;
        font-size: 30px;
    }
    
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

const ContactRow = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function ContactsPage() {

    const {id} = useParams();

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const contactAdd = useSelector(state => state.contactAdd);
    const {success: successAdd} = contactAdd;

    const contactDelete = useSelector(state => state.contactDelete);
    const {success: successDelete} = contactDelete;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (successAdd) {
            dispatch({type: ADD_CONTACT_RESET});
            dispatch(detailsUser(id));
        }

        if (successDelete) {
            dispatch({type: DELETE_CONTACT_RESET});
            dispatch(detailsUser(id));
        }

        dispatch(detailsUser(id));
    }, [dispatch, navigate, id, successAdd, successDelete]);

    const addHandler = () => {
        dispatch(addContact(id));
    }

    const deleteHandler = (contact) => {
        dispatch(deleteContact(id, contact._id));
    }

    const checker = () => {
        for (var i = 0; i < user.contacts.length; i++) {
            if (user.contacts[i].name === 'default name') {
                var x = true;
                break;
            } else {
                var x = false;
            }
        }

        return x;
    }

    return (
        <PageWrapper>
            <h1>Contacts</h1>
            <Add onClick = {addHandler}><RiAddLine className = 'add' fontSize = '40px'/></Add>
            {loading ? (<LoadingBox />)
                :
            error ? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                <>
                    {checker() === true && <h3>Unfinished:</h3>}
                    {user.contacts.filter(contact => contact.name === 'default name').map(contact => (
                        <ContactRow>
                            <ContactCards key = {contact._id} contact = {contact} userId = {id}/>
                            <Delete onClick = {() => deleteHandler(contact)}><FaTrash fontSize = '30px' /></Delete>
                        </ContactRow>
                    ))}
                    <h3>Completed Contacts:</h3>
                    {user.contacts.filter(contact => contact.name !== 'default name').sort((a, b) => a.name.localeCompare(b.name)).map(contact => (
                        <ContactRow>
                            <ContactCards key = {contact._id} contact = {contact} userId = {id}/>
                            <Delete onClick = {() => deleteHandler(contact)}><FaTrash fontSize = '30px' /></Delete>
                        </ContactRow>
                    ))}
                </>
            )}
        </PageWrapper>
    )
}
