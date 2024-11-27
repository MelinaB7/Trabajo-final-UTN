import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;