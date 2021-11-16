import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    display: block !important;
    justify-content: center;
    align-items: center;
`;

export default function LoadingBox() {
    return (
        <Loading>
            <i className = 'fa fa-spinner fa-spin'></i> Loading...
        </Loading>
    )
}
