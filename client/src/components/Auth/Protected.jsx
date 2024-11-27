import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/customHooks/useAuth';
import Loading from '../Loading';

const Protected = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loading/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};


export default Protected;


// const withRoleAuthorization = (WrappedComponent, allowedRoles) => {

//     return (props) => {
//         // Get user info from Redux store or context
//         const {isAuthenticated,user} =useAuth();
//         useEffect(()=>{

//         },[isAuthenticated])
//         console.log("hoc",isAuthenticated)
//         // Check if the user is authenticated and their role matches the allowed roles
//         if (!isAuthenticated) {
//             return <Navigate to="/auth" replace />;
//         }

//         if (!allowedRoles.includes(user.role)) {
//             return <Navigate to="/unauthorized" replace />;
//         }

//         // Render the wrapped component if all checks pass
//         return <WrappedComponent {...props} />;
//     };
// };

// export default withRoleAuthorization;
