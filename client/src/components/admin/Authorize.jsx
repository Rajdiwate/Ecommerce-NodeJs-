import React from 'react'
import { useAuth } from '../../utils/customHooks/useAuth';

const Authorize = ({children}) => {

    const {user} = useAuth();

    if(user.role !== 'admin'){
        <Navigate to="/not-found" replace />;
    }

  return <>{children}</>
}

export default Authorize
