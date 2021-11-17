import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContactCard = styled(Link)`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: 25%;
    border: solid black 2px;
    border-radius: 10px;
    font-size: 20px;
    text-decoration: none;
    color: white;
    background-color: rgb(73, 73, 77); 

    p {
        padding: 0 30px 0 30px;
    }
`;

export default function ContactCards(props) {

    const {contact} = props;

    return (
        <ContactCard key = {contact._id} to = {`/contact/${contact._id}`}>
            <p>{contact.name}</p>
            <p>{contact.phone}</p>
        </ContactCard>
    )
}
