import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`

`;

export default function UserCard(props) {

    const {user} = props;

    return (
        <PageWrapper>
            {user.firstName}
        </PageWrapper>
    )
}
