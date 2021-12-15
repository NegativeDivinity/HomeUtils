import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

function PrivateRoute({children}) {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const location = useLocation();

    if (!userInfo) {
        return <Navigate to = '/' state = {{from: location}} />;
    }

    return children;
}

export default PrivateRoute
