import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Priority(props) {

    const {item} = props;

    const [button, setButton] = useState('green');

    const time = item.itemTime;

    const PageWrapper = styled.button`
        border: solid black 2px;
        margin-left: 25%;
        border-radius: 10px;
        background-color: ${button};
        outline: none;
    `;

    const currentDay = new Date().getDate()

    const getDay = () => {
        let i = time.indexOf(',');
        let currentDate = time.substr(0, i);
        let dayString = currentDate.substr(
            currentDate.indexOf('/') + 1,
            currentDate.lastIndexOf('/') - 3
        )
        let day = parseInt(dayString);
        return day;
    }

    const prevDay = getDay();

    useEffect(() => {
        if (prevDay === currentDay) {
            setButton('green');
        } else if ((prevDay + 1) === currentDay) {
            setButton('yellow');
        } else if ((prevDay + 2) === currentDay) {
            setButton('orange');
        } else {
            setButton('red');
        }
    }, [currentDay, prevDay]);

    return (
        <PageWrapper>
            
        </PageWrapper>
    )
}
