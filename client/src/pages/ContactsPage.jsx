import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listContact } from '../actions/contactAction';

// Component Imports
import ContactCards from '../components/ContactCards';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ContactsPage() {

    const contactList = useSelector(state => state.contactList);
    const {loading, error, contacts} = contactList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listContact());
    }, [dispatch]);

    return (
        <div>
            {loading ? (<LoadingBox />)
                :
            error ? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                <>
                    {contacts.map(contact => (
                        <ContactCards key = {contact._id} contact = {contact} />
                    ))}
                </>
            )}
        </div>
    )
}
