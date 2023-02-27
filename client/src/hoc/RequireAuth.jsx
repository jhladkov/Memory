import React from 'react';
import {Navigate} from "react-router-dom";
const RequireAuth = ({children, authStatus}) => {

    if (!authStatus) {
        return <Navigate to='/login'/>
    }

    return children
};

export default RequireAuth;