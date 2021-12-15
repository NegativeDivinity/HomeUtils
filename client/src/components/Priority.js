import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Priority(props) {

    const {item} = props;

    const [button, setButton] = useState('green');

    const time = item.itemTime;

    const PageWrapper = styled.button`
        border: solid black 2px;
        margin-left: 20%;
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

    const daily = () => {
        if (prevDay === currentDay) {
            setButton('green');
        } else if ((prevDay + 1) === currentDay) {
            setButton('yellow');
        } else if ((prevDay + 2) === currentDay) {
            setButton('orange');
        } else {
            setButton('red');
        }
    }

    const alternate = () => {
        if (prevDay === currentDay) {
            setButton('green');
        } else if ((prevDay + 2) === currentDay) {
            setButton('yellow');
        } else if ((prevDay + 3) === currentDay) {
            setButton('orange');
        } else {
            setButton('red');
        }
    }

    const weekly = () => {
        if (prevDay === currentDay) {
            setButton('green');
        } else if ((prevDay + 6) === currentDay) {
            setButton('yellow');
        } else if ((prevDay + 8) === currentDay) {
            setButton('orange');
        } else {
            setButton('red');
        }
    }

    const monthly = () => {
        if (prevDay === currentDay) {
            setButton('green');
        } else if ((prevDay + 30) === currentDay) {
            setButton('yellow');
        } else if ((prevDay + 34) === currentDay) {
            setButton('orange');
        } else {
            setButton('red');
        }
    }

    const itemOccur = () => {
        if (item.itemOccur === 'daily') {
            daily();
        } else if (item.itemOccur === 'alternate') {
            alternate();
        } else if (item.itemOccur === 'weekly') {
            weekly();
        } else {
            monthly();
        }
    }

    useEffect(() => {
        itemOccur();
    }, [itemOccur]);

    return (
        <PageWrapper>
            
        </PageWrapper>
    )
}
