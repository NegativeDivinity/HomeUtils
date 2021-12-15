import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.input`
    width: 100%;
`;

export default function PhoneInput(props) {

    const {phone} = props;
    const {setPhone} = props;

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, "");

        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;

        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }

    const handleInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);

        setPhone(formattedPhoneNumber);
    }

    return (
       <PageWrapper
            type = 'text'
            value = {phone}
            onChange = {(e) => handleInput(e)}
        />
    )
}