import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/customHooks/useAuth';

// const Protected = ({ children }) => {
//   const { isAuthenticated, loading , getCurrentUser} = useAuth()

//   useEffect(()=>{
//   } , [isAuthenticated])

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/auth" replace />;
//   }

//   return <>{children}</>;
// };


// export default Protected;


const withRoleAuthorization = (WrappedComponent, allowedRoles) => {

    return (props) => {
        // Get user info from Redux store or context
        const {isAuthenticated,user} =useAuth();
        useEffect(()=>{

        },[isAuthenticated])
        console.log("hoc",isAuthenticated)
        // Check if the user is authenticated and their role matches the allowed roles
        if (!isAuthenticated) {
            return <Navigate to="/auth" replace />;
        }

        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/unauthorized" replace />;
        }

        // Render the wrapped component if all checks pass
        return <WrappedComponent {...props} />;
    };
};

export default withRoleAuthorization;
