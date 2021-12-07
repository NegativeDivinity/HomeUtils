import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`

`;

export default function IngredientList(props) {

    const {recipe} = props;

    return (
       <PageWrapper>
           {recipe.ingredients.map(ingredient => (
               <p>{ingredient.name}</p>
           ))}
       </PageWrapper>
    )
}