import React from 'react';
import {useDispatch} from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { deleteDirection } from '../actions/recipeActions';
import DirectionCards from '../components/DirectionCards';

const PageWrapper = styled.div`

`;

const DirectionRow = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

const Delete = styled.button`
    margin-left: 20px;
    border: solid black 2px;
    border-radius: 10px;
    background-color: red;
    cursor: pointer;
    outline: none;
`;

export default function D(props) {

    const {directions} = props;
    const {id} = props;
    const dispatch = useDispatch();

    const deleteHandler = (direction) => {
        dispatch(deleteDirection(id, direction._id));
    }

    return (
       <PageWrapper>
           <DragDropContext>
                <Droppable droppableId='direction'>
                    {(provided) => (
                        <div className='direction' {...provided.droppableProps} ref={provided.innerRef}>
                            {directions.map((direction, index) => (
                                <Draggable key = {direction._id} draggableId = {direction._id} index = {index}>
                                    {(provided) => (
                                        <DirectionRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <DirectionCards direction = {direction} />
                                            <Delete onClick = {() => deleteHandler(direction)}><FaTrash fontSize = '30px' /></Delete>
                                        </DirectionRow>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
       </PageWrapper>
    )
}