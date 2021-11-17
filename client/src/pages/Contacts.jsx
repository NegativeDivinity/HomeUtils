import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { contactlist } from '../actions/contactAction';

// Component Imports
import ContactCards from '../components/ContactCards';

const PageWrapper = styled.div`

`;

export default function Contacts() {

    const listContacts = useSelector(state => state.listContacts);
    const {contacts} = listContacts;

    useEffect(() => {
        contactlist();
    }, []);

    return (
        <PageWrapper>
            {contacts.map((contact) => (
                <>
                    <ContactCards key = {contacts._id} contact = {contact} />
                </>
            ))}
        </PageWrapper>
    )
}
