import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const PageWrapper = styled.div`

`;

export default function Recipe() {

    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])

    return (
       <PageWrapper>

       </PageWrapper>
    )
}