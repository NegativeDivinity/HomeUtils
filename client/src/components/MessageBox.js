import React from 'react';
import styled from 'styled-components';

const Thing = styled.div`

    padding-bottom: 40px;

    .success {
        color: #20a020;
    }
  
    .danger {
        color: #a02020;
    }
  
    .alert {
        padding: 1rem;
        border: 0.1rem solid transparent;
        border-radius: 0.5rem;
    }
    
    .alert-info {
        color: #2020a0;
        background-color: #e0e0ff;
    }
    
    .alert-danger {
        color: #a02020;
        background-color: #ffe0e0e0;
    }
    
    .alert-success {
        color: #20a020;
        background-color: #eeffe0;
    }
`;

const Message = styled.div``;

export default function MessageBox( props ) {
    return (
        <Thing>
            <Message className = {`alert alert-${props.variant || 'info'}`}>
                {props.children}
            </Message>
        </Thing>
    )
}
