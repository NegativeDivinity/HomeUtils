import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { detailsItem, updateItem } from '../actions/todoActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TODO_UPDATE_RESET } from '../constants/todoConstants';

const PageWrapper = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2% 0 1% 30%;
    color: white;
    width: 40%;
    border: solid black 3px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);

    h1 {
        text-align: center;
    }

    div {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        color: white;
        font-size: 20px;

        input {
            padding: 5px;
            width: 50%;
            border-radius: 10px;
            outline: none;
            border: none;
        }

        select {
            padding: 5px;
            width: 50%;
            outline: none;
            border: none;
        }
    }
`;

const Submit = styled.button`
    width: 80%;
    margin: 2% 0 0 10%;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export default function GroupToDoEdit() {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [occur, setOccur] = useState('');

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemDetails = useSelector(state => state.itemDetails);
    const {loading, error, item} = itemDetails;

    const itemUpdate = useSelector(state => state.itemUpdate);
    const {success} = itemUpdate;

    useEffect(() => {

        if (success) {
            dispatch({type: TODO_UPDATE_RESET});
            navigate('/grouptodo')
        }

        if (!item) {
            dispatch(detailsItem(id));
        } else {
            setTitle(item.title);
            setOccur(item.itemOccur);
        }
        
    }, [dispatch, id, success, navigate, item]);

    const autoFill = (e) => {
        e.preventDefault();

        let datetime = new Date().toLocaleString();
        setDate(datetime);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateItem({_id: id, title, date, occur}));
    }

    return (
        <PageWrapper onSubmit = {submitHandler}>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant = 'danger'>{error}</MessageBox>
            ) : (
                <>
                    <h1>{item.title}</h1>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input 
                            type="text" 
                            id = 'title'
                            value = {title}
                            onChange = {(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Done Last: </label>
                        <input 
                            type="text" 
                            id = 'date'
                            placeholder = 'MM/DD/YYYY H:M:S AM/PM'
                            value = {date}
                            onChange = {(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="occur">Occurrence: </label>
                        <select id="occur" value = {occur} onChange = {(e) => setOccur(e.target.value)}>
                            <option value="daily">Daily</option>
                            <option value="alternate">Every Other</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <Submit onClick = {autoFill}>Autofill Date</Submit>
                </>
            )}
            <Submit type = 'submit'>Update</Submit>
        </PageWrapper>
    )
}
