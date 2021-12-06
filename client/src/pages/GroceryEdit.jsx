import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { detailsGrocery, updateGrocery } from '../actions/groceryActions';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GROCERY_DETAILS_UPDATE_RESET } from '../constants/groceryConstants';
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstants';

const PageWrapper = styled.div`
    margin-top: 2%;
    color: white;
`;

const GroceryEditForm = styled.form`
    splay: flex;
    flex-direction: column;
    margin: 0 0 1% 30%;
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

export default function GroceryEdit() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const groceryDetails = useSelector(state => state.groceryDetails);
    const {loading: loadingDetail, error: errorDetail, grocery} = groceryDetails;

    const groceryUpdate = useSelector(state => state.groceryUpdate);
    const {success} = groceryUpdate;

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {

        if (success) {
            dispatch({type: GROCERY_DETAILS_UPDATE_RESET});
            navigate('/grocery');
        }

        if (!grocery) {
            dispatch(detailsGrocery(id));
        } else {
            setName(grocery.name);
            setQuantity(grocery.quantity);
        }

    }, [dispatch, grocery, id, navigate, success]);

    const submitHandler = (e) => {
        e.preventDefault();
            
        dispatch(updateGrocery({_id: 
                grocery._id, 
                name, 
                quantity,
            }));
    }

    return (
       <PageWrapper>
           <GroceryEditForm onSubmit = {submitHandler}>
                {loadingDetail ? (
                        <LoadingBox />
                    ) : errorDetail ? (
                        <MessageBox variant = 'danger'>{errorDetail}</MessageBox>
                    ) :
                        <>
                            <h1>{grocery.name}</h1>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input 
                                    type="text" 
                                    id = 'name'
                                    value = {name} 
                                    onChange = {(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity">Quantity: </label>
                                <input 
                                    type="number" 
                                    id = 'quantity' 
                                    value = {quantity} 
                                    onChange = {(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <Submit type = 'submit'>Update</Submit>
                        </>
                }
            </GroceryEditForm>
       </PageWrapper>
    )
}