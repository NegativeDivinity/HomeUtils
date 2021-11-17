import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContactCard = styled(Link)`

`;

export default function ContactCards(props) {

    const {contact} = props;

    return (
        <ContactCard key = {contact._id} to = {`/contact/${contact._id}`}>
            {contact.name}
        </ContactCard>
    )
}
